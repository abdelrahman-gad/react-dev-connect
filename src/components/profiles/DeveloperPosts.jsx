import React from 'react';
import PostSummary from '../posts/PostSummary';
import AddPost from '../posts/AddPost';
import { firestoreConnect } from 'react-redux-firebase';
import {compose} from 'redux';
import {connect} from 'react-redux';
import { Redirect } from 'react-router-dom';
class DeveloperPosts extends React.Component{
 
  
 

   render(){
     //console.log('render');
       const { completePosts ,  auth , developerId } = this.props; 
          
       //console.log(auth);

       if(!auth.uid){
         return (<Redirect exact  to="/"  />);
       }else{
         if(! completePosts ){
            return (
                     <div className="container">
                         <h2 className="text-primary  text-center loadin ">Loading Posts .....</h2>
                    </div>
                    );
         }else{
           console.log(completePosts);
          return(
            <section className="container" >
            <h1 className="large text-primary">
              Posts
            </h1>
            <p className="lead"><i className="fas fa-user"></i> Welcome to the community</p>
      
            <div className="post-form">
             {auth.uid === developerId ? <AddPost props={this.props}/> : null }  
            
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
       
   }

}

const mapStateToProps = (state,ownProps) =>{
      let auth =state.firebase.auth;
      let developerId = ownProps.match.params.id;
      let posts = state.firestore.ordered.posts;
       
      let users = state.firestore.data.users;
      let comments =state.firestore.ordered.comments;
      let reacts =state.firestore.ordered.reacts;
     // console.log(auth);
     // console.log(posts);
     
     if(posts && users && comments && reacts ){
         // get Posts of one specific user
         posts = posts.filter(post => post.userId === developerId);
      let completePosts = posts.map(post=>{
              // fetch comments belongst to this specific post 
          let    filteredComments = comments.filter(comment=>comment.postId === post.postId) 
                                 .map(comment=>{   
                                  return {
                                    ...comment,                                 
                                    user:users[comment.userId] //add user object that is the owner of this comment
                                  }
                                });
              
            return {
                body:post.body,
                createdAt:post.createdAt,
                postId:post.postId,
                user:users[post.userId],
                comments:filteredComments,
                reacts:reacts.filter(react=>react.reactableId === post.postId)
            }
      });
        //console.log(completePosts);
        //console.log('All data are loaded');
            return{
              auth,
              completePosts,
              developerId
              }
          } else return {
            auth
          };

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

