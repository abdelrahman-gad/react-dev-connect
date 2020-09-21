import React from 'react';
import {connect } from 'react-redux';
import ReactsBar from './../ReactsBar';
import {showReadableDateTime} from '../../../utils/utilsFuncs';
import { NavLink } from 'react-router-dom';
import {deleteComment}  from '../../../store/actions/commentsActions';

class Comment extends React.Component{


     
    handleDeleteComment(e,commentId ){
         e.preventDefault();
        //  console.log(commentId);
         this.props.deleteComment(commentId);
    }

    render (){

      const { comment , auth } = this.props;
      //console.log(comment);
      if(! ( comment && comment.reacts && comment.user)){
            return (
                <div className="container"> 
                   <h1 className="text-center text-primary loading">Loading Comments......</h1>
                </div>
            );
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
                             <ReactsBar  reacts={comment.reacts}  reactableId={comment.commentId} reactedId={comment.user.userId} reactorId={auth.uid}  />  
                              {  auth.uid === comment.userId?  
                              <button className="btn"
                              onClick={ e => this.handleDeleteComment(e,comment.commentId)}
                              >
                                    <i className="fas fa-trash text-danger">  </i>
                              </button>:null
                              }


                             <span className="text-primary"> {showReadableDateTime(comment.createdAt)}  </span>

                           </span>   
                          
                          </p>
                    </div>
                     
                 </div>
             );     
         } 
      
      
 }


}

const mapDispatchToProps = (dispatch)=>{
    return {
        deleteComment: (commentId)=>dispatch(deleteComment(commentId)) 
    }
}


export default  connect( null, mapDispatchToProps )  (Comment);

