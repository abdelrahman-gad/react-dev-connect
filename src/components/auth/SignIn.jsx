import React  , {Component} from 'react';
import { connect } from 'react-redux';
import {Redirect,NavLink} from 'react-router-dom';
import {signIn } from '../../store/actions/authActions';




class SignIn  extends Component{

  state = {
    email:'',
    password:'',
    errors:{
      email:'',
      password:''
    }
  }
  
 handleChange = e => {
  e.preventDefault();
  this.setState({
    [e.target.id]:e.target.value
  })
}


handleSubmit = e => {
     e.preventDefault();
    if(this.state.email.length > 0 && this.state.password.length > 0   ) {
      this.props.signIn(this.state);
    }
}

newForm = () => (
  <form className="form" onSubmit={this.handleSubmit}>
   
    <div className="form-group">
      <input 
        type="email" 
        placeholder="Email Address"   
        id="email" 
        onChange={this.handleChange} 
        value={this.state.email}
        
      />
    </div>
    <div className="form-group">
      <input 
        type="password" 
        placeholder="password"  
        id="password" 
        onChange={this.handleChange} 
            
      />

    </div>
    <div className="form-group">
      <input type="submit" className="btn btn-primary" value="Sign In" />
    </div>
  </form>
)

showError = authError => (authError ? <div className="alert alert-danger"> {authError} </div>:"") 
showSignupLink = () => (<p className="my-1">Don't have an account ? <NavLink exact to="/signup"> Sign Up  </NavLink></p>)  

render() {
  const { authError , auth  } = this.props;
//  console.log('from sign in component');
//   console.log(auth.uid);
 
  if(authError || !auth.uid ){
  return (
    <section className="container">
     {this.showError(authError)}
     {this.newForm()}
     {this.showSignupLink()}  
     
  </section>  
  );

  } else if(auth.uid){ 
    return <Redirect exact to="/dashboard" />
  }  
 }
}

const mapDispatchToProps = dispatch => {
  return {
    signIn: (creds) => dispatch(signIn(creds))
  }
}
const mapStateToProps = state => {
  const auth = state.firebase.auth;
      // console.log(state);
  return {
    authError:state.auth.authError,
    auth:auth
  }
}

export default connect( mapStateToProps , mapDispatchToProps) (SignIn);