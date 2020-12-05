import React from 'react';
import { createBrowserHistory } from "history";
import Navbar from './components/layout/Navbar';

import './styles/App.scss';

import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import { BrowserRouter , Switch , Route} from 'react-router-dom';

import Dashboard from './components/dashboard/Dashboard';
import PostDetails from './components/posts/PostDetails';
import Posts from './components/posts/Posts';
import EditProfile from './components/dashboard/EditProfile';
import EditProfileFormik from './components/dashboard/EditProfileFormik';

import AddExperience from './components/dashboard/AddExperience';
import AddEducation from './components/dashboard/AddEducation';
import EditProfileImage from './components/dashboard/EditProfileImage';
import NotFoundPage from './components/layout/NotFoundPage';
import HomePage from './components/layout/HomePage';
import Developers from './components/profiles/Developers';
import DeveloperDetails from './components/profiles/DeveloperDetails';
import DeveloperDetailsNew from './components/profiles/DeveloperDetailsNew';

import DeveloperPosts from './components/profiles/DeveloperPosts';
import EditPost from './components/posts/EditPost';
import EditPostFormik from './components/posts/EditPostFormik';

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

            <Route exact path='/dashboard' component={Dashboard}  />
            <Route exact path='/signin' component={SignIn} />
            <Route exact path='/signup' component={SignUp} />
            <Route exact path="/editProfile/:id"  component={EditProfileFormik}  /> 
            <Route exact path="/addExperience/:id"  component={AddExperience} />
            <Route exact path="/addEducation/:id"  component={AddEducation} />
            <Route exact path="/editProfileImage/:id" component={EditProfileImage}  />
            <Route exact path="/developers"  component={Developers}/>
            <Route exact path="/profile/:id"  component={DeveloperDetailsNew}/> 
            <Route exaxt path="/developerPosts/:id" component={DeveloperPosts} />
 

            <PrivateRoute exact path="/posts" component={Posts} />
            <Route exact path="/post/:id" component={PostDetails}  />
            <Route exact path="/editPost/:id" component={EditPostFormik}  />

            <Route path="*" component={NotFoundPage} />
         </Switch>
      </div>
    </BrowserRouter>
    
  );
}

export default App;
