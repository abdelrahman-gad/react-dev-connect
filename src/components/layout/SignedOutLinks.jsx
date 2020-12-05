import React from 'react';
import {NavLink, withRouter} from 'react-router-dom';
import { isActive }  from './helpers'; 

const SignedOutLinks = ( {history} ) => {

 return (
     <ul>
        <li>
         <NavLink to="/signup"  style={ isActive(history, '/signup') } >SignUp </NavLink>
        </li>
        <li>
          <NavLink to="/signin" style={ isActive(history, '/signin') }> Login </NavLink>
        </li>
         
     </ul>
 );
}

export default withRouter(SignedOutLinks);



