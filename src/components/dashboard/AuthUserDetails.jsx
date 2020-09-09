import React from 'react';
import {connect} from 'react-redux';
import { NavLink, Redirect } from 'react-router-dom';
import {firestoreConnect} from 'react-redux-firebase';
import {compose } from 'redux';
import { auth } from 'firebase';
import Educations from './Educations';
import Experiences from './Experiences';

class AuthUserDetails extends React.Component{


    render(){
        console.log('from Auth user Details');
        console.log(this.props);
        return  (
            <div>
                     <Experiences />
                   {/* educations Component */}
                     <Educations/>
                    <div className="my-2">
                    <button className="btn btn-danger">
                        <i className="fas fa-user-minus">Delete My Account</i>
                    </button>
                </div>
            </div>
           );
    }
}

const mapStateToProps = (state) =>{
    return {
       auth:state.firebase.auth,
       profile:state.firebase.profile
       
    }
}


export default compose(
    connect(mapStateToProps,null),
    firestoreConnect([{collection:'profiles'}])
  )
  (AuthUserDetails);