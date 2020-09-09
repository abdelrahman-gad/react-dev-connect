import React from 'react';
import { firestoreConnect } from 'react-redux-firebase';
import {Redirect} from 'react-router-dom';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {addExperience } from '../../store/actions/profilesActions';
import {NavLink} from 'react-router-dom';

class AddExperience extends React.Component{

    constructor(props){
       super(props);
       
       console.log(props);
       
        this.state={
             jobTitle:'',
             company:'',
             location:'',
             fromDate:'',
             toDate:'',
             description:'',
             emptyInputsError:''
        }

       //binding methods
       this.handleChange=this.handleChange.bind(this);
       this.handleSubmit=this.handleSubmit.bind(this);
    }
   
  
    handleChange(e){
      e.preventDefault();
    //  console.log(e.target.id,e.target.value);
       this.setState({
        [e.target.id]:e.target.value
        });
      //console.log(this.state);
    }
  
  
    handleSubmit(e){
      e.preventDefault();
       const {addExperience } = this.props;
       const {jobTitle,company,description,location,fromDate,toDate}=this.state;
       let inputsArray= [jobTitle,company,description,location,fromDate,toDate];
       if(inputsArray.some(input=>input.length===0)){
         this.setState({
             emptyInputsError:'Please fill up all required inputs'
         });
       }else{
         console.log('all inputs are filled');
       addExperience({jobTitle,company,description,location,fromDate,toDate});
        this.setState({
          emptyInputsError:''
        });
        console.log('from handleSubmit in component');
        this.props.history.push('/dashboard');
      }
    }

  
  
    render(){

        const { auth  } = this.props;
        if(!auth.uid){
          return (<Redirect exact to="/" />);
        } else{
          return (
            <section className="container">
                <h1 className="large text-primary">
                 Add Experience
                </h1>
                <p className="lead">
                <i className="fas fa-user"></i> Let's fill up exprience
                </p>
                <form className="form" onSubmit={this.handleSubmit}>
                { this.state.emptyInputsError.length>0? <div className='alert alert-danger'> {this.state.emptyInputsError} </div>:null}

                    <div className="form-group">
                        <input 
                        onChange={this.handleChange}
                        value={this.state.company}
                        type="text" 
                        id="company"
                        placeholder="Company"
                        name="company" />
                        
                    </div>
                    <div className="form-group">
                        <input 
                        onChange={this.handleChange}
                        value={this.state.jobTitle}
                        type="text" 
                        id="jobTitle"
                        placeholder="job title"
                        name="jobTitle" />
                        
                    </div>
                    <div className="form-group">
                        <input 
                            onChange={this.handleChange}
                            value={this.state.location}
                            type="text" 
                            id="location"
                            placeholder="location"
                            name="location" />
                        
                    </div>

                    <div className="form-group">
                        <input 
                        onChange={this.handleChange}
                        value={this.state.fromDate}
                        type="date" 
                        id="fromDate"
                        name="fromDate" />
                        
                    </div>

                    <div className="form-group">
                        <input 
                            onChange={this.handleChange}
                            value={this.state.toDate}
                            type="date" 
                            id="toDate"
                            name="toDate" />
                        
                     </div>
                    
                    <div className="form-group">
                        <input 
                            onChange={this.handleChange}
                            value={this.state.description}
                            type="text" 
                            id="description"
                            placeholder="description"
                            name="description"                            
                            />
                        
                    </div>
                   
                    <input type="submit" className="btn btn-primary my-1" />
                    <NavLink className="btn btn-light my-1" to="/dashboard">Go Back</NavLink>
                </form>
            </section>   
          );
          
        } 
         
       
    }
  }

const mapStateToProps = (state,ownProps) =>{
  
  
    if(state.firebase.auth.uid){
      return {
        auth:state.firebase.auth       
      };
    }
    
}
const mapDispatchToProps = (dispatch)=>{

    return {
        addExperience :(experience)=>dispatch(addExperience(experience))
    }

}

export default compose(
  connect(mapStateToProps,mapDispatchToProps)
)
(AddExperience);


