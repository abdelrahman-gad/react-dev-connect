import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import * as serviceWorker from './serviceWorker';

// import configurations
 import fbConfig from './config/fbConfig';
 import  firebase from 'firebase/app';
 
 import {Provider,useSelector } from 'react-redux';

 import {createStore , applyMiddleware , compose} from 'redux';
 import rootReducer from './store/reducers/rootReducer';
 import thunk from 'redux-thunk';
 import {
  createFirestoreInstance,
  getFirestore,
  reduxFirestore
} from "redux-firestore";
import { ReactReduxFirebaseProvider, getFirebase, isLoaded } from "react-redux-firebase";

// wait users to be loaded then render 
console.log(isLoaded);

function AuthIsLoaded({ children }) {
  const auth = useSelector(state => state.firebase.auth)
  if (!isLoaded(auth)) return <div>  <h1 className="text-center text-primary loading"> Loading ..... </h1> </div>;
  return children
}


//

const store = createStore(
        rootReducer,
        compose(
          applyMiddleware(thunk.withExtraArgument({ getFirestore, getFirebase })),
          reduxFirestore(firebase, fbConfig)      
        )
);






const profileSpecificProps = {
  userProfile: 'users',
  useFirestoreForProfile: true,
  enableRedirectHandling: false,
  resetBeforeLogin: false,
}


const rrfProps = {
  firebase,
  config: {
      ...fbConfig,
      ...profileSpecificProps,
    } ,   
  dispatch: store.dispatch,
  createFirestoreInstance
};




ReactDOM.render(
  
  <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        {/* <BrowserRouter> */}
          <AuthIsLoaded>
            <App/>  { /* Rest of App Components */}
          </AuthIsLoaded>
        {/* </BrowserRouter> */}
      </ReactReduxFirebaseProvider>
    </Provider>
,
document.getElementById('root')
);





// ReactDOM.render(
  
//     <Provider store={store}>
//     <ReactReduxFirebaseProvider {...rrfProps}>   
//       <App />
//     </ReactReduxFirebaseProvider>
//   </Provider>
//   ,
//   document.getElementById('root')
// );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
