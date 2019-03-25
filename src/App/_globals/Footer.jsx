// Dependencies
import React, { /* Component */ } from 'react';
import PropTypes from 'prop-types';

// Assets
import './css/Footer.css';

/**
 * stateless 'Footer' component (pure function version)
 * @return {React.component} Footer component
 */
const Footer = props => {
	const { copyrigth = '&copy React 2017' } = props;
	return <footer dangerouslySetInnerHTML={{__html: copyrigth }} />
}

Footer.propTypes = {
	copyrigth: PropTypes.string
}

export default Footer;
