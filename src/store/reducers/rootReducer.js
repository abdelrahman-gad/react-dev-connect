import {combineReducers} from 'redux';
import authReducer from './authReducer';
import profileReducer from './dataReducers/profileReducer';
import postReducer from './dataReducers/postReducer';
import commentReducer from './dataReducers/commentReducer';
import reactReducer from './dataReducers/reactReducer';
import notificationReducer from './dataReducers/notificationReducer';


import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase';



const rootReducer = combineReducers({ 
          auth:authReducer,
          firestore:firestoreReducer,
          firebase:firebaseReducer,
          profiles:profileReducer,
          posts:postReducer,
          comments:commentReducer,
          reacts:reactReducer,
          notificationReducer
      });


export default rootReducer;
