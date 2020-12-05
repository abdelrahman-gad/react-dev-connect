import React ,{ useState , useEffect, Fragment} from 'react';
import {NavLink} from 'react-router-dom';
import ReactsBar from './ReactsBar';
import {showReadableDateTime} from '../../utils/utilsFuncs';
import {connect} from 'react-redux';
import {deletePost } from '../../store/actions/postsActions';
import { Loading } from '../recources/UI/helpers';
import {confirmAlert} from 'react-confirm-alert';
import { toast } from 'react-toastify';

const PostSummary =  ( props ) => {
  const  { post , auth , deletePost } = props;
  
    const  handleDelete = (e , postId ) => {
       e.preventDefault();
       confirmAlert({
        title: 'Confirm to Delete',
        message: 'Are you sure to delete this post',
        buttons: [
          {
            label: 'Yes',
            onClick: () => {
               deletePost(postId);
               toast.success(`You have deleted post successfully`,{
                 position:toast.POSITION.BOTTOM_RIGHT,
                 autoClose:8000
               });                            
            }
          },
          {
            label: 'No',
            onClick: () => { return; }
          }
        ]
      });
    } 
    
 
  let  { body , postId, createdAt , user , comments , reacts } = post; 

             if(comments && user && reacts){
              return (
                <div className="post-info bg-white my-1 p-1" >
                  <div className="user">
                   <NavLink exact to={"/profile/"+user.userId}>
                     <img
                       className="img-rounded user-post-img"
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
                     <ReactsBar  reacts={reacts} reactableType={"post"}  reactableId={postId} reactedId={user.userId} reactorId={auth.uid}  />
                    
                     <NavLink   to={'/post/'+postId}   className="btn">
                         <i className="fas fa-comment"></i>  <span> {comments.length}  </span>
                     </NavLink>
                     {auth.uid === user.userId?
                         <span>
                             <button
                               className="btn btn-danger"
                               onClick={(e)=> handleDelete(e , postId)}
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
             }else{
               return Loading('Loading Post .......');
            }         
}
     
const mapDispatchToProps  = (dispatch ) =>{
  return {
    deletePost:  (postId)=> dispatch(deletePost(postId)) 
  }
}


export default   connect ( null, mapDispatchToProps) (PostSummary);
