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
 } from './../../actions/actions';



const initState = {
  loading:false,
  posts:[],
  error:''
};

const  postReducer  =  ( state= initState , action )=>{
        switch(action.type){
          case FETCH_POSTS_REQUEST:
            return {
              ...state,
              loading: true
            }
          case FETCH_POSTS_SUCCESS:
            return {
              loading: false,
              posts: action.payload,
              error: ''
            }
          case FETCH_POSTS_ERROR:
            return {
              loading: false,
              posts: [],
              error: action.payload
            }
          case ADD_POST_SUCCESS:
            return  state;
          case ADD_POST_ERROR:
            return {
              ...state
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