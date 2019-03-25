// Dependencies
import React from 'react';

const Page403 = props =>
  <div>
    <h2>403</h2>
    <div>Route <span style={{color: "red"}}>{props.location.pathname}</span> forbidden</div>
  </div>

export default Page403;
