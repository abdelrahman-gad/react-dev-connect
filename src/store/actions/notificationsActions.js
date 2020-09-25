
import { READ_NOTIFICATION_SUCCESS } from './actions';

export const readNotification = (notificationId)=>{
    return (dispatch,getState , {getFirebase,getFirestore})=>{
          const firestore = getFirestore();
          firestore.collection('notifications').doc(notificationId).update({           
              read:true
          }).then(()=>dispatch({type:READ_NOTIFICATION_SUCCESS}));
                 console.log('notification read Succesfuly');
    }
}