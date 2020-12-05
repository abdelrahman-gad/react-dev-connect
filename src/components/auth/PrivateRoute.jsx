import { connect } from "react-redux";
import React from "react";
import { Route, Redirect } from "react-router-dom";


/**
 * this a higher order component return compenent only if user is authenticated 
 * 
*/

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={ props =>
            rest.auth.uid ? (
                <Component {...props} />
            ) : (
                <Redirect
                    to={{
                        pathname: "/signin",
                        state: { from : props.location }
                    }}
                />
            )
        }
    />
);

const mapStateToProps = state => {
    return {
        auth:state.firebase.auth
    }
}

export default connect( mapStateToProps , null ) (PrivateRoute);
