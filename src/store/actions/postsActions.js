import {v4 as uuid4} from 'uuid';
 
import {  
        FETCH_POSTS_REQUEST,
        FETCH_POSTS_SUCCESS,
        FETCH_POSTS_ERROR,
        ADD_POST_SUCCESS ,
        ADD_POST_ERROR ,
        DELETE_POST_SUCCESS , 
        DELETE_POST_ERROR, 
        EDIT_POST_SUCCESS ,
        EDIT_POST_ERROR
} from './actions';

          //  dispatch(fetchPostsSuccess(posts));

let users = {};
let posts = [];
let comments = [];
let reacts = [];
const getPostsWithData = ( posts , users , comments  ) => {
        console.log(posts);
        console.log(users);
        console.log(comments);
        return posts.map( post => {
                  console.log(post);                    
                  return {
                    body:post.body,
                    createdAt:post.createdAt,
                    postId:post.postId,
                    user:users[post.userId],
                    comments:getCommentsOnPost(users , comments , post),
                    reacts: getReacts(post)
                }
        }); 
}
const getCommentsOnPost = ( users ,comments , post ) => {
       return    comments.filter(comment => comment.postId === post.postId) 
                         .map( comment => {   
                              return {
                                ...comment,                                 
                                user:users[comment.userId] //add user object that is the owner of this comment
                              }
                       });
}

const getReacts = ( reacts  , reactable ) => {
 return  reacts.filter( react => react.reactableId === reactable.id); 
}
 
          
export const fetchPosts = (  ) => {
    return (dispatch , getState , { getFirebase , getFirestore  } ) => {
        dispatch(fetchPostsRequest());
   
         const firestore = getFirestore();
      
         firestore.collection('users')
          .get()
          .then( collection => {
              collection.forEach(item => {
              users[item.id] =  item.data()
              })
          })
        .then( ( ) => {
            firestore.collection('posts')
            .get()
            .then( querySnapshot => {
              querySnapshot.docs.map( doc => {
                posts.push(doc.data());
               })
            })
        })
        .then(( )=>{
          firestore.collection('comments')
          .get()
          .then( querySnapshot => {
            querySnapshot.docs.map( doc => {
              comments.push(doc.data());
             })
          })
        })
        .then(( ) => {
          firestore.collection('reacts')
          .get()
          .then( querySnapshot => {
            querySnapshot.docs.map( doc => {
              reacts.push(doc.data());
             })
          })
        })
        .then(()=>{
          // all data are available
           console.log(posts);
           console.log(users);           
           console.log(comments);
           console.log(reacts);

           // start of getting posts that each post contains its own comments and reacts
           const getPosts = ( ) => {
           //  console.log(posts);
             return posts.map( post => {
                  // fetch comments belongs to this specific post   
                    console.log(post);                   
                    let  filteredComments =  getComments(post);                              
                        return {
                          body:post.body,
                          createdAt:post.createdAt,
                          postId:post.postId,
                          user:users[post.userId],
                          comments:filteredComments,
                          reacts: getReacts(post)
                      }
              });} 
            const getComments =  post  => comments
                            .filter(comment => comment.postId === post.postId) 
                            .map( comment => {   
                              return {
                                ...comment,                                 
                                user:users[comment.userId] //add user object that is the owner of this comment
                              }
                            });
            // get reacts on post or comment based on parameter reacatble = post | comment  
            const getReacts = ( reactable ) => {              
                                  const reacts = reacts.filter(react => react.reactableId === reactable.id);  
                                  return reacts ;   
                            }


            posts = getPostsWithData();
            console.log(posts);
          // end of getting posts that each post contains its own comments and reacts
           //getPostsWithData( posts , users, comments);
          // console.log(postsWithData);
        })
        .catch(error => {
          // error.message is the error message
          dispatch(fetchPostsFailure(error.message))
        })
    }
}




export const fetchPostsRequest = () => {
    return {
      type: FETCH_POSTS_REQUEST
    }
  }
  
  export const fetchPostsSuccess = posts => {
    return {
      type: FETCH_POSTS_SUCCESS,
      payload: posts
    }
  }
  
  export const fetchPostsFailure = error => {
    return {
      type: FETCH_POSTS_ERROR,
      payload: error
    }
}








export const addPost = post => {
    return (dispatch,getState,{getFirebase,getFirestore})=>{
        console.log('from actions',post);
        const firestore = getFirestore();
        const profile = getState().firebase.profile;
        const authorId= getState().firebase.auth.uid;
        let postId = uuid4(); 
        firestore
        .collection('posts')
        .doc(postId).set({
                body:post,
                postId:postId,
                commentCount:0,
                likeCount:0,
                userHandle:profile.handle,
                userId:authorId,
                createdAt: new Date()
            }).then(()=>{
            dispatch({type:ADD_POST_SUCCESS})
        }).catch((err)=>{
            dispatch({type:ADD_POST_ERROR,payload:err.message})
        });

       
    }
} 


export const deletePost= (postId)=>{
    console.log('delete Post actions');
    return (dispatch,getState,  {getFirebase, getFirestore } )=>{
        const firestore= getFirestore();

        firestore.collection('posts').doc(postId).delete()
                  .then( () => dispatch({type:DELETE_POST_SUCCESS}))
                  .catch( (err) => dispatch({type:DELETE_POST_ERROR,payload:err.message}));
    }
}



export const editPost = (updPost)=>{
     return (dispatch,getState, {getFirebase,getFirestore} ) => {
               console.log('edit post from actions');

              const firestore = getFirestore();
              firestore.collection('posts').doc(updPost.postId)
                       .set({
                           ...updPost
                       }).then(()=>dispatch({type:EDIT_POST_SUCCESS}))
                         .catch((err)=>dispatch({type:EDIT_POST_ERROR, payload: err.message })); 
     }
}




