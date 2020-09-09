import React from 'react';
import { firestoreConnect } from 'react-redux-firebase';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {addPost} from '../../store/actions/postsActions';
class AddPost extends React.Component{
   
          state={
              body:''
          }
          handleChange=(e)=>{
              this.setState({
                  [e.target.id]:e.target.value
              });
         
          }
          handleSubmit=(e)=>{
              e.preventDefault();
              const {addPost} = this.props;
              addPost(this.state);
              this.setState({
                  body:''
              });
          }
    render(){
       // console.log(this.props);
        return (
            
                <form className="form my-1" onSubmit={this.handleSubmit}>
                    <textarea cols="30" rows="5" value={this.state.body} placeholder="Create a post" id='body' onChange={this.handleChange}>  </textarea>
                    <input type="submit" value="Submit" className="btn btn-dark my-1" />
                </form>

           
        );
    }
}
const mapStateToProps = (state)=>{

    return{
        auth:state.firebase.auth
    }
}
const mapDispatchToProps = (dispatch)=>{
    console.log('add post');
    return{
         addPost: (post)=>dispatch(addPost(post))
    }
}


export default connect(mapStateToProps,mapDispatchToProps) (AddPost);