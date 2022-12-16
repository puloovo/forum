import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import Axios from "axios";
import swal from "sweetalert";
import formser from "./formser";
import NavBar from './NavBar';


class Main extends Component {
  state = {
    data: [],
  };
  userClick() {
    let labelstyle = document.querySelector(".userId").style;
    labelstyle.top = "-35px";
    labelstyle.left = "-10px";
    labelstyle.color = "rgb(181, 196, 206)";
    labelstyle.fontSize = "12px";
  }
  userPassword() {
    let labelstyle1 = document.querySelector(".userPassword").style;
    labelstyle1.top = "-35px";
    labelstyle1.left = "-10px";
    labelstyle1.color = "rgb(181, 196, 206)";
    labelstyle1.fontSize = "12px";
  }
  //登入判斷
  login = async () => {
    if (document.getElementById("form").reportValidity()) {
      let result = await Axios.post(
        "http://localhost:8000/member/login",
        formser("form")
      );

      if (result) {
        if (result.data === "帳號錯誤" || result.data === "密碼錯誤") {
          console.log(result);
          swal("帳號密碼錯誤", "", "error", {
            buttons: "確定",
          });
        } else {
          localStorage.setItem("token", result.data.token);

          document.getElementById("userId").value = "";
          document.getElementById("userPassword").value = "";
          window.location = "/memberinfo";
        }
      }
    }
  };
  render() {
    return (
      <div style={{ marginTop: "60px" }} className="row ">
        <NavBar />
        <div className="col-12  d-flex  clo">
          <div className="m-auto bg-dark p-5">
            <div class="login-form ">
              <form id="form">
                <div className="login-info">
                  <input
                    type="email"
                    className="border border-3 rounded-2"
                    id="userId"
                    name="email"
                    onFocus={this.userClick}
                    required
                  ></input>
                  <label
                    className="userId"
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      padding: "10px 10px",
                      fontSize: "16px",
                      color: "rgb(162, 159, 159)",
                      pointerEvents: "none",
                      transition: "0.5s",
                    }}
                  >
                    帳號:
                  </label>
                </div>

                <div className="login-info">
                  <input
                    type="password"
                    className="border border-3 rounded-2"
                    id="userPassword"
                    name="password"
                    onFocus={this.userPassword}
                    required
                  ></input>
                  <label
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      padding: "10px 10px",
                      fontSize: "16px",
                      color: "rgb(162, 159, 159)",
                      pointerEvents: "none",
                      transition: "0.5s",
                    }}
                    className="userPassword"
                  >
                    密碼:
                  </label>
                </div>
              </form>
              <div className="d-flex justify-content-between">
                <NavLink to="/register" className="link">
                  註冊
                </NavLink>
                <a href="#123" className="link">
                  忘記密碼
                </a>
              </div>
              <br />
              <div className="d-flex justify-content-center">
                <button className="btn btn-success w-100" onClick={this.login}>
                  登入
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Main;
