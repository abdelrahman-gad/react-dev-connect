import React from 'react';
import AddPost from './AddPost';
import PostSummary from './PostSummary';
import { firestoreConnect } from 'react-redux-firebase';
import {compose} from 'redux';
import {connect} from 'react-redux';
import { Redirect } from 'react-router-dom';
class Posts extends React.Component{
 
  
 

   render(){
     console.log('render');
       const {posts} = this.props; 
      
        if (posts===undefined){
          return (<div className="container"> <h1 className="large text-primary">Posts are loaded</h1> </div>);
       }else{
    
        return(
          <section className="container" >
          <h1 className="large text-primary">
            Posts
          </h1>
          <p className="lead"><i className="fas fa-user"></i> Welcome to the community</p>
    
          <div className="post-form">
          <AddPost props={this.props}/>
            <div className="posts">       
              {posts && posts.map(post=> <PostSummary key={post.id} post={post} />)}
            </div>
          </div>
        </section>
         );
       }
       
         
       
   }


}

const mapStateToProps = (state) =>{
   return{
           auth:state.firebase.auth,
           posts:state.firestore.ordered.posts
   }
}
export default compose(
    connect(mapStateToProps),
    firestoreConnect([
       { collection:'posts'}
    ])
    
)  ( Posts);

