import React, { Component } from 'react';
import NavBar from './NavBar';
import axios from 'axios'
import Tiptap from './Tiptap';
import Uploads from './upload';
import authHeader from './authHeader';

class Create extends Component {
  state = {
    data: [{}],
  }

  async componentDidMount() {
    var result = await axios.get(`http://localhost:8000/edit/${this.props.match.params.articleId}`)
    this.state.data = result.data
    this.setState({});
    
  }



  // OKBTN = async () => {
  //   const today = new Date()
  //   const yy = today.getFullYear();
  //   const mm = today.getMonth() + 1;
  //   const dd = today.getDate();
  //   const h = today.getHours();
  //   const m = today.getMinutes();
  //   var CommentTime = yy + "-" + mm + "-" + dd + "-" + h + ":" + m;

  //   var dataToSever = {
  //     articleTitle: document.getElementsByClassName('articleTitle')[0].value,
  //     articleText: document.getElementsByClassName('ProseMirror')[0].innerHTML,
  //     articleType: document.getElementsByClassName("articleType")[0].value,
  //     postdate: CommentTime,
  //     DiscNum: window.location.href.slice(-1),
  //     uid: this.state.data[0].uid
  //   }
  //   await axios.post('http://localhost:8000/forum/create', new Array(dataToSever))
  //   window.location = `/forum/dis/${dataToSever.DiscNum}`;
  //   // console.log(`/forum/dis/${dataToSever.DiscNum}`)

  // }

  render() {
    return (

      <div >
        <NavBar /> 
        <div className='container create_edit'>

          <div className='row'>
            <input className='articleTitle col-8 col-md-10 ' type="text" placeholder='輸入標題' value={this.state.data[0].articleTitle} />

            {/* <Uploads /> */}

            <select className='articleType col-4 col-md-2 '>
              <option value="創作圖文">創作圖文</option>
              <option value="問題討論">問題討論</option>
              <option value="心得分享">心得分享</option>
              <option value="泡茶閒聊">泡茶閒聊</option>
            </select>
            <Tiptap text={this.state.data[0].articleText}/>
            <input type="button" value={"確定"} className={"btn  bg-success text-white"} /> |
            <a href='#' className="btn  bg-danger text-white">取消</a>
          </div >
        </div>
      </div>
    );
  }
}

export default Create;