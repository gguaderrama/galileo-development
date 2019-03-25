// Dependencies
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Assets
import './css/Content.css';

/**
 *
 */

class Content extends Component {
  static propTypes = {
    body: PropTypes.object.isRequired
  }

  render() {
    const { body, expanded = null } = this.props;
    return <div className="Content" style={expanded && {width: '99%', padding: '0 .5%'}}>{ body }</div>
  }
}

export default Content;
