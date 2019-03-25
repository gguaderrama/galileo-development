// Dependencies
import React from 'react';

//
import PanelContainer from 'App/_commons/elements/PanelContainer';

export const SpanBlue = props => <span style={{
  color: 'SteelBlue',
  fontSize: props.est && '1.22em',
}} {...props}>{props.children}</span>

export const SpanGray = props => <span style={{
  color: 'gray',
  fontSize: props.est && '1.22em',
}} {...props}>{props.children}</span>

export const LiSpaceBottom = props => <li style={{
  paddingBottom: '.5em',
}} {...props}>{props.children}</li>

export const Pp = props => <p style={{
  margin: '.6em 0',
}} {...props}>{props.children}</p>

export const CodePanel = props => <PanelContainer style={{
  backgroundColor: '#2E2E2E',
  color: 'lime',
  paddingTop: 14,
}} {...props}>
  <pre style={{
    margin:0,
  }}>{props.children}</pre>
</PanelContainer>
