export const addPost = (post)=>{
    return (dispatch,getState,{getFirebase,getFirestore})=>{
        
        const firestore = getFirestore();
        const profile = getState().firebase.profile;
        const authorId= getState().firebase.auth.uid;
        firestore.collection('posts').add({
            ...post,
            commentCount:0,
            likeCount:0,
            commentCount:0,
            userHandle:profile.handle,
            createdAt:new Date()

        }).then(()=>{
          dispatch({type:'ADD_POST'})
       }).catch((err)=>{
           dispatch({type:'ADD_POST_ERROR',payload:err.message})
       });
    }
} 