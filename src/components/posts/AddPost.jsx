import React from 'react';
import {connect} from 'react-redux';
import {addPost} from '../../store/actions/postsActions';


class AddPost extends React.Component{
   
    state={
        body:'',
        postError:''
    }
    handleChange=(e)=>{
        this.setState({
            [e.target.id]:e.target.value
        });
    
    }
    handleSubmit=(e)=>{
        e.preventDefault();
        const {addPost} = this.props;
        if(this.state.body.length<5){
            this.setState({
                postError:'post length should be 5 characters length at least'
            });
        }else{
            addPost({body:this.state.body});
            this.setState({
                body:'',
                postError:''
            });
        }
       
    }
    render(){
       //console.log(this.props);
        return (
            
                <form className="form my-1" onSubmit={this.handleSubmit}>
                    <p className="text-danger my-1"> {this.state.postError} </p>
                    <textarea cols="30" rows="5" value={this.state.body} placeholder="Create a post" id='body' onChange={this.handleChange}>  </textarea>
                    <input type="submit" value="Submit" className="btn btn-dark my-1" />
                </form>

           
        );
    }
}
const mapStateToProps = (state)=>{
 const auth = state.firebase.auth;
    return{
        auth
    }
}
const mapDispatchToProps = (dispatch)=>{
    ////console.log('add post');
    return{
         addPost: (post)=>dispatch(addPost(post))
    }
}


export default connect(mapStateToProps,mapDispatchToProps) (AddPost);