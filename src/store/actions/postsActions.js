import {v4 as uuid4} from 'uuid';
export const addPost = (post)=>{
    return (dispatch,getState,{getFirebase,getFirestore})=>{
        
        const firestore = getFirestore();
        const profile = getState().firebase.profile;
        const authorId= getState().firebase.auth.uid;
        let postId = uuid4(); 
        firestore.collection('posts').doc(postId).set({
            ...post,
            postId:postId,
            commentCount:0,
            likeCount:0,
            commentCount:0,
            userHandle:profile.handle,
            userId:authorId,
            createdAt: new Date()
        }).then(()=>{
          dispatch({type:'ADD_POST_SUCCESS'})
       }).catch((err)=>{
           dispatch({type:'ADD_POST_ERROR',payload:err.message})
       });

       
    }
} 


export const deletePost= (postId)=>{
    console.log('delete Post actions');
    return (dispatch,getState,  {getFirebase, getFirestore } )=>{
        const firestore= getFirestore();

        firestore.collection('posts').doc(postId).delete()
                  .then( () => dispatch({type:'DELETE_POST_SUCCESS'}))
                  .catch( (err) => dispatch({type:'DELETE_POST_ERROR',payload:err.message}));
    }
}



export const editPost = (updPost)=>{
     return (dispatch,getState, {getFirebase,getFirestore} ) => {
               console.log('edit post from actions');
               console.log(updPost);

              const firestore = getFirestore();
              firestore.collection('posts').doc(updPost.postId)
                       .set({
                           ...updPost
                       }).then(()=>dispatch({type:'EDIT_POST_SUCCESS'}))
                         .catch((err)=>dispatch({type:'EDIT_POST_ERROR',payload:err.message})); 
     }
}




