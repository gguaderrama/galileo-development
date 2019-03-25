/* eslint-disable import/first */
// Dependencies
import React, { Fragment } from 'react';
import { withRouter } from 'react-router-dom';

// Asets
import './_globals/css/App.css';
import appConfig from 'app-config';
const { avoidDisplay } = appConfig;

// Components
import Header from './_globals/Header';
import Footer from './_globals/Footer';
import Content from './_globals/Content';

// Common Components
import DialogNotificationModal from 'App/_commons/components/DialogNotificationModal';
import SnackbarNotification from 'App/_commons/components/SnackbarNotification';
import GoBack from 'App/_commons/components/GoBack';
import BreadcrumbsPanel from 'App/_commons/components/BreadcrumbsPanel';

// HO Containers
import appWrapper from './appWrapper';

// AppContext
import { AppConsumer } from 'App/AppContext';

const App = props => {
  const { children, goBackPanel, breadcrumbsPanel, items = [],
    dialogNotificationModal: {bufferState:bufferModalState},
    snackbarNotification: {bufferState:bufferSnackbarState} } = props;

  // Render
  return (<AppConsumer>{ context => {
    const propsFromRouter = context.filter(i => i.path === props.location.pathname);
    const expanded = propsFromRouter[0] && propsFromRouter[0].viewWidthExpanded;
    // inner Render
    return <div className="App">
      { !avoidDisplay.mainHeader && <Header title={null} items={items} /> }
      { goBackPanel.visible && <GoBack {...props} /> }
      <Content expanded={expanded} body={
        <Fragment>
          { breadcrumbsPanel.visible && <BreadcrumbsPanel {...props} /> }
          {children}
        </Fragment>
      } />
      { !avoidDisplay.mainFooter && <Footer copyrigth="&copy App footer" /> }
      { bufferModalState && <DialogNotificationModal {...bufferModalState} /> }
      { bufferSnackbarState && <SnackbarNotification {...bufferSnackbarState} /> }
    </div>

  }}</AppConsumer>);
}

const AppWrapper = appWrapper(App);

export default withRouter(AppWrapper);
