import React  from 'react';
import { NavLink, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';


class HomePage extends React.Component {


    render(){
           const { auth  , authError } = this.props;
           let links=   <div className="buttons">
                            <NavLink to="/signup" className="btn btn-primary">sign up</NavLink>
                            <NavLink to="/signin" className="btn">login</NavLink>
                        </div>;

           if(authError){
               return <Redirect exact to="signin" />
           }else{
            return(
                <section className="landing">                       
                 <img  className="landing-img" src={process.env.PUBLIC_URL+'/imgs/showcase.jpg'} alt="landing page "/>                  
                 <div className="dark-overlay">
                    <div className="landing-inner">
                    <h1 className="x-large">Deve10pers </h1>
                    <h1 className="x-large">C0nnect0r </h1>

                    <p className="lead">
                        create developer portfolio/account post blogs and also get help from
                        the others
                    </p>
                    
                      {auth.uid ?null:links }

                    </div>
                </div>
                
                </section>              
            );
    
           }
    }


}





const mapStateToProps = (state) => {
       const  auth =state.firebase.auth;
        const profile=state.firebase.profile;
     return{
         auth ,
         profile,
         authError:state.auth.authError
     }
}

export default connect(mapStateToProps) (HomePage);