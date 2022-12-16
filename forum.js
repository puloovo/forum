var express = require('express');
var app = express.Router();
var multer = require('multer')
var db = require('./db')



//評論
app.post('/comment', function (req, res) {
    db.conn(
        'INSERT INTO post ( `Comment`,`uid`,`commentDate`) VALUES ( ?,?,?)',
        [
            req.body[0].Comment,
            req.body[0].uid,
            req.body[0].commentDate,
        ],
        function (rows) {
            res.send(JSON.stringify(req.body));
        }

    )
    console.log(req.body)
})



//自訂storage (八成白寫)
var myStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/img/uploads")  //路徑
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);

    }
})

var upload = multer({ storage: myStorage })

//上傳圖片  (八成白寫)
app.post('/uploads', upload.single('articleImg'), function (req, res) {
    var file = req.file;
    file.path = (`http://localhost:8000/img/uploads/${file.originalname}`)

    db.conn(
        'INSERT INTO homepage ( articleImg ) VALUES (?)',
        [
            file.path,
        ],
        function (rows) {
            res.send(JSON.stringify(file.path));
        })
    console.log('檔案類型: %S', file.mimetype);
    console.log('原始檔名: %S', file.originalname);
    console.log('檔案路徑: %S', file.path);
    console.log('檔案:%S', file);
})


app.get('/uploads.html'), function (req, res) {
    res.sendfile(__dirname + '/uploads.html', function (err) {
        if (err) res.send(404);
    })
}

//主題討論區(forumgamedis)
app.get('/forum/gamedis', (req, res) => {
    db.conn("SELECT homepage.articleId, disc.DiscPic, disc.DiscName, disc.DiscHot,  articleTitle, articleType ,homepage.DiscNum, articlegood FROM `homepage`  RIGHT JOIN  `disc` ON `homepage`.`DiscNum` = `disc`.`DiscNum` WHERE articlegood > 200 GROUP BY homepage.DiscNum;",
        [],
        function (rows) {
            res.send(JSON.stringify(rows));
        })
})



//單個討論區貼文
app.get("/forum/dis/:DiscNum", (req, res) => {
    db.conn("SELECT * FROM  disc  RIGHT JOIN  homepage  ON disc.DiscNum = homepage.DiscNum WHERE disc.DiscNum = ? ORDER by homepage.postdate DESC",
        [req.params.DiscNum],
        function (rows) {
            res.send(JSON.stringify(rows));
        })
})


//單個貼文的評論
app.get('/forum/comment/:DiscNum', (req, res) => {
    db.conn("SELECT member.nickname,member.memberPhoto, post.count,post.uid,post.CommentID,post.Comment,post.commentDate FROM homepage,postcomment , post , member WHERE homepage.articleId = postcomment.articleId AND postcomment.CommentID = post.CommentID AND post.uid = member.uid",
        [req.params.DiscNum],
        function (rows) {
            res.send(JSON.stringify(rows));
        })
})


//篩選高讚數貼文
app.get('/forum', (req, res) => {
    db.conn("SELECT * FROM homepage  RIGHT JOIN member on homepage.uid = member.uid ORDER BY articlegood DESC LIMIT 10; ", [],
        function (rows) {
            res.send(JSON.stringify(rows));
        })
})

//連接單篇貼文(post)
app.get("/forum/post/:articleId", (req, res) => {
    db.conn('SELECT * FROM `homepage` RIGHT JOIN `member` on `homepage`.`uid` = `member`.`uid`WHERE articleId=? ',
        [req.params.articleId],
        function (rows) {
            res.send(JSON.stringify(rows));
        })
})

// "SELECT* FROM `postcomment`, `homepage` ,`disc` WHERE disc.DiscNum = homepage.DiscNum AND `homepage`.`articleId`=`postcomment`.`articleId`AND`homepage`.`articleId`=?"


//發文(creat)
app.post('/forum/create', function (req, res) {
    db.conn(
        'INSERT INTO homepage ( articleTitle, articleText, articleType,DiscNum,postdate,uid) VALUES ( ?,?,?, ?, ?,?)',
        [
            req.body[0].articleTitle,
            req.body[0].articleText,
            req.body[0].articleType,
            req.body[0].DiscNum,
            req.body[0].postdate,
            req.body[0].uid,
        ],
        function (rows) {
            res.send(JSON.stringify(req.body));
        })
    // console.log(req.body);
})

//人氣
app.post('/DiscNum', function (req, res) {
    db.conn('update disc set DiscHot = DiscHot + 1 WHERE DiscNum =?',
        [req.body.DiscNum],
        function (rows) {
            res.send('ok');
        }
    )
})

//點讚
app.post('/Vote', function (req, res) {
    db.conn('', [],
        function (rows) {
            res.send('ok');
        })
})


//編輯
app.get('/edit/:articleId', function (res, req) {
    db.conn('SELECT * FROM `homepage` WHERE articleId =?', 
    [req.params.articleId],
        function (rows) {
            res.send(rows);
            console.log(req.params)
        })
})




//刪除
app.post('/apple', function (req, res) {

    db.conn("delete FROM post WHERE uid=? AND count=?",
        [req.body.id, req.body.cou],
        function (rows) {
            res.send("ok");
        })
})



module.exports= app;




