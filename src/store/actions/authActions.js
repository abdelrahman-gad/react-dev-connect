import {   
             SIGNUP_SUCCESS , 
             SIGNUP_ERROR , 
             SIGNIN_SUCCESS ,
             SIGNIN_ERROR ,
             LOGOUT_SUCCESS,
             LOGOUT_ERROR ,
             ACCOUNT_DELETE_SUCCESS,
             ACCOUNT_DELETE_ERROR
            
            } from './actions';


export const signIn = (credentials) => {
    return (dispatch , getState , {getFirebase,getFirestore})=> {
      const firebase = getFirebase();
    
     firebase.auth().signInWithEmailAndPassword(credentials.email,credentials.password)
      .then( () => dispatch({type:SIGNIN_SUCCESS}))
      .catch( err => {         
            dispatch({type:SIGNIN_ERROR,payload:err.message});
        });
    }
}


export const  logOut = () =>{
    return (dispatch , getState , {getFirebase} )=>{
        const firebase = getFirebase();
  
        firebase.auth().signOut().then(() => {
          dispatch({ type: LOGOUT_SUCCESS });
        }).catch(err=> dispatch({type:LOGOUT_ERROR , payload: err.message}) );

    }
}
 
export const signUp = (newUser) =>{
    return (dispatch,getState,{getFirebase,getFirestore})=>{
        const firebase = getFirebase();
        const firestore = getFirestore();
         console.log( 'from actions ' , newUser);
     firebase.auth().createUserWithEmailAndPassword( 
             newUser.email,
             newUser.password
         ).then( resp => {
            resp.user.updateProfile({
                photoURL:'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200'
            });
            return firestore.collection('users')
            .doc(resp.user.uid)
            .set({
                handle:newUser.name,
                imageUrl:'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200',
                email:newUser.email,
                createdAt:new Date(),
                userId:resp.user.uid
             })
           }).then(()=>{
               
                dispatch({type:SIGNUP_SUCCESS});
           }).catch(err => {
                dispatch({type:SIGNUP_ERROR,payload:err.message});
           });
             
    }
}






export const deleteAccount = (  ) => {
    console.log('delete account from actions');
  //  console.log(accountId);
    return (dispatch, getState , {getFirebase , getFirestore} )=>{
        const firebase= getFirebase();
         var  account = firebase.auth().currentUser;
     //    console.log(account);
         account.delete().then(() => dispatch({type:ACCOUNT_DELETE_SUCCESS}))
        .catch( err => dispatch( {type:ACCOUNT_DELETE_ERROR, payload:err.message}));
    }
}