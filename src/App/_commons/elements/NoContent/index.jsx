// Dependencies
import React from 'react';


const NoContent = props =>
  <i style={{ color: 'blue' }} {...props}>{props.children || "No content defined."}</i>

export default NoContent;
