import React from 'react'
import { Field, ErrorMessage } from 'formik'
import TextError from './TextError'

function Textarea (props) {
  const { label, name, ...rest } = props
  return (
    <div>
      {/* {label && <label htmlFor={name}>{label}</label> } */}
      
      <Field as='textarea' id={name} name={name} {...rest} />
     <p className="text-danger">  <ErrorMessage component={TextError} name={name} /> </p>
    </div>
  )
}

export default Textarea
