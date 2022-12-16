import React, { Component } from 'react';
import NavBar from './NavBar';
import axios from 'axios'
import moment from 'moment'

class forumDis extends Component {
    state = {
        data: [{}]
    }

    async componentDidMount() {
        var result = await axios.get(`http://localhost:8000/forum/dis/${this.props.match.params.DiscNum}`)
        this.state.data = result.data
        this.setState({});
        for (var i = 0; i < this.state.data.length; i++) {
            // 獲取日期
            var localTime = moment(this.state.data[i].postdate).format('YYYY-MM-DD');
            var proposedDate = localTime + "T00:00:00.000Z";
            var isValidDate = moment(proposedDate).isValid();

            //獲取時間
            var momentDate = moment(proposedDate)
            var hour = momentDate.hours();
            var minutes = momentDate.minutes();
            console.log(localTime)
            this.state.data[i].postdate = localTime;
        }
    }
    render() {
        return (
            <div>

                <NavBar />


                <div className="ForumDisforumBGC container">
                    <a href={`/forum/create/${this.state.data[0].DiscNum}`}><button className='text-white bg-success PostBTN col-3 col-md-1'>發文</button></a>

                    <div className="row" >

                        <div className="forumgameDisPIC ">
                            <img src={this.state.data[0].DiscPic} />
                        </div>

                        <div className="ForumDisforumbar">
                            <ul className='row'>
                                <li className="col-11 col-md"><a href="">全部主題</a></li>
                                <li className="col-11 col-md"><a href="">問題討論</a></li>
                                <li className="col-11 col-md"><a href="">創作閒聊</a></li>
                                <li className="col-11 col-md"><a href="">心得攻略</a></li>
                                <li className="col-11 col-md"><a href="">揪團招生</a></li>
                            </ul>
                        </div>


                        {/* ====判斷是否置頂(boolean) */}
                        <div className="container">
                            {
                                this.state.data.map(function (item, index) {
                                    if (item.Pin == 1) {
                                        return console.log(item), < div className="ForumDisForumSection " key={item.articleId} >
                                            <div className=" PostTop row" >
                                                <div className="col-4 col-md-2">
                                                    <div className="Topicon ">
                                                        <h1>置頂</h1>
                                                    </div>
                                                </div>
                                                <div className="ForumPostLength col-4 col-md-8" >
                                                    <a href={`/forum/post/${item.articleId}`} >
                                                        <h2>{`【${item.articleType}】${item.articleTitle}`}</h2>
                                                    </a>

                                                </div>
                                                <div className="UserInfo col-4 col-md-2">
                                                    <p>Ediie6027</p>
                                                    <p>{item.postdate}</p>
                                                </div>
                                            </div>
                                        </div>
                                    }
                                })
                            }

                            {
                                this.state.data.map(function (item, index) {
                                    if (item.Pin == 0) {
                                        return <div className="ForumDisForumSection" key={item.articleId}>
                                            <div className="ForumDisForumPost">
                                                <div className="ForumPostPic col-4 col-md-2">
                                                    <img src={item.articleImg ? item.articleImg : require('../img/Post/image.png')} />
                                                </div>
                                                <div className="ForumPostLength col-4 col-md-8">
                                                    <a href={`/forum/post/${item.articleId}`}>
                                                        <h2>{`【${item.articleType}】${item.articleTitle}`}</h2>
                                                    </a>
                                                </div>
                                                <div className="UserInfo col-4 col-md-2">
                                                    <p>Ediie6027</p>
                                                    <p>{item.postdate}</p>
                                                </div>
                                            </div>
                                        </div>
                                    }
                                })
                            }
                        </div>

                        {/* <div className="forumPage container">
                            <span className="page-prev">&lt;</span>
                            <span className="page-current">1</span>
                            <a href="#">2</a>
                            <a href="#">3</a>
                            <a href="#">4</a>
                            <a href="#">5</a>
                            <a href="#">6</a>
                            <a href="#">7</a>
                            <a href="#">8</a>
                            <a href="#">9</a>
                            ……
                            <a href="#">199</a>
                            <a href="#">200</a>
                            <a href="#">&gt;</a>
                        </div> */}
                    </div>
                </div>
            </div >
        );
    }
}

export default forumDis;