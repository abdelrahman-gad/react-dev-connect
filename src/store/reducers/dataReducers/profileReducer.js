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
from './../../actions/actions';

const initState = {
    editProfileErr:null,
    addExperienceErr:null,
    addEducationErr:null,
    editProfileImageErr:null
 }

 const profileReducer=(state=initState,action)=>{
   switch(action.type){
       case EDIT_PROFILE_SUCCESS:
           console.log('edit profile  from  reducers');
           return state;
       case EDIT_PROFILE_ERROR:
           return {
               ...state,
               editProfileErr:'edit profile error'
            };  
        case ADD_EXPERIENCE_SUCCESS:
            console.log('add experience successfully from reducers')
            return state;
        case ADD_EXPERIENCE_ERROR:
            console.log('add experience error from reducers')

            return {
                ...state,
                addExperienceErr:'edit exeperince error'
            }  
      
        case EDIT_PROFILEIMAGE_SUCCESS:
            console.log('edit profile image success');
            return state;

        case EDIT_PROFILEIMAGE_ERROR:
            console.log('edit profile image error');
            return {
                ...state,
                editProfileImageErr: action.payload
            };
    

        case ADD_EDUCATION_SUCCESS:
            return state;

        case ADD_EDUCATION_ERROR:
            return {
                ...state,
                addEducationErr:'add education Error'
            }

        case DELETE_EDUCATION_SUCCESS:
            console.log('Education element wase deleted successfully');
             return state;
        
       case DELETE_EDUCATION_ERROR:
           console.log('delete education error form reducer');
                return {
                    ...state,
                    deleteEducationErr:'delete education error'
                }
        case DELETE_EXPERIENCE_SUCCESS:
            console.log('experience  was deleted successfully from reducers');
                return state;
        
        case DELETE_EXPERIENCE_ERROR:
            console.log('delete experience error form reducer');
                return {
                    ...state,
                    deleteEducationErr:'delete education error'
                    }  
        default :
           return state;      
   }
}

export default profileReducer;