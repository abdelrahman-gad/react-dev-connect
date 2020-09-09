import React from 'react';
import {NavLink} from 'react-router-dom';
class PostSummary extends React.Component{


    render(){
      const {id,body,userHandle,createdAt,userImage,likeCount,commentCount} = this.props.post;
        return (
            <div className="post-info bg-white my-1 p-1"   >
            <div className="user">
              <NavLink exact to="/profile">
                <img
                  className="round-img user-post-img"
                  src={userImage?userImage:"https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200"}
                  alt=""
                />
                <h4 className="username">{userHandle}</h4>
              </NavLink>
            </div>

            <div className="content">
              {/* <h3 className="my-1"> Post title  </h3> */}
              <p className="my-1">
                {body}
              </p>
           
             
                <button className="btn">
                  <i className="fas fa-thumbs-up"></i> <span>3</span>
                </button>
                <button className="btn">
                  <i className="fas fa-thumbs-down"></i> <span>3</span>
                </button>
              <button className="btn">
                <i className="fas fa-heart"></i> <span> {likeCount} </span>
               </button>
               <NavLink   to={'post:'+id}   className="btn">
                  <i className="fas fa-comment"></i>  <span> {commentCount} </span>
               </NavLink>
               <p className="">

               </p>
              <NavLink  to={'post:'+id} className="btn btn-primary">
                Discussion
              </NavLink>
            </div>
          </div>
        );

    }
}
               

export default PostSummary;

