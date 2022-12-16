import React, { Component } from 'react';
import axios from 'axios'
import NavBar from './NavBar';

class forumGameDis extends Component {
    state = {
        data: [{}]
    }
    async componentDidMount() {
        var result = await axios.get("http://localhost:8000/forum/gamedis");
        this.state.data = result.data
        this.setState({})
    }

    Hot = async (Num) => {
        let obj = {DiscNum:Num}
        var url =`http://localhost:8000/DiscNum`
        await axios.post(url,obj)
        console.log(url)
    }

    render() {
        return (
            <div className=''>
                <NavBar />
                <div className=" ForumGamerDisforumBGC container">

                    <div className='row'>

                        <div className="ForumGamerDisforumTitle col-12">
                            <h1>討論區</h1>
                            <p>遊戲與軟體社群和官方內容</p>
                        </div>

                        <div className=" col">
                            {
                                this.state.data.map((item, index) =>
                                    <div className="ForumGamerDisforumDis " key={index}>
                                        <div className="forumDisPic  ">
                                            <a href={`/forum/dis/${item.DiscNum}`} onClick={()=>{this.Hot(item.DiscNum)}}>
                                                <img src={item.DiscPic} />
                                            </a>
                                        </div>

                                        <div className="forumDisGamer Up ">
                                            <a href={`/forum/dis/${item.DiscNum}`} onClick={()=>{this.Hot(item.DiscNum)}} >
                                                <h1>{item.DiscName}</h1>
                                            </a>
                                            <a href={`/forum/post/${item.articleId}`} onClick={()=>{this.Hot(item.DiscNum)}}>
                                                <h2>{`【${item.articleType}】${item.articleTitle}`}</h2>
                                            </a>
                                        </div>
                                        <div className="forumDisGamerBar">
                                            <img src={require('../img/disc/hot-sale.png')} />
                                            <p>{item.DiscHot}</p>
                                            <span>版主 EXE.2154</span>
                                        </div>
                                        <div className="forumDisGamerNum">
                                            <h1>{index + 1}</h1>
                                        </div>

                                    </div>
                                )
                            }


                        </div>

                        {/* <div className="forumPage col-12">
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
            </div>
        )
    }
}

export default forumGameDis;