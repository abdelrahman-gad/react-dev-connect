import {   
    SIGNUP_SUCCESS , 
    SIGNUP_ERROR , 
    SIGNIN_SUCCESS ,
    SIGNIN_ERROR ,
    LOGOUT_SUCCESS,
    LOGOUT_ERROR ,
    ACCOUNT_DELETE_SUCCESS,
    ACCOUNT_DELETE_ERROR 
   } from './../actions/actions';



const initState={
    authError:null,
    deleteAccountError:null
}
const authReducer = ( state= initState , action ) =>{
    switch(action.type){
        case SIGNUP_SUCCESS:
            console.log('sign up successfully');
            return {
                ...state,
                authError:null
            }
        case SIGNUP_ERROR:
            console.log('sign up error');
            return {
                ...state,
                authError:action.payload
            }   
        case LOGOUT_SUCCESS:
            return {
                ...state,
                authError:null
            }   
        case LOGOUT_ERROR:
            console.log('sign out successfully');
            return {
                ...state,
                authError:action.payload
            }
        case SIGNIN_SUCCESS:
            console.log('sign in success');  
            return{
                ...state,
                authError:null
            }  
        case SIGNIN_ERROR:
            console.log('sign in error');
            console.log(action.payload);
            return{
                ...state,
                authError:action.payload
            }  
        case ACCOUNT_DELETE_SUCCESS:
            console.log('account deleted successfully');
            return  state;
        case ACCOUNT_DELETE_ERROR:
            console.log('account deleting error');
            return {
                ...state,
                deleteAccountError:action.payload
            }              
        default:
            return {
                ...state,
                authError:null
            }    
    }
}
export  default authReducer ;


