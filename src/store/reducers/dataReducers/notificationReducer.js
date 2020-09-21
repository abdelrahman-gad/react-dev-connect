const initState = {readNotificationError:null};

const  notificationReducer  =  ( state= initState , action )=>{
        switch(action.type){
          case "READ_NOTIFICATION_SUCCESS":
              console.log('notification was read sucessfully');
            return  state;
          case "READ_NOTIFICATION_ERROR":
            return {
              ...state,
               addPostError:action.payload
            }; 
          default:
            return state;  
        }

}





export default notificationReducer;