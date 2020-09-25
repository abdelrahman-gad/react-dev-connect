
import {  
  ADD_REACT_SUCCESS,
  ADD_REACT_ERROR , 
  DELETE_REACT_SUCCESS ,
  DELETE_REACT_ERROR
} from './../../actions/actions';

const  initState = {
    addReactError:null,
    deleteReactError:null
}
const reactReducer = (state=initState,action) => {
    switch(action.type){
        case ADD_REACT_SUCCESS:
          return  state;
        case ADD_REACT_ERROR:
          return {
            ...state,
             addReactError:action.payload
          }; 
        case DELETE_REACT_SUCCESS:
            return state;
        case DELETE_REACT_ERROR:
            return {
                ...state,
                deleteReactError:action.payload
            }    
        default:
          return state;  
      }
}





export default reactReducer;