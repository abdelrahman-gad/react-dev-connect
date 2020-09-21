import React from 'react';
import AddComment from './AddComment';
import Comment from './Comment';

class Comments extends React.Component{

    render(){
        const {postId , comments  , auth} =this.props;
        //console.log(postId);
      //  console.log(comments);
        return (
              <div className="post-interaction">
                        <AddComment postId={postId}  auth={auth}  /> 
                        <div className="comments">
                           {comments && comments.map(comment=><Comment key={comment.commentId} comment={comment} auth={auth}   />) }
                         </div>
                </div>
             );
    }
}


export default Comments;
