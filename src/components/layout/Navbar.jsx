import React  from 'react';
import SigndInLinks from './SignedInLinks';
import SignedOutLinks from './SignedOutLinks';
import { NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { isActive } from './helpers';


const  Navbar = ( { auth , profile , history  } ) =>   {


           const  links = auth.uid ?  <SigndInLinks  profile={profile} />:<SignedOutLinks />;
                    
                return (
                  
                            <nav className="navbar bg-dark">
                                <h3>
                                <NavLink 
                                    style={isActive( history ,'/dashboard')}
                                    to="/dashboard">
                                    <i className="fas fa-code"></i>DevConnect
                                </NavLink>               
                                </h3>
                                <ul>
                                 {links}
                                </ul>
                            </nav>                      
                    );
    


}

const mapStateToProps = (state) => {
    const auth = state.firebase.auth;
    const profile=state.firebase.profile;
     return{
         auth,
         profile
     }
}

export default withRouter(  connect(mapStateToProps) (Navbar) );