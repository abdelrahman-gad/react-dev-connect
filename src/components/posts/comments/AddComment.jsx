import React from 'react';
import {connect} from 'react-redux';
import {addComment} from '../../../store/actions/commentsActions';

class AddComment  extends React.Component{
    state={
        body:'',
        postError:''
    }


    constructor(props){
        super(props);
       this.handleChange=this.handleChange.bind(this);
       this.handleSubmit=this.handleSubmit.bind(this);
    }
    handleChange=(e)=>{
        this.setState({
            [e.target.id]:e.target.value
        });
        //console.log(this.state);
    }

    handleSubmit=(e)=>{
        e.preventDefault();
        const {addComment , postId , auth} = this.props;
        //console.log(postId);
        //console.log(auth);

        if(this.state.body.length < 1){
            this.setState({
                commentError:'Plz, add comment , then press comment button'
            });
        }else{
             //console.log(postId);
             //console.log(auth.uid);
            addComment({
                    body:this.state.body,
                    postId:postId,
                    userId:auth.uid                                 
                });


            this.setState({
                body:'',
                commentError:''
            });

        }
       
    }

    render(){

        return (
          <div className="form">
            <form   onSubmit={this.handleSubmit}> 
            <p className="text-danger my-1"> {this.state.commentError} </p>

                <textarea 
                   name=""
                   className="comment" 
                   id="body" 
                   cols="30" 
                   rows="5" 
                   placeholder="add comment on post"
                   onChange={this.handleChange}
                   value={this.state.body}
                   ></textarea>
                <button type="submit" className="btn"> Comment </button>
            </form>
          </div>
        );
    }
}


const mapDispatchToProps = (dispatch)=>{
    return {
        addComment:(comment)=>dispatch(addComment(comment))
    }
}

export default connect(null,mapDispatchToProps) (AddComment);

