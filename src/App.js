import React, { Component } from 'react';
import './App.css';

class App extends Component {

  constructor(){
    super();

    this.getUserInput = this.getUserInput.bind(this);
    this.addUserComment = this.addUserComment.bind(this);

    this.state = {
      userInput: '',
      commentList: [],
    }
  };

  getUserInput(event) {
    let comment = event.target.value;
    this.setState({
      userInput: comment,
    });
  };

  getUserReply(event, i){
    let replyInput = event.target.value
    let state = Object.assign({}, this.state);
    state.commentList[i].replyInput = replyInput;

    this.setState({
      state,
    })
  }

  addUserComment(event) {
    let getCommentsArray = this.state.commentList.slice();
    const newComment = 
        {
          comment: this.state.userInput,
          likes: 0,
          dislikes: 0,
          replyInput: '',
          replies: []
        }
    getCommentsArray.push(newComment);
    this.setState({
      commentList: getCommentsArray,
      userInput: '',
    });
  };

  addReplyComment(i){
    let state = Object.assign({}, this.state);
    const newReply = 
        {
          reply: state.commentList[i].replyInput,
          likes: 0,
          dislikes: 0,
        }
    state.commentList[i].replies.push(newReply);
    state.commentList[i].replyInput = '';
    this.setState({
      state,
    });
  }

  handleRemoveClick(i){
    let commentList = this.state.commentList;
    commentList.splice(i, 1)
    this.setState({
      commentList: commentList,
    })
  }

  handleReplyRemove(i, childIndex){
    let state = Object.assign({}, this.state);
    let replyComment = state.commentList[i].replies;
    replyComment.splice(childIndex, 1)
    this.setState({
      state,
    })
  }

  handleResponseClick(reaction, i) {
    let state = Object.assign({}, this.state);
    if (reaction === "like") {
      // set state to comment with new like
      state.commentList[i].likes++;
    } else if (reaction === "dislike") {
      // set state to comment with new dislike
      state.commentList[i].dislikes++;
    }
    this.setState({
      state
    })
  }

  handleReplyResponse(reaction, i, childIndex){
    let state = Object.assign({}, this.state);
    if (reaction === "like") {
      // set state to comment with new like
      state.commentList[i].replies[childIndex].likes++;
    } else if (reaction === "dislike") {
      // set state to comment with new dislike
      state.commentList[i].replies[childIndex].dislikes++;
    }
    this.setState({
      state
    })
  }

  render() {

    const commentList = this.state.commentList.map(function(commentObj, i){

      const replyList = this.state.commentList[i].replies.map(function(replyObj, childIndex){
        return (
          <ul key={childIndex} className="replies">
            <li>{replyObj.reply}
            <button onClick={ () => {this.handleReplyResponse("like", i ,childIndex)} }>

            {this.state.commentList[i].replies[childIndex].likes} Like
            {this.state.commentList[i].replies[childIndex].likes === 1 ? '' : 's'}</button>

            <button onClick={ () => {this.handleReplyResponse("dislike", i, childIndex)} }>

            {this.state.commentList[i].replies[childIndex].dislikes} Dislike
            {this.state.commentList[i].replies[childIndex].dislikes === 1 ? '' : 's'}</button>

            <button onClick={ () => {this.handleReplyRemove(i, childIndex)} }>Remove</button>
            </li>
          </ul>
        );
      }, this);

      return (
        <li key={i}>
          <button onClick={()=>{this.handleResponseClick("like", i)}}>

          {this.state.commentList[i].likes} Like
          {this.state.commentList[i].likes === 1 ? '' : 's'}</button>

          <button onClick={()=>{this.handleResponseClick("dislike", i)}}>
          {this.state.commentList[i].dislikes} Dislike{this.state.commentList[i].dislikes === 1 ? '' : 's'}
          </button>
          <button onClick={()=>{this.handleRemoveClick(i)}}>Remove</button>
          <div>
            <div className="init-comment">{commentObj.comment}</div>
            <input type="text" value={this.state.commentList[i].replyInput} onChange={ (event) => {this.getUserReply(event, i)} } placeholder="Type your reply..."/>
            <button id="reply-btn" onClick={ () =>{this.addReplyComment(i)} }>Reply</button>
          </div>
          {replyList}
        </li>
      );
    }, this);


    return (
      <div className="App">
        <h1>React Comment Example</h1>
        <input type="text" value={this.state.userInput} onChange={this.getUserInput} placeholder="Type your comment..."/>
        <button id="init-submit" onClick={this.addUserComment}>Submit</button>
        <ul className="comments">
          {commentList}
        </ul>
      </div>
    );
  }
}

export default App;