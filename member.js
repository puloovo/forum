const express = require("express");
const app = express.Router();
const db = require("./db");
const jwt = require("jsonwebtoken");
//          jsonWebToken套件
const bcrypt = require("bcrypt");
//          解碼jwt套件
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/upload");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
// 儲存檔案的設定
const upload = multer({
  storage: storage,
});

// 登入驗證函式
const login = async (data) => {
  return new Promise((resolve, reject) => {
    let flag = false;
    db.conn("SELECT * FROM `member`", [], (row) => {
      row.forEach((val) => {
        if (val.mail == data.email) {
          flag = true;
        }
      });
      if (flag) {
        db.conn(
          "SELECT * FROM `member` where mail=?",
          [data.email],
          (rows, err) => {
            bcrypt.compare(data.password, rows[0].password).then((res) => {
              if (res) {
                const payload = {
                  user_id: rows[0].uid,
                  user_name: rows[0].nickname,
                  user_mail: rows[0].mail,
                };
                const token = jwt.sign(
                  { payload, exp: Math.floor(Date.now() / 1000) + 60 * 120 },
                  "my_secret_key"
                );

                resolve(
                  Object.assign({ code: 200 }, { message: "登入成功", token })
                );
              } else {
                resolve("密碼錯誤");
              }
            });
          }
        );
      } else {
        resolve("帳號錯誤");
      }
    });
  });
};
// 登入驗證函式end
// 驗證Jwt函式
const selectPersonalArticle = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, "my_secret_key", (err, decoded) => {
      if (err) {
        reject(err); // 驗證失敗回傳錯誤
      } else {
        resolve(decoded.payload.user_mail);
        // 驗證成功回傳 payload data
      }
    });
  });
};

/** 利用 Middleware 取得 Header 中的 Rearer Token */
const ensureToken = (req, res, next) => {
  const bearerHeader = req.headers.authorization;
  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" "); // 字串切割
    const bearerToken = bearer[1]; // 取得 JWT
    req.token = bearerToken; // 在response中建立一個token參數
    next(); // 結束 Middleware 進入 selectPersonalArticle
  } else {
    res
      .status(403)
      .send(Object.assign({ code: 403 }, { message: "您尚未登入！" }));
  } // Header 查無 Rearer Token}
};

//登入路由
app.post("/login", async (req, res) => {
  let result = await login(req.body);
  res.send(result);
});

// 註冊路由
app.post("/register", async (req, res) => {
  let data = req.body;
  password = await bcrypt.hash(data[0].password, 12);
  let isflag = true;
  db.conn("SELECT mail FROM `member`", [], (rows, err) => {
    rows.forEach((val) => {
      if (val.mail == data[0].email) {
        isflag = false;
      }
    });
    if (isflag) {
      db.conn(
        "insert into member (account, password,nickname,mail,birthday,address) values (?,?,?,?,?,?)",
        [
          data[0].account,
          password,
          data[0].nickname,
          data[0].email,
          data[0].birthday,
          data[0].address,
        ],
        (rows) => {
          res.send("註冊成功");
        }
      );
    } else {
      res.send("帳號重複");
    }
  });
});

// 會員資訊頁
app.get("/memberinfo", ensureToken, (req, res) => {
  selectPersonalArticle(req.token)
    .then((result) => {
      db.conn("SELECT * FROM member WHERE mail = ?", [result], (rows) => {
        res.send(rows);
      });
    })
    .catch((err) => {
      return res.status(401).send(err);
    }); // 失敗回傳錯誤訊息
});
// 訂單資料
app.get("/order", ensureToken, (req, res) => {
  selectPersonalArticle(req.token)
    .then((result) => {
      db.conn(
        "SELECT orderlist.orderid,orderdate,orderPhone,orderAddress,orderDelivery,orderMoney,gamePhoto,gameName,gamePrice,gameCount,mail FROM member JOIN orderlist on member.uid = orderlist.uid  JOIN paylist on orderlist.orderid = paylist.orderid WHERE mail = ? GROUP BY orderlist.orderid",
        [result],
        (rows) => {
          res.send(rows);
        }
      );
    })
    .catch((err) => {
      return res.status(401).send(err);
    }); // 失敗回傳錯誤訊息
});
// 訂單詳細資料;
app.get("/data:orderid", (req, res) => {
  db.conn(
    "SELECT orderlist.orderid,orderdate,orderPhone,orderAddress,orderDelivery,orderMoney,gamePhoto,gameName,gamePrice,gameCount FROM member JOIN orderlist on member.uid = orderlist.uid  JOIN paylist on orderlist.orderid = paylist.orderid WHERE  orderlist.orderid = ?;",
    [req.params.orderid],
    (rows) => {
      res.send(rows);
    }
  );
});

//上傳圖片
app.post("/upload_file", ensureToken, upload.single("myfile"), (req, res) => {
  req.file.path = `http://localhost:4000/upload/${req.file.originalname}`;
  selectPersonalArticle(req.token)
    .then((result) => {
      db.conn(
        "UPDATE member set memberPhoto=? WHERE mail=?",
        [req.file.path, result],
        (result) => {
          return res.send(result);
        }
      );
    })
    .catch((err) => {
      return res.status(401).send(err);
    }); // 失敗回傳錯誤訊息
});

//更新個人資料
app.put("/upload_data", ensureToken, (req, res) => {
  selectPersonalArticle(req.token)
    .then((result) => {
      let data = req.body;
      db.conn(
        "UPDATE member set nickname=?, account=? ,birthday=?,address=?  WHERE mail = ?",
        [
          data[0].nickname,
          data[0].account,
          data[0].birthday,
          data[0].address,
          result,
        ],
        (rows) => {
          res.send("err");
        }
      );
    })
    .catch((err) => {
      return res.status(401).send(err);
    }); // 失敗回傳錯誤訊
});
// 遊戲庫呈現
app.get("/game", ensureToken, (req, res) => {
  selectPersonalArticle(req.token)
    .then((result) => {
      db.conn(
        "SELECT gameName,gameClass,mail,gameTime,gamePhoto FROM member JOIN gamelibrary on member.uid = gamelibrary.uid JOIN gameinfo on gameinfo.gameId = gamelibrary.gameid JOIN gameinfopic on gameinfo.gameId=gameinfopic.gameId where mail=? AND gameClass != '周邊' GROUP by gameName",
        [result],
        (rows) => {
          res.send(rows);
        }
      );
    })
    .catch((err) => {
      return res.status(401).send(err);
    }); // 失敗回傳錯誤訊息
});
// 遊戲區評論
app.get("/comment", ensureToken, (req, res) => {
  selectPersonalArticle(req.token)
    .then((result) => {
      db.conn(
        "SELECT gameName,comment,commentTime,mail FROM `member` JOIN comment on member.uid = comment.uid JOIN gameinfo on comment.gameid = gameinfo.gameId where mail=?",
        [result],
        (rows) => {
          res.send(rows);
        }
      );
    })
    .catch((err) => {
      return res.status(401).send(err);
    }); // 失敗回傳錯誤訊息
});

module.exports = app;
