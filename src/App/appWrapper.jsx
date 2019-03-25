/* eslint-disable import/first */
// Dependencies
import React, { Component } from 'react';
import { connect } from 'react-redux';

// Redux
import * as actionsSession from 'redux/actions/Session/session';

// App Actions
import * as appActions from 'redux/shared-reducers/app-actions';

// AppContext
//import { AppProvider } from './AppContext';

// Utils
import { pathKeyNormalizer, avoidDoubleSlashAtEnd } from 'utils/misc';

// Fn Wrapper
const appWrapper = AttrComponent => {
  //
  class InnerComponent extends Component {
    //constructor(props) {
    //  super(props);
    //}

    componentDidMount() {

    }

    componentWillMount() {
      this.props.getAppCache();
      this.props.changeZeroKeyAppBuffer();
    }

    componentWillReceiveProps(nextProps) {
      if (this.props.location !== nextProps.location){
        this.props.goBackButtonHidden();
        this.props.changeZeroKeyAppBuffer();
        this.props.breadcrumbsHidden();
        const _link = avoidDoubleSlashAtEnd(`${this.props.location.pathname}/${this.props.location.search}`);
        const buildBufferKey = {
          [pathKeyNormalizer(nextProps.location.pathname)]: {
            ...nextProps.appBuffer[pathKeyNormalizer(nextProps.location.pathname)],
            comesFrom: this.props.location.pathname,
            link:_link,
          }
        };
        this.props.fillAppBuffer(buildBufferKey);
        this.props.fillAppCache();
      }
    }

    //
    render() {
      // Alltogether to Component
      const pipeProps = {
        ...this.props,
      }

      // Render indeed
      return <AttrComponent {...pipeProps} />
    }
  }

  // Conect to Store
  return connect(mapStateToProps, {...appActions, ...actionsSession})(InnerComponent);
}

const mapStateToProps = state => ({
  dialogNotificationModal: state.app.dialogNotificationModal,
  snackbarNotification: state.app.snackbarNotification,
  goBackPanel: state.app.goBackPanel,
  breadcrumbsPanel: state.app.breadcrumbsPanel,
  appBuffer: state.app.bufferState,
});

export default appWrapper;
