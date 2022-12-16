import React, { Component } from 'react';
import NavBar from './NavBar';
import axios from 'axios';


class Index extends Component {
    state = {
        data: [{}],
        context1: "",
        context2: "",
        context9: "",
    }

    async componentDidMount() {
        var result = await axios.get("http://localhost:8000/forum")
        this.state.data = result.data
        this.state.context1 = this.state.data[1]
        this.state.context2 = this.state.data[2]
        this.state.context9 = this.state.data[9]
        this.setState({});
        // console.log(this.state.data[1].articleTitle)
        console.log(this.state.context2)

    }


    render() {
        return (

            <div>
                <NavBar />
                <div className="forumBGC container ">
                    <div className="forumTitle ">
                        <h1>論壇</h1>
                        <p>遊戲與軟體社群和官方內容</p>
                    </div>

                    <div className="forumbar container">
                        <ul className='row'>
                            <li className='col-12 col-md'><a href="#">熱門文章</a></li>
                            <li className='col-12 col-md'><a href="/forum/gamedis">討論區</a></li>
                        </ul>
                    </div>

                    <div className="forumpost row">

                        <div className="forumpost-1 col-12 col-md-4 mr-2">
                            <a href={`/forum/post/${this.state.context1.articleId}`} >
                                <h1>{this.state.context1.articleTitle}</h1>
                            </a>
                            <img src={this.state.context1.articleImg} />

                            <div dangerouslySetInnerHTML={{ __html: this.state.context1.articleText }} />

                            <div className="UserBar">
                                <img src={require('../img/Post/Userlogo2.jpg')} />
                                <div className="UserInfo">
                                    <p>{this.state.context1.nickname}</p>
                                    <p>{this.state.context1.postdate}</p>
                                    <p>{this.state.context1.gameCategory}</p>
                                </div>
                                <span>{this.state.context1.articleType}</span>
                            </div>
                        </div>

                        <div className="forumpost_23 col-12 col-md">

                            <div className="forumpost-2 mt-2 mt-md-0">
                                <div className="forumpost-2img">
                                    <a href={`/forum/post/${this.state.data[0].articleId}`}>
                                        <img src={this.state.data[0].articleImg} />
                                    </a>
                                </div>

                                <div className="UserBar">
                                    <img src={require('../img/Post/Userlogo2.jpg')} />
                                    <div className="UserInfo">
                                        <p>{this.state.data[0].nickname}</p>
                                        <p>{this.state.data[0].postdate}</p>
                                        <p>{this.state.data[0].gameCategory}</p>
                                    </div>
                                    <span>{this.state.data[0].articleType}</span>
                                </div>
                            </div>

                            <div className="forumpost-3 mt-2">
                                <div className="forumpost-3img">
                                    <a href={`/forum/post/${this.state.context2.articleId}`}>
                                        <div dangerouslySetInnerHTML={{ __html: this.state.context2.articleText }} />
                                    </a>
                                </div>

                                <div className="UserBar">
                                    <img src={require('../img/Post/Userlogo2.jpg')} />
                                    <div className="UserInfo">
                                        <p> {this.state.context2.nickname}</p>
                                        <p> {this.state.context2.postdate}</p>
                                        <p>{this.state.context2.gameCategory} </p>
                                    </div>
                                    <span>{this.state.context2.articleType}</span>
                                </div>
                            </div>

                        </div>

                    </div>
                    <div className="forumpostMD row " >
                        {
                            this.state.data.slice(3, 9).map((item, Index) =>
                                <div className="forumpostMD1 col-12 col-md-4 my-2" key={Index}>
                                    <div className="MDPostContent ">
                                        <a href={`/forum/post/${item.articleId}`}>
                                            <h1>{item.articleTitle}</h1>
                                        </a>
                                        <p>
                                            <div dangerouslySetInnerHTML={{ __html: item.articleText }} />
                                        </p>
                                        <div className="UserBar">
                                            <img src={require('../img/Post/Userlogo2.jpg')} />
                                            <div className="UserInfo">
                                                <p> {item.nickname}</p>
                                                <p> {item.postdate}</p>
                                                <p>{item.gameCategory}</p>
                                            </div>
                                            <span>{item.articleType}</span>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                    <div className="forumpostED ">
                        <a href={`/forum/post/${this.state.context9.articleId}`}>
                            <img src={this.state.context9.articleImg} />
                        </a>
                        <div className="UserBar">
                            <img src={require('../img/Post/Userlogo2.jpg')} />
                            <div className="UserInfo ">
                                <p> {this.state.context9.nickname}</p>
                                <p> {this.state.context9.postdate}</p>
                                <p>{this.state.context9.gameCategory}</p>
                            </div>
                            <span>{this.state.context9.articleType}</span>
                        </div>
                    </div>
                </div>

            </div >
        );
    }
}

export default Index;