
 const  initState = {
    addCommentError:null,
    deleteCommentError:null
}
const commentReducer = (state=initState,action) => {
    switch(action.type){
        case "ADD_COMMENT_SUCCESS":
          return  state;
        case "ADD_COMMENT_ERROR":
          return {
            ...state,
             addCommentError:action.payload
          }; 
          case "DELETE_COMMENT_SUCCESS":
            return  state;
          case "DELETE_COMMENT_ERROR":
            return {
              ...state,
               deleteCommentError:action.payload
            }; 
  

        default:
          return state;  
      }
}





export default commentReducer;