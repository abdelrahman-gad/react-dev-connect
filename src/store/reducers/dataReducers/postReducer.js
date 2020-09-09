const initState = {addPostError:null};

const  postReducer  =  ( state= initState , action )=>{
        switch(action.type){
          case "ADD_POST":
            return  state;
          case "ADD_POST_ERROR":
            return {
              ...state,
               addPostError:action.payload
            }; 
          default:
            return state;  
        }

}





export default postReducer;