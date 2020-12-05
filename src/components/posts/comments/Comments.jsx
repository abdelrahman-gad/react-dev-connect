import React from 'react';
import AddComment from './AddComment';
import Comment from './Comment';

const Comments  = (props) => {

        const { postId , comments  , auth } = props;
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

export default Comments;
