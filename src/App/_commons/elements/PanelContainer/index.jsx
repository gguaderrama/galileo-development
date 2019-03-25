// Dependencies
import React from 'react';
import Typography from '@material-ui/core/Typography';

const PanelContainer = props => <div className="Panel-container"
  style={{
    //backgroundColor: 'white',
    //border: 'solid 1px #e8e8e8',
    //borderRadius: '5px',
    //padding: '24px 18px 14px',
    marginBottom: '24px',
    padding: props.noPadding && 0,
  }} {...props}>{props.children}
</div>

export default PanelContainer;

export const TitlePanelContainer = props => <Typography style={{margin: '0px 0px 10px 0px'}} {...props} variant="h6">{props.children}</Typography>

export const TitlePanelContainerAlt = props => <Typography style={{margin: '0px'}} {...props} variant="h6"><span style={{fontSize:'.87em'}}>{props.children}</span></Typography>

export const TitleMainHead = props => <Typography color="primary" style={{margin: '24px 0px'}} {...props} variant="h5">{props.children}</Typography>

export const NoResultRowTable  = props =>
  <div {...props} style={{
    //backgroundColor: '#ededed',
    padding: '25px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
    fontWeight: 500,
  }}>{props.children}</div>
