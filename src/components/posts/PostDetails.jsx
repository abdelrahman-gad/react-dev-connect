import React from 'react';
import {connect} from 'react-redux';
import { NavLink } from 'react-router-dom';
import {firestoreConnect} from 'react-redux-firebase';
import {compose } from 'redux';
import Comments from './comments/Comments';
import ReactsBar from './ReactsBar';
import {showReadableDateTime} from '../../utils/utilsFuncs';
import { Loading } from '../recources/UI/helpers';

import {formatDate} from '../recources/UI/helpers';

const PostDetails = ( props ) => {

                    let { post  , auth } = props;                   
                    
                       
                      if(!(post && post.user && post.comments  && post.reacts) ){
                       return  Loading('Loading Post .......');
                      }else{
                          let {body , postId ,createdAt , user , comments , reacts} = post;
                           return (
                                <section className="container">
                                  <NavLink exact to="/posts" className="btn">Back To Posts</NavLink>
                                  <div className="post">
                                    <div className="post-info">
                                        <div className="user">
                                          <NavLink exact to={"/profile/"+user.userId}>
                                            <img
                                              className="img-rounded"
                                              src={user.imageUrl}
                                              alt={user.handle}
                                            />
                                            <h4 className="user-name"> {user.handle} </h4>
                                          </NavLink>                    
                                        </div>
                                        <div className="content">
                                          <h2 className="title"> {body.slice(0,20)}..  </h2>
                                          <p className="body"> 
                                            {body}
                                          </p>
                                          <h4>posted at : <span className="text-primary">  {formatDate(createdAt.toDate())}</span>  </h4>
                                        </div>  
                                    </div> 
                                  </div>                        
                                  <div className="post-reacts">
                                   <ReactsBar  reacts={reacts} reactableType={"post"}  reactableId={postId} reactedId={user.userId} reactorId={auth.uid}  />
                                      <button  className="btn">
                                          <i className="fas fa-comments"></i>  <span> {comments.length} </span>
                                      </button>  
                                  </div>
                                  <Comments postId={postId} comments={comments} auth={auth} />
                             </section> 
                          ); 
            }   
}

const mapStateToProps =(state,ownProps)=> {
    let  auth = state.firebase.auth;
    let  postId=ownProps.match.params.id;
    let  posts =state.firestore.data.posts;
    let  users = state.firestore.data.users;
    let  comments= state.firestore.ordered.comments;
    let  reacts=state.firestore.ordered.reacts;
 //   console.log(postId);


    if( posts &&  users  && comments && reacts ){
        let post = posts[postId];
        console.log(posts);
        console.log(postId);
        let user = users?users[post.userId]:undefined;      
        //console.log('data loadded Ok:200 ');
        const getComments =  post  => state.firestore.ordered.comments && 
        state.firestore.ordered.comments
            .filter(comment => comment.postId === postId) 
            .map( comment => {   
              let commentReacts = reacts.filter(react => react.reactableId === comment.commentId);   
              return {
                  ...comment,    
                  reacts:commentReacts,                             
                  user:users[comment.userId] //add user object that is the owner of this comment
                }
              });

        comments = getComments();
        reacts = reacts.filter(react => react.reactableId === postId); 
        let   newPost = {...post,postId,user,comments,reacts};
        //console.log(post);
            return {
                auth,
                post:newPost
            };

        } else{
          return {
            auth
          };
        } 
}

export default compose(
    connect(mapStateToProps,null),
    firestoreConnect([
        {collection:'profiles'},
        {collection:'users'},
        {collection:'posts'},
        {collection:'comments'},
        {collection:'reacts'} 
    ])
  )(PostDetails);