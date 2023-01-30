
import React, { Component } from 'react';
import '../css/PostView.css';
import axios from 'axios';
import PostDetail from './PostDetail';
import queryString from 'query-string';
class PostView extends Component {

    constructor(props){
        super(props);
        this.state={
            post:[

            ]
            ,
            renderCall:0
        }
    }

    axiosGetPostByNo=async(no)=>{
        alert("글 번호로 요청!")
        const res = await axios.get(`/board/${no}`);
        console.log(res);
        console.log(res.data.board_data)
        const post=res.data.board_data
        console.log(post)
        this.setState({
            post:post
        })
    }

    increaseViewCount=async(no)=>{
        alert("조회수 증가!")
        //const res = await axios.put('/api/put/view/increase' + no);
        //console.log(res)
        //조회수 1증가 (수정)

    }

    componentDidMount(){
        console.log(window.location)
        console.log(window.location.search)
        const queryObj=queryString.parse(window.location.search)
        console.log("no",queryObj.no)
        const no=queryObj.no
        this.axiosGetPostByNo(no)//글번호 데이터 요청
        this.increaseViewCount(no)//글번호 조회수 1증가 (수정)
        this.setState({
            renderCall:this.state.renderCall+1
        })
    }

    //번호,제목,작성자,등록일,첨부,조회
    render(){
        const postByNo=this.state.post
        console.log('this.state',this.state)
        const result=postByNo.map(post=>(
            <PostDetail no={post.no} title={post.title} contents={post.contents}
            author={post.author} regDate={post.regDate}
            attach={post.attach} hits={post.hits}></PostDetail>)
            )
        return(
            
        <div id="post-view">
            {result}
        </div>
        )
        
    }
}

export default PostView;
