import React from 'react';
import {connect } from 'react-redux';
// import {compose} from 'redux';
// import { firestoreConnect } from 'react-redux-firebase';
import {signUp } from '../../store/actions/authActions';
import { NavLink, Redirect } from 'react-router-dom';
import { validate } from 'uuid';
import { emailRegex } from '../../variables';
class SignUp extends React.Component {

   state = {
     handle:'',
     email:'',
     password:'',
     confirmPassword:'',
     errors:{
       password:'',
       email:'',
       name:''
     }
   }
    handleChange =(e)=>{
      this.setState({
        [e.target.id]:e.target.value
      });

    }
    handleSubmit= (e) =>{
      e.preventDefault();
      const {handle,email,password,confirmPassword} = this.state;
    
       if(!this.valid(handle ,email,password,confirmPassword)){
         
       }

       else{
        const {handle,email,password} = this.state;
        const newUser = {handle,email,password} ;
        const {signUp} = this.props;
        signUp(newUser);
        this.props.history.push("/dashboard");
       }      
    }


     valid(handle,email, password,confirmPassword){
         if(handle.length<3){
            this.setState({
              errors:{
                password:'',
                email:'',
                handle:'Name Shoud be 3 Characters at least'
              }
            });
            return false;
         }
         if(!emailRegex.test(email)){
          this.setState({
            errors:{
              password:'',
              handle:'',
              email:'email format not valid'
            }
          });
          return false;
         }
         if(password!==confirmPassword){
          this.setState({
            errors:{
              handle:'',
              email:'',
              password:'password must be equel to confirm password'
            }
          });

          return false;
         }

         if(password.length<6){
          this.setState({
            errors:{
              handle:'',
              email:'',
              password:'password length should be 6 characters at least'
            }
          });
          return false;
         }
         return true;
     }

   

 render(){
   //console.log(this.props);
   const {errors} =this.state;
   const {auth} = this.props;
   if(auth.uid){
     return <Redirect exact to="/dashboard" />
   }else {

    return (
      <section className="container" >
    
      <div className="content">
       
        <h1 className="large text-primary">Sign up</h1>
        
        <p className="lead"><i className="fas fa-user"></i> Create New Account</p>
        <form action="dashboard.html" className="form" onSubmit={this.handleSubmit} >


          <div className="form-group">
            <input
             type="text"   
             placeholder="Enter name"   
             id="handle"
             onChange={this.handleChange}
             />
             <p className="text-danger"> {errors.handle} </p>
          </div>
          
          <div className="form-group">
            <input
               type="email"
               placeholder="Email Address" 
               id="email" 
               minLength="6"
               onChange={this.handleChange}
                />
             <p className="text-danger"> {errors.email} </p>

          </div>
  
          <div className="form-group">
            <input 
            type="password" 
            placeholder="password"  
            id="password" 
            onChange={this.handleChange}
            />
             <p className="text-danger"> {errors.password} </p>

          </div>
  
          <div className="form-group">
            <input
               type="password"
               placeholder="confirm password" 
               id="confirmPassword" 
               onChange={this.handleChange}
               />
              <p className="text-danger"> {errors.password} </p>

          </div>
          <div className="form-group">
            <button  className="btn btn-primary" value="Register" >   Sign up   </button>
          </div>
        </form>
        <p className="my-1">
          Already have an account ? <NavLink to="/signin"> sign in </NavLink>
        </p>
      </div>
  
    </section>
  );
   }

 }
    

  
}



const mapStateToProps = (state) => {
  const auth = state.firebase.auth;
    return {
        authError:null,
        auth:auth
    }
}
const mapDispatchToProps = (dispatch ) => {
    return {
        signUp:(newUser)=> dispatch(signUp(newUser))
    }
}

export default  
connect( mapStateToProps , mapDispatchToProps ) (SignUp);