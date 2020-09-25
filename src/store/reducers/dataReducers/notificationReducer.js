import { READ_NOTIFICATION_SUCCESS } from './../../actions/actions';


const initState = {readNotificationError:null};

const  notificationReducer  =  ( state= initState , action )=>{
        switch(action.type){
          case READ_NOTIFICATION_SUCCESS:
              console.log('notification was read sucessfully');
            return  state; 
          default:
            return state;  
        }

}





export default notificationReducer;