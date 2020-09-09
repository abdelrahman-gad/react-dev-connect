import React  from 'react';
import SigndInLinks from './SignedInLinks';
import SignedOutLinks from './SignedOutLinks';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';


class Navbar extends React.Component {


        



    render(){
           const {auth , profile} = this.props;
           const  links = auth.uid ?  <SigndInLinks profile={profile} />:<SignedOutLinks />;
            

        return(
            <section> 
                <nav className="navbar bg-dark">
                    <h1>
                    <NavLink to="/dashboard">
                        <i className="fas fa-code"></i>DevConnect
                    </NavLink>               
                    </h1>
                    <ul>
                    {links}

                    </ul>
                </nav>
                
           </section>
          
        );
    }


}





const mapStateToProps = (state) => {
     return{
         auth:state.firebase.auth ,
         profile:state.firebase.profile
     }
}

export default connect(mapStateToProps) (Navbar);