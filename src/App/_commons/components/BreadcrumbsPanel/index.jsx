// Dependencies
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';

// Commons
import { TitleMainHead } from 'App/_commons/elements/PanelContainer';

// Styles
import { styles } from './styles';

// Utils
import { beginsWith, pathKeyNormalizer } from 'utils/misc';

// AppContext
import { AppConsumer } from 'App/AppContext';

// TODO: Still don't resolve issue in line 35.
// TODO: Enhance to extend breadcrumbs more than 2 levels

//
const BreadcrumbsPanel = props => {
  const pathKey = pathKeyNormalizer(props.location.pathname);
  const appBuffer = props.appBuffer[pathKey];
  const { breadcrumbsState } = props;
  const { altTitle = null } = breadcrumbsState;
  //console.log('BreadcrumbsPanel altTitle ->', altTitle, appBuffer);
  //
  const recursiveCheck = (myPieces, initMatch, _altTitle = null) => {
    for (let i = myPieces.length-1; i >= 0; i--) {
      let currentMatch = initMatch.filter(ii => ii.path.split('/').filter(iii => iii !== "")[i] === myPieces[i]);
      if(currentMatch.length === 0) // Means the route has params
        return _altTitle || initMatch.filter(e => beginsWith(':', e.path.split('/').filter(ee => ee !== "")[i]))[0].routeTitle || '_';
      if(currentMatch.length === 1) // Means the route match
        return currentMatch[0].routeTitle || '_-_';
    }
  }
  //
  const buildLasBreadcrumb = (_context, _lastBreadcrumb, _altTitle = null) => {
    const _lastBreadcrumb_ = /\/$/g.test(_lastBreadcrumb) ? _lastBreadcrumb.substr(0,_lastBreadcrumb.length-1) : _lastBreadcrumb;
    const exactMatch = _context.filter(i => {
      const iPath = /\/$/g.test(i.path) ? i.path.substr(0,i.path.length-1) : i.path;
      return iPath === _lastBreadcrumb_;
    });
    if(exactMatch.length > 0)
      return _altTitle || exactMatch[0].routeTitle || '_'
    const myPieces = _lastBreadcrumb.split('/').filter(i => i !== "");
    const initMatch = _context.filter(i => beginsWith(`/${myPieces[0]}`, i.path));
    return recursiveCheck(myPieces, initMatch, _altTitle);
  }
  //
  const buildBreadcrumbTree = (_context, _comesFrom) => {
    return <Link
      className={props.classes.link}
      color="primary"
      onClick={() => props.history.goBack(null)}>
      <TitleMainHead className={props.classes.inline}>
        {buildLasBreadcrumb(_context, _comesFrom)}
      </TitleMainHead>
    </Link>
  }

  // Render
  return <div className={props.classes.divContainer}>
    <AppConsumer>
      { context =>
        <Fragment>
          { appBuffer && appBuffer.comesFrom && buildBreadcrumbTree(context, appBuffer.comesFrom) }
          <i className={`${props.classes.inline} ${props.classes.icon} material-icons`}>keyboard_arrow_right</i>
          <TitleMainHead className={props.classes.inline}>{buildLasBreadcrumb(context, props.location.pathname, altTitle)}</TitleMainHead>
        </Fragment>
      }
    </AppConsumer>
  </div>
}

const mapStateToProps = state => ({
  appBuffer: state.app.bufferState,
  breadcrumbsState: state.app.breadcrumbsPanel,
});

export default withStyles(styles)(connect(mapStateToProps, null)(BreadcrumbsPanel));
