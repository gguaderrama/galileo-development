// Dependencies
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

// Styles
import { styles } from './styles';

const ButtonsContainer_ = props => <div className={props.classes.divButttonContainer} {...props}>{props.children}</div>
export const ButtonsContainer = withStyles(styles)(ButtonsContainer_);

export const ButtonOriginPrimary = props => <Button color="primary" variant="contained" {...props}>{props.children}</Button>

export const ButtonOriginSecondary = props => <Button color="primary" {...props}>{props.children}</Button>
