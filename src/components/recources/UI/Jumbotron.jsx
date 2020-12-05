import React, { Fragment } from "react";

const Jumbotron = ({
    title = "Title",
    description = "Description",
    className,
    children
}) => (
     <Fragment>
            <h1 className="large text-primary">  {title} </h1>   
            <p className="lead"> {children} {description} </p>
     </Fragment>
);

export default Jumbotron;
