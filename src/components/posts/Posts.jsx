import React from 'react';
import AddPost from './AddPost';
import PostSummary from './PostSummary';
import { firestoreConnect } from 'react-redux-firebase';
import {compose} from 'redux';
import {connect} from 'react-redux';
import Jumbotron from '../recources/UI/Jumbotron';

const  Posts =  ( props ) =>   {
           const  { completePosts , auth  } = props; 
          
           const  showPosts =  posts  => 
            (  <div className="posts">       
                {
                   posts &&
                   auth &&
                   posts.map( post => <PostSummary   key={post.postId} post={post}  auth={auth} />)
                }
               </div>
            );
  
          return(
            <section className="container">
             
              <Jumbotron title="Posts" description="Welcome to our community "> 
                <i className="fas fa-users"> </i> 
              </Jumbotron>
              
              <div className="post-form">
                <AddPost  props={props} />
              
                { completePosts?.length > 0 &&  showPosts(completePosts)}
              </div>
             </section>
           );     
   }

 

const mapStateToProps =  state  => {     
      let users = state.firestore.data.users;   
      //console.log(users);
      const getPosts = ( ) => users && state.firestore.ordered.posts &&
                               state.firestore.ordered.posts.map( post => {
                               // console.log(post);
                                let  filteredComments =  getComments(post);                              
                                            return {
                                              body:post.body,
                                              createdAt:post.createdAt,
                                              postId:post.postId,
                                              user:users[post.userId],
                                              comments:filteredComments,
                                              reacts: getReacts(post)
                                          }
                                  }); 
       const getComments =  post  => state.firestore.ordered.comments && 
                                     state.firestore.ordered.comments
                                    .filter(comment => comment.postId === post.postId) 
                                    .map( comment => {   
                                      return {
                                        ...comment,                                 
                                        user:users[comment.userId] //add user object that is the owner of this comment
                                      }
                                    });
      // get reacts on post or comment based on parameter reacatble = post | comment  
       const getReacts = ( reactable ) => {              
                                          const reacts = state.firestore.ordered.reacts &&     
                                                         state.firestore.ordered.reacts
                                                        .filter(react => react.reactableId === reactable.id);  
                                          return reacts ;   
                                     }

         
      let completePosts = getPosts();
       
      return {
        auth : state.firebase.auth,
        completePosts
      //  testPosts:state.posts
        }
      // the format of post we want to map to props
      //  [
      //    { postId ,
      //        body , 
      //        userId ,
      //        createdAt ,
      //        postReacts:[
     //                       {reactType,reactableId,reactorId,reactedId},
     //                       {reactType,reactableId,reactorId,reactedId},
     //                       {reactType,reactableId,reactorId,reactedId}
      //                    ],
      //        postUser : { userId , imageUrl  } ,
      //        postComments: [
      //                         {body, userHandle,userImg,createdAt},
      //                         {body, userHandle,userImg,createdAt},
      //                         {body, userHandle,userImg,createdAt}  
      //                       ]
      //     }
      //  
      // ]   
}


export default compose(
    connect(mapStateToProps , null),
    firestoreConnect([
       { collection:'posts'},
       { collection:'users'},
       { collection:'comments'},
       { collection:'reacts'},

    ])  
)  ( Posts);

