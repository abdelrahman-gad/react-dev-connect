import {v4 as uuid4} from 'uuid';
import {  
            EDIT_PROFILEIMAGE_SUCCESS , 
            EDIT_PROFILEIMAGE_ERROR , 
            EDIT_PROFILE_SUCCESS , 
            EDIT_PROFILE_ERROR , 
            ADD_EXPERIENCE_SUCCESS , 
            ADD_EXPERIENCE_ERROR , 
            DELETE_EXPERIENCE_SUCCESS ,
            DELETE_EXPERIENCE_ERROR , 
            ADD_EDUCATION_SUCCESS , 
            ADD_EDUCATION_ERROR , 
            DELETE_EDUCATION_SUCCESS ,
            DELETE_EDUCATION_ERROR 
        } 
        from './actions';

export const editProfileImage = ( profileImageUrl ) => {
    return (dispatch,getState,{getFirebase,getFirestore})=>{
        console.log('editprofile image from actions');
        const firestore = getFirestore();
        const authorId = getState().firebase.auth.uid;
        firestore.collection('users').doc(authorId).update({
            imageUrl:profileImageUrl
        }).then(()=>{
            dispatch({type:EDIT_PROFILEIMAGE_SUCCESS});
        }).catch(err=>{
           dispatch( {type:EDIT_PROFILEIMAGE_ERROR, peyload: err.message});
        });
    }
}

export const editProfile = (newProfile) => {
    return (dispatch,getState,{ getFirebase , getFirestore})=>{
            console.log('edit profile from actions');
            const firestore = getFirestore();
            const profile = getState().firebase.profile;
            console.log(newProfile);
                    
            const authorId  = getState().firebase.auth.uid;
            console.log(authorId);
            firestore.collection('profiles').doc(authorId).set({
                ...newProfile,
                userHandle:profile.handle,      
                userId:authorId
            }).then(()=>{
                 dispatch({type:EDIT_PROFILE_SUCCESS});
            }).catch(err=> dispatch({type:EDIT_PROFILE_ERROR, payload: err.message}));
    }
}

export const addExperience = ( experience ) => { 
       return (dispatch , getState , { getFirebase  ,  getFirestore})=>{
             //  console.log(experience);
             const firestore = getFirestore();
       
             const authorId  = getState().firebase.auth.uid;
   
             let experienceId = uuid4();
   
             firestore.collection('experiences').doc(experienceId).set({
                       ...experience,
                       id:experienceId,
                       userId:authorId
                    }).then(()=>{
                        dispatch({type:ADD_EXPERIENCE_SUCCESS});
                    }).catch(err=>{
                        dispatch({type:ADD_EXPERIENCE_ERROR, payload:err.message});
                    });
                    
    }
}


export const deleteExperience=(experienceId)=>{
    console.log('from actions');
    console.log(experienceId);
   return (dispatch,getState,{getFirebase,getFirestore}) =>{
        const firestore = getFirestore();
        firestore.collection('experiences').doc(experienceId).delete()
           .then(()=>{
                dispatch({type:DELETE_EXPERIENCE_SUCCESS});
            }).catch(err=>{
                dispatch({type:DELETE_EXPERIENCE_ERROR,payload:err.message});
            });                
   }
}









export const addEducation = (education)=>{
    return (dispatch,getState,{getFirebase,getFirestore}) =>{
            
             //  console.log(experience);
          const firestore = getFirestore();
       
          const authorId  = getState().firebase.auth.uid;

          let educationId = uuid4();

          firestore.collection('educations').doc(educationId).set({
                    ...education,
                    id:educationId,
                    userId:authorId
                 }).then(()=>{
                     dispatch({type:ADD_EDUCATION_SUCCESS});
                 }).catch(err=>{
                     dispatch({type:ADD_EDUCATION_ERROR , peyload: err.message });
                 });
  }
}

export const deleteEducation=(educationId)=>{
    console.log('from actions');
    console.log(educationId);
   return (dispatch,getState,{getFirebase,getFirestore}) =>{
        const firestore = getFirestore();
        firestore.collection('educations').doc(educationId).delete()
           .then(()=>{
                dispatch({type:DELETE_EDUCATION_SUCCESS});
            }).catch(err=>{
                dispatch({type:DELETE_EDUCATION_ERROR , payload: err.message });
            });                
   }
}







