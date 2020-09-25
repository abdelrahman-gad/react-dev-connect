import {  
  ADD_POST_SUCCESS ,
  ADD_POST_ERROR ,
  DELETE_POST_SUCCESS , 
  DELETE_POST_ERROR, 
  EDIT_POST_SUCCESS ,
  EDIT_POST_ERROR
 } from './../../actions/actions';



const initState = {
   addPostError:null,
   deletePostError:null,
   editPostError:null
};

const  postReducer  =  ( state= initState , action )=>{
        switch(action.type){
          case ADD_POST_SUCCESS:
            return  state;
          case ADD_POST_ERROR:
            return {
              ...state,
               addPostError:action.payload
            }; 
          case DELETE_POST_SUCCESS:
            return state;
          case DELETE_POST_ERROR:
            return {
              ...state,
              deletePostError:action.payload
            }  

          case EDIT_POST_SUCCESS:
              return state;
           case EDIT_POST_ERROR:
             return {
               ...state,
                editPostError:action.payload
             }    
          default:
            return state;  
        }

}





export default postReducer;