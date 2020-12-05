import React from 'react';
import { connect } from 'react-redux';
import ReactsBar from './../ReactsBar';
import { NavLink } from 'react-router-dom';
import { deleteComment}  from '../../../store/actions/commentsActions';
import { Loading} from '../../recources/UI/helpers';
import { confirmAlert } from 'react-confirm-alert';
import { toast } from 'react-toastify';
import { formatDate } from '../../recources/UI/helpers';

const  Comment  = ( props ) => {
    const { deleteComment , comment , auth } = props;

    const  handleDelete = (e , postId ) => {
      e.preventDefault();
      confirmAlert({
       title: 'Confirm to Delete',
       message: 'Are you sure to delete Comment',
       buttons: [
         {
           label: 'Yes',
           onClick: () => {
              deleteComment(postId);
              toast.success(`You have deleted comment successfully`,{
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
   
      if(! ( comment && comment.reacts && comment.user)){
             Loading('Loading comments .....') 
         }
         else{
           //  showReadableTime(comment.createdAt);
            return (               
                <div className="comment">
                   <div className="comment-info">
                      <div className="user">            
                            <NavLink exact to={"/profile/"+comment.user.userId}>
                                <img
                                 className="round-img user-img"
                                 src={comment.user.imageUrl?comment.user.imageUrl:"https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200"}
                                 alt={comment.user.handle?comment.user.handle:'user'}
                                />
                                <h4>  {comment.user.handle} </h4>
                            </NavLink>
                        </div>
                        <p  className="body">
                            <span> {comment.body} </span>
                              <br/>
                              <span className="comment-reacts" > 
                                <br/><br/> 
                                <ReactsBar  
                                  reacts={comment.reacts}  
                                  reactableId={comment.commentId}
                                  reactedId={comment.user.userId} 
                                  reactorId={auth.uid}   
                                  reactableType={"comment"} 
                                />  
                                { 
                                        auth.uid === comment.userId?  
                                        <button className="btn"
                                        onClick={ e => handleDelete(e , comment.commentId)}
                                        >
                                          <i className="fas fa-trash text-danger">  </i>
                                        </button>:null
                                 }
                                <span className="text-primary"> {formatDate(comment.createdAt.toDate())}  </span>
                           </span>   
                          </p>
                    </div>
                     
                 </div>
             );          
 }


}

const mapDispatchToProps = (dispatch)=>{
    return {
        deleteComment: (commentId)=>dispatch(deleteComment(commentId)) 
    }
}


export default  connect( null, mapDispatchToProps )  (Comment);

