// Dependencies
import React, { Component, PropTypes } from 'react';
import TextFieldDecored from 'App/_commons/elements/TextFieldDecored';

// Commons
import PanelContainer from 'App/_commons/elements/PanelContainer';

const ViewTemplateError = props => <PanelContainer>
  <pre className={props.classes.pre}>
  viewTemplate</pre> prop must be the <pre className={props.classes.pre}>
  ViewTemplateTag()</pre> way or <pre className={props.classes.pre}>
  {"<"}tag{">"}...{"</"}tag{">"}</pre>
</PanelContainer>

export default ViewTemplateError;
