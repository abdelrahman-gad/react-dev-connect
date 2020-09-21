import React from 'react';
import {NavLink} from 'react-router-dom';
import ReactsBar from './ReactsBar';
import {showReadableDateTime} from '../../utils/utilsFuncs';
import {connect} from 'react-redux';
import {deletePost } from '../../store/actions/postsActions';


class PostSummary extends React.Component{
     constructor(props){
       super(props);
       this.handleDelete=this.handleDelete.bind(this);
      
     }
     handleDelete(e,postId){
       e.preventDefault();
       const {deletePost} = this.props;
       deletePost(postId);

      }
   
 
    render(){
      const { post , auth }=this.props;
      
    
          //console.log(post);
          
         if( !( post && auth  )  ){
           return null;
         }else{
           //console.log(post);
          let {body,postId, createdAt , user , comments , reacts} = post; 
         // console.log(createdAt);
             if(!(user && comments  &&  reacts )){
               return <h1 className="text-center text-primary loading"> Loading post ........ </h1>
             }else{
               //console.log(post);

              return (
                <div className="post-info bg-white my-1 p-1"   >
                <div className="user">
                  <NavLink exact to={"/profile/"+user.userId}>
                    <img
                      className="round-img user-post-img"
                      src={user.imageUrl?user.imageUrl:"https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200"}
                      alt={user.userId}
                    />
                    <h4>{user.handle}</h4>
                  </NavLink>
                </div>
    
                <div className="content">
                    {/* <h3 className="my-1"> Post title  </h3> */}
                    <h2 className="title"> {body.slice(0,20)}..  </h2>
                    <p className="my-1">
                     
                      {body}
                      <br/>
              
                    </p>
                    <h4>posted at : <span className="text-primary"> {showReadableDateTime(createdAt)}  </span>  </h4>
                    <ReactsBar  reacts={reacts}  reactableId={postId} reactedId={user.userId} reactorId={auth.uid}  />
                   
                    <NavLink   to={'/post/'+postId}   className="btn">
                        <i className="fas fa-comment"></i>  <span> {comments.length}  </span>
                    </NavLink>
                    {auth.uid===user.userId?
                        <span>
                          <button
                              className="btn btn-danger"
                              onClick={(e)=>this.handleDelete(e,postId)}
                              >
                              <i className="fas fa-trash"></i>
                            </button>
                            <NavLink
                              className="btn btn-success"
                              exact to={'/editPost/'+postId}
                              >
                            <i className="fas fa-edit"></i>
                           </NavLink>
                         </span>
                             :null}
                   
    
    
                      <NavLink  to={'/post/'+postId} className="btn btn-primary">
                        Discussion
                      </NavLink>
                
                </div>
              </div>
             );
           }
      

      }
   
    }
}
     
const mapDispatchToProps  = (dispatch , ownProps ) =>{
  return {
    deletePost:  (postId)=> dispatch(deletePost(postId)) 
  }
}


export default   connect (null, mapDispatchToProps) (PostSummary);
