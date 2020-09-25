import {v4 as uuid4} from 'uuid'; 
import {
      ADD_COMMENT_SUCCESS ,
      ADD_COMMENT_ERROR,
      DELETE_COMMENT_SUCCESS , 
      DELETE_COMMENT_ERROR 
    }  from './actions';


export const addComment = (comment) =>{
   //  console.log(comment);
    return (dispatch, getState , {getFirebase,getFirestore})=>{

        let   commentId = uuid4(); 
        const firestore = getFirestore();
         console.log(commentId);

        firestore.collection('comments').doc(commentId).set({
            ...comment,
            commentId:commentId,
            createdAt:new Date()     
        }).then(()=>dispatch({type:ADD_COMMENT_SUCCESS}))
          .catch(err=>dispatch({type:ADD_COMMENT_ERROR,payload:err.message}));


         let notificationId= uuid4(); 

         // notifiedId 
        let   posts =  getState().firestore.data.posts;
        let   post  = posts ? posts[comment.postId]:undefined;
      
        if(post){
            firestore.collection('notifications').doc(notificationId).set({
                notificationId,
                notifierId:comment.userId,
                notifiableId:comment.postId,
                notifiableLink:"/post/"+comment.postId,
                notifiedId:post.userId,            
                createdAt:new Date(),
                read:false,
                body:'someone commented on on your post'
          });
        }
       

    }
}

export const deleteComment= (commentId)=>{
    return (dispatch,getState, {getFirebase, getFirestore } )=>{
       const firestore= getFirestore();
       firestore.collection('comments').doc(commentId).delete()
       .then(()=>dispatch({type:DELETE_COMMENT_SUCCESS}))
       .catch(err=>dispatch({type:DELETE_COMMENT_ERROR , payload: err.message }))

    }
}

