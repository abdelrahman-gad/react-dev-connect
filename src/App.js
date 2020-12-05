import React from 'react';
import Navbar from './components/layout/Navbar';
import './styles/App.scss';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import { BrowserRouter , Switch , Route} from 'react-router-dom';
import Dashboard from './components/dashboard/Dashboard';
import PostDetails from './components/posts/PostDetails';
import Posts from './components/posts/Posts';
import EditProfile from './components/dashboard/EditProfile';
import AddExperience from './components/dashboard/AddExperience';
import AddEducation from './components/dashboard/AddEducation';
import EditProfileImage from './components/dashboard/EditProfileImage';
import NotFoundPage from './components/layout/NotFoundPage';
import HomePage from './components/layout/HomePage';
import Developers from './components/profiles/Developers';
import DeveloperDetails from './components/profiles/DeveloperDetails';
import DeveloperPosts from './components/profiles/DeveloperPosts';
import EditPost from './components/posts/EditPost';
import PrivateRoute from './components/auth/PrivateRoute';
import {toast} from 'react-toastify';
import 'react-confirm-alert/src/react-confirm-alert.css'; 
import 'react-toastify/dist/ReactToastify.css';


toast.configure();


function App() {
  return (
    <BrowserRouter  > 
      <div className="App">
         <Navbar />
         <Switch>
            <Route exact path='/' component={HomePage}  />

            <PrivateRoute exact path='/dashboard' component={Dashboard}  />
            <Route exact path='/signin' component={SignIn} />
            <Route exact path='/signup' component={SignUp} />
            <PrivateRoute exact path="/editProfile/:id"  component={EditProfile}  /> 
            <PrivateRoute exact path="/addExperience/:id"  component={AddExperience} />
            <PrivateRoute exact path="/addEducation/:id"  component={AddEducation} />
            <PrivateRoute exact path="/editProfileImage/:id" component={EditProfileImage}  />
            <PrivateRoute exact path="/developers"  component={Developers}/>
            <PrivateRoute exact path="/profile/:id"  component={DeveloperDetails}/> 
            <PrivateRoute exaxt path="/developerPosts/:id" component={DeveloperPosts} />
 

            <PrivateRoute exact path="/posts" component={Posts} />
            <PrivateRoute exact path="/post/:id" component={PostDetails}  />
            <Route exact path="/editPost/:id" component={EditPost}  />

            <Route path="*" component={NotFoundPage} />
         </Switch>
      </div>
    </BrowserRouter>
    
  );
}

export default App;
