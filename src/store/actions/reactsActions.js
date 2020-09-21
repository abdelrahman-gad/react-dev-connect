import {v4 as uuid4} from 'uuid';

export const addReact = ( react ) => {
   // console.log(react);
    return (dispatch, getState , {getFirebase,getFirestore})=>{

        // let   commentId = uuid4(); 
        const firestore = getFirestore();
        const posts = getState().firestore.ordered.posts;
        const comments= getState().firestore.ordered.comments;
        const oldReacts = getState().firestore.ordered.reacts;
        // console.log(oldReacts);
         //console.log(react); 

         let oldReact = oldReacts.filter( oldReact => {
             if( oldReact.reactorId === react.reactorId  && oldReact.reactableId === react.reactableId  ) return true;
             else return false; 
         });
              
           
          //  console.log(oldReact);
            if(oldReact.length > 0){ // there is a react already exists belongs to this user 
                let oldReactObj = oldReact[0];
               // console.log(oldReactObj);
                if(oldReactObj.reactType === react.reactType){
                    // toggle React delete there is a record
                    firestore.collection('reacts').doc(oldReactObj.reactId).delete()
                              .then(()=>dispatch({type:'DELTETE_REACT_SUCCESS'}))
                              .catch(err=>dispatch({type:'DELETE_REACT_ERROR',payload:err.message}));

                }else{
                    firestore.collection('reacts').doc(oldReactObj.reactId).set({
                        ...oldReactObj,
                        reactId:oldReactObj.reactId, 
                        reactType:react.reactType,
                        createdAt:new Date()     
    
                    }).then(()=>dispatch({type:'ADD_REACT_SUCCESS'}))
                    .catch(err=>dispatch({type:'ADD_REACT_ERROR',payload:err.message}));
                    notifyReact(react, posts, comments,firestore);
                }
            
            }else{
                // there is no reacts already in the 
                let reactId = uuid4();
                console.log('new record');
                firestore.collection('reacts').doc(reactId).set({
                    ...react,
                    reactId,
                    createdAt:new Date()     
                }).then(()=>dispatch({type:'ADD_REACT_SUCCESS'}))
                .catch(err=>dispatch({type:'ADD_REACT_ERROR',payload:err.message}));
                
                notifyReact(react,posts,comments,firestore);
            }        
    }
}

const notifyReact=(react, posts , comments, firestore)=>{
   // console.log(posts);
    //console.log(comments);
    // check if the reacted is post or comment 
    const notificationId = uuid4();
    let notifiable;
    let notificationBody;

     if(posts.find(post => post.postId === react.reactableId)){
           notifiable = posts.find(post => post.postId === react.reactableId);
           notificationBody = "someone reacted on your post";
           //console.log(react);    
         //  console.log(notifiable);     
     }else{
        if(comments.find(comment => comment.commentId === react.reactableId)){
            //console.log('comment');
            notifiable = comments.find(comment => comment.commentId === react.reactableId);
           // notifiable.id = notifiable.postId;
            notificationBody = "someone reacted on your comment";              
     }
  }

    firestore.collection('notifications').doc(notificationId).set({
        notificationId:notificationId,
        body:notificationBody,
        createdAt:new Date(),
        notifiableLink:'/post/'+notifiable.postId, //link to post 
        notifiableId:notifiable.postId, //post id 
        notifiedId:react.reactedId,
        notifierId:react.reactorId,
        read:false
    }); 

   // console.log(react);
}

