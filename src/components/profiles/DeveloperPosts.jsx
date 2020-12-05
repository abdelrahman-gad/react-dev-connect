import React from 'react';
import PostSummary from '../posts/PostSummary';
import AddPost from '../posts/AddPost';
import { firestoreConnect } from 'react-redux-firebase';
import {compose} from 'redux';
import {connect} from 'react-redux';
import { Redirect } from 'react-router-dom';
import {Loading} from '../recources/UI/helpers';
import Jumbotron from '../recources/UI/Jumbotron';

const  DeveloperPosts = (props ) =>  {
  const  { completePosts ,  auth , developerId } = props;
         if(! completePosts ){
            return Loading('Loading Post .....');
         }else{
           //console.log(completePosts);
          return(
            <section className="container" >
            <Jumbotron
              title="Post"
              description="those are posts  of developer"
             >
               <i className="fas fa-user"></i>
            </Jumbotron>
            <div className="post-form">
             {auth.uid === developerId ? <AddPost props={props}/> : null }       
              <div className="posts">       
                {completePosts.length > 0 ?
                 completePosts.map( post => <PostSummary key={post.postId} post={post} auth={auth} />) 
                 : <h1 className="text-center text-primary"> There is no posts for this developer  </h1>
                }
              </div>
            </div>
          </section>
           );
         }
}

const mapStateToProps = (state,ownProps) => {
      let auth =state.firebase.auth;
      let developerId = ownProps.match.params.id;
      let posts = state.firestore.ordered.posts;       
      let users = state.firestore.data.users;
      let comments =state.firestore.ordered.comments;
      let reacts =state.firestore.ordered.reacts;

     if(posts && users && comments && reacts ){
         // get Posts of one specific user     
                posts = posts.filter(post => post.userId === developerId);
                const   getCompletePosts = ( ) => posts.map( post => {
                  // fetch comments belongst to this specific post  
                    const getComments = () => comments.filter(comment=>comment.postId === post.postId) 
                                                      .map( comment => {   
                                                        return {
                                                          ...comment,                                 
                                                          user:users[comment.userId] //add user object that is the owner of this comment
                                                        }
                                                    }); 

                    const getReacts = () =>  reacts.filter(react => react.reactableId === post.postId);
                    return {
                        body:post.body,
                        createdAt:post.createdAt,
                        postId:post.postId,
                        user:users[post.userId],
                        comments:getComments(),
                        reacts:getReacts()
                    }
          }); 
         let completePosts = getCompletePosts(); 
        
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
      //                       
      //        
      //     }
      //  
      // ]
        return{
          auth,
          completePosts,
          developerId
        }
      } else return { auth };
}


export default compose(
    connect(mapStateToProps),
    firestoreConnect([
       { collection:'posts'},
       { collection:'users'},
       { collection:'comments'},
       { collection:'reacts'}
    ])
    
)  ( DeveloperPosts);

