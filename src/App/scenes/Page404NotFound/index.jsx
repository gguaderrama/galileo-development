// Dependencies
import React from 'react';

const Page404 = props =>
  <div>
    <h2>404</h2>
    <div>Route <span style={{color: "red"}}>{props.location.pathname}</span> no found</div>
  </div>

export default Page404;
