import React from 'react';
import {connect} from 'react-redux';
import { NavLink, Redirect } from 'react-router-dom';
import {firestoreConnect} from 'react-redux-firebase';
import {compose } from 'redux';

class Developers extends React.Component{

    render(){
        const {auth,users,profiles}  = this.props;
        console.log(auth.uid);
        

        if(!auth.uid){
            return (<Redirect exact to="/" />)
        }else{

            if(! (users && profiles) ){
                return (<div className="container">
                           <h1 className="text-center text-primary loading">Loading Data .....</h1>
                        </div>);
            }else{

               console.log(users);
               console.log(profiles);
                             
                let developers = users.map((user,i)=>Object.assign({},user,profiles[i]));
               console.log(developers);
              developers =  developers.map(user=>{
                
                    return { 
                        handle:user.handle,
                        id:user.userId,
                        jobTitle:user.jobTitle,
                        location:user.location,
                        imageUrl:user.imageUrl,
                        skills:user.skills
                    };
                });
                console.log(developers);
                developers = developers.filter(developer=>developer.handle!==undefined && developer.id!==undefined);              
                console.log(developers);

                return(
                    <section className="container">
                        <h1 className="large text-primary">
                         Developers
                        </h1>
                        <p className="lead">
                        <i className="fab fa-connectdevelop"></i>
                        Browse And Connect With Developers
                        </p>
                        <div className="profiles">
                           {developers && developers.map(developer=>{
                            return (
                                       
                                        <div className="profile bg-light p-2"  key={developer.id}>
                                            <img
                                                className="round-img"
                                                src={developer.imageUrl}
                                                alt={developer.handle}
                                            />
                                            <div>
                                                <h1> {developer.handle} </h1>
                                                <p> {developer.jobTitle} </p>
                                                <p> {developer.location} </p>
                                                
                                                <NavLink exact to={"/profile/"+developer.id} target="_parent" className="btn btn-primary">View Profile</NavLink>
                                            </div>
                                             {developer.skills !== undefined ?  <ul> {developer.skills.map((skill,i)=><li className="text-primary" key={i} ><i className="fas fa-check"></i> {skill} </li>)} </ul>:null  }
                                            
                                        </div>           
                             
                          );
                          
                        })}
                     </div>
                  </section>
                   );    
    
            }
        }

    }
}

const mapStateToProps = (state)=>{
    
    return {
         auth:state.firebase.auth,
         users:state.firestore.ordered.users,
         profiles:state.firestore.ordered.profiles
    }
}

export default compose(
    connect(mapStateToProps,null),
    firestoreConnect([{collection:'users'},{collection:'profiles'}])
  )
  (Developers);