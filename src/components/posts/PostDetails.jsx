import React from 'react';
import {connect} from 'react-redux';
import { NavLink, Redirect } from 'react-router-dom';
import {firestoreConnect} from 'react-redux-firebase';
import {compose } from 'redux';
import Comments from './comments/Comments';
import ReactsBar from './ReactsBar';
import {showReadableDateTime} from '../../utils/utilsFuncs';


class PostDetails extends React.Component{

    render(){
                    let {auth,post} =this.props;                   
                    if(!auth.uid){
                       return (<Redirect exact to="/" /> );
                    }else{
                            // make sure that the entire object is available
                      if(!(post && post.user && post.comments  && post.reacts )){
                        return (
                            <div className="container"> 
                              <h1 className="text-center loading text-primary"> Data Loading ....... </h1>
                            </div>                            
                          );
                      }else{
                      // console.log(post);
                               let {body , postId ,createdAt , user , comments , reacts} = post;
                                //onsole.log(comments);


                             return (
                                <section className="container">
                                  <NavLink exact to="/posts" className="btn">Back To Posts</NavLink>
                                  <div className="post">
                                    <div className="post-info">
                                        <div className="user">
                                        
                                                <NavLink exact to={"/profile/"+user.userId}>
                                                  <img
                                                    className="round-img user-img"
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
                                          <h4>posted at : <span className="text-primary"> {showReadableDateTime(createdAt)}  </span>  </h4>
                                        </div>  
                                    </div> 
                                  </div>
                                  
                                  <div className="post-reacts">
                                   <ReactsBar  reacts={reacts}  reactableId={postId} reactedId={user.userId} reactorId={auth.uid}  />
                                      <a className="btn">
                                          <i className="fas fa-comments"></i>  <span> {comments.length} </span>
                                      </a>  
                                  </div>
                                  <Comments postId={postId} comments={comments} auth={auth} />
                             </section> 
                             ); 
       
                      }
                      
                    }
           
             }
}

const mapStateToProps =(state,ownProps)=>{
    let auth = state.firebase.auth;
   let  postId=ownProps.match.params.id;
   let  posts =state.firestore.data.posts;
   let  users = state.firestore.data.users;
   let comments= state.firestore.ordered.comments;
   let reacts=state.firestore.ordered.reacts;

  

    if( (posts &&  users  && comments && reacts )){
        let post =posts?posts[postId]:undefined;
        let user = users?users[post.userId]:undefined;    
        
        //console.log('data loadded Ok:200 ');
        comments = comments.filter(comment=>comment.postId===post.postId) 
        .map(comment=>{    
            let commentReacts = reacts.filter(react=>react.reactableId===comment.commentId);          
            return {
              ...comment,
              reacts:commentReacts,
              user:users[comment.userId] //add user object that is the owner of this comment
            }
         });
        reacts = reacts.filter(react=>react.reactableId===postId); 
        let   newPost = {...post,postId,user,comments,reacts};
        //console.log(post);
        return {
            auth,
            post:newPost
        }
        }else if (auth) {
            return {
                auth
            };
        } else return {};
    
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
  )
  (PostDetails);