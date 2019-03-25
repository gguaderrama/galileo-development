// Dependencies
import React, { /* Component */ } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

// Assets
import './css/Header.css';

/**
 * stateless 'Header' component (pure function version)
 * @return {React.component} Header component
 */
const Header = props => <header className="Header">
    {props.title ? <h1 className="Header-title">{ props.title }</h1> : null}
    <ul className="Menu">
      { props.items
        && props.items.map((item, key) => <li key={key}><Link to={ item.url }>{ item.title }</Link></li>)
      }
    </ul>
  </header>

Header.propTypes = {
  title: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default Header;
