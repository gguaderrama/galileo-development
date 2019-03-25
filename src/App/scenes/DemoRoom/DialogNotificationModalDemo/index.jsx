// Dependencies
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

//
import PanelContainer from 'App/_commons/elements/PanelContainer';
import { ButtonOriginPrimary } from 'App/_commons/elements/ButtonsFeature';

// Actions
import * as appActions from 'redux/shared-reducers/app-actions';

class DialogNotificationModalDemo extends Component {
  constructor(props){
    super(props);
    this.handleOpenDialog = this.handleOpenDialog.bind(this);
    this.state = {};
  }

  // React methods
  componentDidMount() {
    this.props.breadcrumbsShow('DialogNotificationModal Demo');
  }

  // Own methods
  handleOpenDialog(what) {
    switch (what) {
      case 'loading':
        this.props.setDialogNotificationModalToLoading();
        setTimeout(() => this.props.setDialogNotificationModalToInit(), 3000);
      break;

      case 'decisionDialog':
        this.props.setDialogNotificationModal({
          title: 'Dialog Notification Modal',
          content: 'Text content',
          subcontent: 'Text subcontent',
          opened: true,
          handleClose: this.props.setDialogNotificationModalToInit,
          handleOnClose: this.props.setDialogNotificationModalToInit,
          flag: true
        });
      break;

      case 'msgDialog':
        this.props.setDialogNotificationModal({
          title: 'Dialog Notification Modal',
          content: 'Text content',
          subcontent: 'Text subcontent',
          opened: true,
          handleClose: this.props.setDialogNotificationModalToInit,
        });
      break;

      case 'errorDialog':
        this.props.setDialogNotificationModal({
          title: 'Dialog Notification Modal',
          content: 'Text content',
          subcontent: 'Text subcontent',
          opened: true,
          handleClose: this.props.setDialogNotificationModalToInit,
          error: true,
        });
      break;

      case 'componentDialog':
        this.props.setDialogNotificationModal({
          content: <PanelContainer style={{width:500}}>
            <h2>Some content</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas vitae nisl vel augue porttitor venenatis. Nam condimentum sapien sed euismod placerat. Curabitur euismod vel eros a suscipit. Cras finibus nisi magna. Nam egestas ullamcorper ex, et egestas sapien iaculis non. Praesent vestibulum, ante id facilisis condimentum, arcu felis efficitur sem</p>
            <pre style={{color:'blue'}} onClick={this.props.setDialogNotificationModalToInit}>Close Modal</pre>
          </PanelContainer>,
          opened: true,
          handleClose: this.props.setDialogNotificationModalToInit,
          buttonsHidden: true,
          flag: true
        });
      break;

      default:
        console.log(what);
    }
  }

  //
  render() {
    return <Fragment>
      <PanelContainer style={{display:'flex', justifyContent:'space-evenly'}}>
        <ButtonOriginPrimary onClick={e => this.handleOpenDialog('decisionDialog')} children="SHOW DESICION DIALOG..." />
        <ButtonOriginPrimary onClick={e => this.handleOpenDialog('msgDialog')} children="SHOW MESAGE DIALOG..." />
        <ButtonOriginPrimary onClick={e => this.handleOpenDialog('errorDialog')} children="SHOW ERROR DIALOG..." />
        <ButtonOriginPrimary onClick={e => this.handleOpenDialog('componentDialog')} children="SHOW COMPONENT DIALOG..." />
        <ButtonOriginPrimary onClick={e => this.handleOpenDialog('loading')} children="SHOW LOADING..." />
      </PanelContainer>
    </Fragment>
  }
}

export default connect(null, appActions)(DialogNotificationModalDemo);
