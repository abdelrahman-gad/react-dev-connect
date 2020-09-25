import React from 'react';
import {firestoreConnect} from 'react-redux-firebase';
import {compose } from 'redux';
import {connect} from 'react-redux';
import {editPost} from '../../store/actions/postsActions';
class EditPost extends React.Component{
  
    constructor(props){
        super(props);
        const { post } = props;
        console.log(post);
        console.log(props);
        this.state={
            body: post?post.body:'',
            postError:''   
        }
        this.handleChange=this.handleChange.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
    }
    handleChange=(e)=>{
        this.setState({
            [e.target.id]:e.target.value
        });
        console.log(this.state.body);
    }

    handleSubmit=(e)=>{
        e.preventDefault();
        const { editPost , post } = this.props;
        if(this.state.body.length < 5){
            this.setState({
                postError:'post length should be 5 characters length at least'
            });
        }else{
            editPost({...post,body:this.state.body});
            this.setState({
                body:'',
                postError:''
            });

            this.props.history.push('/posts');
        }   
    }

    componentWillReceiveProps(nextProps){
        const post  = nextProps.post;
        console.log(post);
        this.mapPostToProps(post);
    }
    mapPostToProps(post){
        this.setState({
            body:post.body
        })
    }


    // componentDidMount(){
    //     const { post } = this.props;
    //     console.log(post);
    //     if(post){
    //         this.setState({
    //             body:post.body
    //         })
    //     }
    // }
    


    render(){

        const { post } = this.props;

          //console.log(post);
          if(post){

              return (
                  <div className="container">
                     <form className="form my-1" onSubmit={this.handleSubmit}>
                         <p className="text-danger my-1"> {this.state.postError} </p>
                         <textarea cols="30" rows="5" value={this.state.body} placeholder="Create a post" id='body' onChange={ (e) =>this.handleChange(e) }>  </textarea>
                         <input type="submit" value="Submit" className="btn btn-dark my-1" />
                     </form>          
                  </div>
             );
          }else{
              return (
                  <div className="container">
                       <h2 className="text-primary text-center loading"> Loading post ......</h2>
                  </div> 
              );
          }

    }
}
const mapStateToProps = (state ,ownProps )=>{
    const auth = state.firebase.auth;
    const postId= ownProps.match.params.id;
    const posts = state.firestore.data.posts;
    const post = posts ? posts[postId]:undefined;
    // console.log(posts);
    // console.log(post);

    if(auth && post ){
        return{
            auth,
            post
        }
    }else if(auth){
        return {
            auth
        }
    }else return {};
}
const mapDispatchToProps = (dispatch,ownProps)=>{
    ////console.log('add post');
    // const  postId = ownProps.match.params.id;
    // console.log(postId); 
    return{
         editPost: (post)=>dispatch(editPost(post))
    }
}


export default   compose(
                    connect(mapStateToProps,mapDispatchToProps),
                    firestoreConnect([{collection:'posts'}])
                    ) (EditPost);