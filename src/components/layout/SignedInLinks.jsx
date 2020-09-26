import React, { Component } from 'react';

import { connect } from 'react-redux';
import {logOut} from '../../store/actions/authActions';
import {readNotification} from '../../store/actions/notificationsActions';
import { compose } from 'redux';
import { NavLink , Redirect } from 'react-router-dom';
import {firestoreConnect} from 'react-redux-firebase';
import {showReadableDateTime} from './../../utils/utilsFuncs';
class  SigndInLinks extends Component  {
      
  constructor(props){
    super(props);
    this.handleLogout= this.handleLogout.bind(this);
  }
  state={
    showNotifs:false
  }

  handleLogout(e) {
          e.preventDefault();
          //console.log(this.props);
          this.props.logOut();
         return <Redirect exact to="/"  />              

  }
  handleShowNotifs(e){
    e.preventDefault();
    this.setState({
      showNotifs:!this.state.showNotifs
    })
  }
  handleReadNotication(e,notificationId){
    //console.log('handleSeen func');
    e.preventDefault();
    const {readNotification } = this.props;
    readNotification(notificationId);
  }
  componentDidUpdate(){
    //console.log('component has updated');
  }  

   
 render(){
      const {notifications} = this.props;
      //console.log(notifications);
      const  unreadNotifications= notifications ? [...notifications.filter(notification=>notification.read === false)]:[]; 
      let unreadNotificationsCount = unreadNotifications ? unreadNotifications.length:0;
      // console.log(notifications);
      return (
            
    <ul>
        <li>
          <NavLink exact to="/dashboard"> <i className="fa fa-user"></i> <span className="hide-sm"> Dashboard </span> </NavLink>
        </li>
        <li>
          <NavLink exact to="/developers">   Developers </NavLink>
        </li>
        <li>
          <NavLink  exact to="/posts">Posts</NavLink>
        </li>
        <li  className="notifs">
             
            <a  
              href="#" 
              onClick={(e)=>this.handleShowNotifs(e)}
              id="notifs">
            <i className="fas fa-globe"></i>
            <span className="hide-sm">Notifications</span>
            <span className="notifs-number">  {unreadNotificationsCount}  </span>
          </a>
          
          <div
          
              className={this.state.showNotifs?"notifs-block show":"notifs-block"}
              id="notifs-block"
               
               >
              {
                notifications && notifications.map(notification=>{
                  return      ( 
                                <NavLink 
                                      exact to={notification.notifiableLink}
                                      key={notification.notificationId}
                                      className={notification.read?"seen":""} 
                                      >                             
                                       <span 
                                           onClick={(e)=>{this.handleReadNotication(e,notification.notificationId)}}
                                         > 
                                          {notification.body}
                                        </span> 
                                        <span> at  { showReadableDateTime(notification.createdAt)} </span>
                                  </NavLink>                            
                                    );
                                   })
              
              }
             
          </div>
        </li>
      

        <form  onSubmit={this.handleLogout} >
            <button className="logout-btn"> Logout  </button>
        </form>
          
      </ul>
    );

 }

}


const mapDispatchToProps = (dispatch,ownProps) => {
  
  // ownProps
  //console.log(ownProps);
   
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
     notifications= notifications.sort( (a,b) => b.createdAt.seconds - a.createdAt.seconds );
   //  console.log(notifications);  
  }
  return {
       notifications
  }
}



export default compose(
  connect(mapStateToProps,mapDispatchToProps),
  firestoreConnect([
     {collection:'notifications'}      
    ])
)
(SigndInLinks);


