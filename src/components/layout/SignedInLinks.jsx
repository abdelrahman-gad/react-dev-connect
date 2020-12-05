import React, { useState  } from 'react';
import { connect } from 'react-redux';
import {logOut} from '../../store/actions/authActions';
import {readNotification} from '../../store/actions/notificationsActions';
import { compose } from 'redux';
import { NavLink , Redirect , withRouter } from 'react-router-dom';
import {firestoreConnect} from 'react-redux-firebase';
import {showReadableDateTime} from './../../utils/utilsFuncs';
import { isActive } from './helpers';

const SigndInLinks  = ( { logOut , readNotification  , notifications , history } )  => {
      
        const [showNotifs , setShowNotifs] = useState(false);


        const  handleLogout = (e) => {
                  e.preventDefault();
                  //console.log(this.props);
                  logOut();
                  return <Redirect exact to="/"  />              
          }
        const  handleShowNotifs= (e) =>{
            e.preventDefault();
            setShowNotifs(!showNotifs);
          }
        const  handleReadNotication = (e , notificationId) => {
            e.preventDefault();
            readNotification(notificationId);
        }


   

      
      const  unreadNotifications= notifications ? [...notifications.filter(notification=>notification.read === false)]:[]; 
      let unreadNotificationsCount = unreadNotifications ? unreadNotifications.length:0;
     
      return (
            
    <ul>
        <li>
          <NavLink
             exact 
             style={ isActive(history, '/dashboard') }
             to="/dashboard"> 
            <i className="fa fa-user"></i> 
            <span className="hide-sm"> Dashboard </span> 
          </NavLink>
        </li>
        <li>
          <NavLink
           exact 
           style={ isActive(history, '/developers') }
           to="/developers">   Developers </NavLink>
        </li>
        <li>
          <NavLink 
           exact 
           style={ isActive(history, '/posts') }
           to="/posts">Posts</NavLink>
        </li>
        <li  className="notifs">            
            <button 
              onClick={(e)=>handleShowNotifs(e)}
              id="notifs"
              className="notifs"
              >
            <i className="fas fa-globe"></i>
            <span className="hide-sm">Notifications</span>
            <span className="notifs-number">  {unreadNotificationsCount}  </span>
          </button>
          
          <div
            className={showNotifs?"notifs-block show":"notifs-block"}
            id="notifs-block"      
          >
          {
            ( notifications && notifications.length >= 1)?notifications.map(notification=>{
              return      ( 
                            <NavLink 
                                  exact to={notification.notifiableLink}
                                  key={notification.notificationId}
                                  className={notification.read?"seen":""} 
                                  >                             
                                    <span 
                                        onClick={(e)=>{handleReadNotication(e,notification.notificationId)}}
                                      > 
                                      {notification.body}
                                    </span> 
                                    <span> at { showReadableDateTime(notification.createdAt)} </span>
                              </NavLink>                            
                            );
                  }):<NavLink 
                      to="/"
                      className="seen"
                    
                       >                             
                        <span> 
                         No notifications yet ):
                        </span> 
                      
                  </NavLink>    
          }
             
          </div>
        </li>
      

        <form  onSubmit={handleLogout} >
            <button className="logout-btn"> Logout  </button>
        </form>
          
      </ul>
    );


}


const mapDispatchToProps = (dispatch,ownProps) => {
  return {
    logOut: () => dispatch(logOut()),
    readNotification:(notificationId)=>dispatch(readNotification(notificationId))
  }
  
}


const mapStateToProps = (state)=>{
  let notifications = state.firestore.ordered.notifications;
  let auth  = state.firebase.auth;
  //console.log(auth.uid);
  if(notifications){
     notifications = notifications.filter(notification => notification.notifiedId === auth.uid && notification.notifiedId !== notification.notifierId )
     notifications = notifications.sort( (a,b) => b.createdAt.seconds - a.createdAt.seconds );
   //  console.log(notifications);  
  }
  return {
       notifications
  }
}



export default  withRouter (compose(
  connect(mapStateToProps,mapDispatchToProps),
  firestoreConnect([
     {collection:'notifications'}      
    ])
)
(SigndInLinks));


