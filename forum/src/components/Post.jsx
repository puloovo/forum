import React, { Component } from 'react';
import axios from 'axios'
import NavBar from './NavBar';
import moment from 'moment'
import authHeader from './authHeader';


class Post extends Component {

    state = {
        data: [{}],
        comment: [{}],
        member: [{}],
    }

    async componentDidMount() {
        const result = await axios.get(`http://localhost:8000/forum/post/${this.props.match.params.articleId}`);
        const resultcommnet = await axios.get(`http://localhost:8000/forum/comment/${this.props.match.params.DiscNum}`);
        var memberData = await axios.get(`http://localhost:8000/member/memberinfo`, {
            headers: authHeader(),
        })
        this.state.member = memberData.data[0].uid
        this.state.data = result.data;
        this.state.comment = resultcommnet.data
        this.setState({});
        // console.log(this.state.data)
        for (var i = 0; i < this.state.data.length; i++) {
            // 獲取日期
            var localTime = moment(this.state.data[i].postdate).format('YYYY-MM-DD');
            var proposedDate = localTime + "T00:00:00.000Z";
            // var isValidDate = moment(proposedDate).isValid();

            //獲取時間
            // var momentDate = moment(proposedDate)
            // var hour = momentDate.hours();
            // var minutes = momentDate.minutes();
            // console.log(localTime)
            this.state.data[i].postdate = localTime;
        }
    }

    delBTN = async (uid, count) => {
        let obj = { id: uid, cou: count }
        var delUrl = "http://localhost:8000/delete";
        await axios.post(delUrl, obj)
        window.location.reload()
    }

    commentpost = async () => {
        const today = new Date()
        const yy = today.getFullYear();
        const mm = today.getMonth() + 1;
        const dd = today.getDate();
        const h = today.getHours();
        const m = today.getMinutes();
        var CommentTime = yy + "-" + mm + "-" + dd + "-" + h + ":" + m;


        const CommentDate = {
            Comment: document.getElementById('comment').value,
            uid: this.state.member,
            commentDate: CommentTime,
        }
        if (document.getElementById('comment').value !== ""
        ) {
            await axios.post('http://localhost:8000/comment', new Array(CommentDate))
            window.location.reload()
        } else {
            alert("未輸入回覆內容，請確認。")
        }

    }

    render() {
        return (
            <div>
                <NavBar />
                <div className="container " >
                    <div className=''>
                        <div className='Post' >
                            <div className="PostTiltle ">
                                <div className="PostTiltleHeader">
                                    <h1>{this.state.data[0].articleType}</h1>
                                </div>
                                <h1 className=''>
                                    {this.state.data[0].articleTitle}
                                </h1>
                            </div>

                            <div className="PostContent col-12 ">
                                <div>
                                    <div className="UserInfo">
                                        {/* <img src={require("../img/Post/Userlogo.jpg")} /> */}
                                        <div className="UserInfoBar">
                                            <div className="UserInfoName">
                                                <span>樓主</span>
                                                <p>{this.state.data[0].nickname}</p>
                                            </div>
                                            <p>{this.state.data[0].postdate}</p>
                                        </div>
                                        {this.state.data[0].uid === this.state.member ?
                                            <a href={`/edit/${this.state.data[0].articleId}`}>
                                                <button className='btnedit btn btn-sm btn-success m-2'>編輯</button>
                                            </a>
                                            : ""
                                        }
                                    </div>

                                    <hr />
                                    <div className="PostContentText">

                                        <div dangerouslySetInnerHTML={{ __html: this.state.data[0].articleText }} />

                                        <div className="PostContentPic">
                                            <img src={this.state.data[0].articleImg ? this.state.data[0].articleImg : ''} alt=""/>
                                        </div>

                                    </div>

                                    <div className="VoteBtn">
                                        <div className="VoteBtnPos">
                                            <div className="VoteBtnPosPic">
                                                <button className='BTNcss'>
                                                    <img src={require('../img/Post/4.jpg')} alt=""/>
                                                </button>
                                            </div>
                                            <p>{this.state.data[0].articlegood}</p>
                                        </div>
                                        <div className="VoteBtnNeg">
                                            <div className="VoteBtnNegPic">
                                                <button className='BTNcss'>
                                                    <img src={require('../img/Post/5.jpg')} alt=""/>
                                                </button>
                                            </div>
                                            <p>{this.state.data[0].articlebad}</p>
                                        </div>
                                    </div>

                                    <div className="Postcomment container ">
                                        {
                                            this.state.comment.map((item, index) => {
                                                return < div className="comment row " key={index + 1}>
                                                    <div className="commentPic col-1 col-md-2  px-md-5 ">
                                                        <img src={require("../img/Post/Userlogo.jpg")} alt=""/>
                                                    </div>
                                                    <div className='col-9 col-md-8 px-5 px-md-1'>
                                                        <div className="commenttext">
                                                            <h3>{item.nickname}</h3>
                                                            <p>{item.Comment}</p>
                                                        </div>
                                                        <div className="CommentInfo ">
                                                            <p>{`b${index + 1}`}</p>&nbsp;&nbsp;&nbsp;
                                                            <p>{item.commentDate}</p>&nbsp;&nbsp;
                                                        </div>
                                                    </div>
                                                    {item.uid === this.state.member ?
                                                        <div className='col-1'>
                                                            <input onClick={() => { this.delBTN(item.uid, item.count) }} type="button" value={"刪除"} className={"btn  bg-danger text-white p-1 mt-3"} />
                                                        </div>
                                                        : ""
                                                    }
                                                </div>
                                            })
                                        }
                                        <div className="comment row">
                                            <div className="commentPic col-2 px-md-5">
                                                <img src={require("../img/Post/Userlogo.jpg")} alt=""/>
                                            </div>
                                            <div className='commentpost col-8'>
                                                <div className=''>
                                                    <input type="hidden" id='gameId' />
                                                    <input type="hidden" id="commentTime" value="2022-12-07" />
                                                    <div className="">
                                                        <input type="text" placeholder="點我!!打字!!" name="comment" id="comment" style={{ borderRadius: "10px", height: "35px" }} className=" col-7 col-md-11 mt-3 mt-md-3" />
                                                        <input type="button" onClick={this.commentpost.bind(this)} name="okButtonClick" id="okButtonClick" value="送出" className="btn btn-sm btn-success col-5  col-md-1  " />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>

                    </div>

                </div >
            </div >
        );
    }
}

export default Post;