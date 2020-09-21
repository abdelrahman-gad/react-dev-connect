import React from 'react';
import {Redirect} from 'react-router-dom';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {addEducation } from '../../store/actions/profilesActions';
import {NavLink} from 'react-router-dom';

class AddEducation extends React.Component{

    constructor(props){
       super(props);
       
     //  console.log(props);
       
        this.state = {
             school:'',
             degree:'',
             field:'',
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
       const {addEducation } = this.props;
       const {school,degree,fromDate,toDate,field,description}=this.state;
       let inputsArray= [school,degree,fromDate,toDate,description];
       if(inputsArray.some(input=>input.length === 0)){
         this.setState({
             emptyInputsError:'Please fill up all required inputs'
         });
       }else{
        // console.log('all fields are filled');
        addEducation({school,degree,fromDate,toDate,field,description});
        this.setState({
          emptyInputsError:''
        });
        this.props.history.push('/dashboard');
      }
    }
    render(){
     //   console.log('add education component');
        const { auth  } = this.props;
        if(!auth.uid){
          return (<Redirect exact to="/" />);
        } else{
          return (
            <section className="container">
                <h1 className="large text-primary">
                 Add Education
                </h1>
                <p className="lead">
                <i className="fas fa-user"></i> Let's fill up expereince
                </p>
                <small> * = required fields</small>

                <form className="form" onSubmit={this.handleSubmit}>
                { this.state.emptyInputsError.length>0? <div className='alert alert-danger'> {this.state.emptyInputsError} </div>:null}
                    <div className="form-group">
                      
                        <input 
                          onChange={this.handleChange}
                          value={this.state.school}
                          type="text" 
                          id="school"
                          placeholder="* school or bootcamp"
                          name="school" 
                        
                        />
                        
                    </div>
                  <div className="form-group">

                    <input 
                          onChange={this.handleChange}
                          value={this.state.field}
                          type="text" 
                          id="field"
                          placeholder="* Field "
                          name="field" 
                        
                       />
                        
                    </div>
                    <div className="form-group">
                        <input 
                        onChange={this.handleChange}
                        value={this.state.degree}
                        type="text" 
                        id="degree"
                        placeholder="* degree"
                        name="degree" />
                        
                    </div>
                   
                    <div className="form-group">
                        <label>* From Date </label>
                        <input 
                        onChange={this.handleChange}
                        value={this.state.fromDate}
                        type="date" 
                        id="fromDate"
                        name="fromDate" />
                        
                    </div>

                    <div className="form-group">
                        <label>* To Date </label>
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
                            placeholder="* description"
                            id="description"
                            name="description" />
                        
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
      }else return {};
     
    
}
const mapDispatchToProps = (dispatch)=>{

    return {
        addEducation :(education)=>dispatch(addEducation(education))
    }

}

export default compose(
  connect(mapStateToProps,mapDispatchToProps)
)
(AddEducation);


