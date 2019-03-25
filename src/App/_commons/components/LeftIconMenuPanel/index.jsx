// Dependencies
import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { List, ListItem, ListItemIcon } from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import BusinessIcon from '@material-ui/icons/Business';
import PhoneIcon from '@material-ui/icons/Phone';
import HomeIcon from '@material-ui/icons/Home';
import { Grid, Row, Col } from 'react-flexbox-grid';

// Commons
//import TextFieldDecored, { propsTextFieldBuilder } from 'App/_commons/elements/TextFieldDecored';
//import { TitlePanelContainer } from 'App/_commons/elements/PanelContainer';

// Styles
import { styles } from './styles';

class LeftIconMenuPanel extends Component {
  constructor(props) {
    super(props);
    this.handleOnClick = this.handleOnClick.bind(this);
    this.state = {
      selected: 0
    }
  }

  // Owns methods
  handleOnClick(itemIndex) {
    this.setState({selected: itemIndex});
    if(this.props.handleOnChangeMenu)
      this.props.handleOnChangeMenu(itemIndex)
  }

  render() {
    const { classes,
    content = <div>No content defined.</div> } = this.props;

    // Render indeed
    // TODO: Adjust <List />, iterate way & disabled state implement
    return (<Grid>
      <Row>
        <Col xs={1} className={classes.cols}>
          <List>
            <ListItem button
              classes={{root: classes.root, divider: classes.divider, selected: classes.selected}}
              divider={this.state.selected === 0}
              name="person"
              className={classes.listItem}
              selected={this.state.selected === 0}
              onClick={() => this.handleOnClick(0)}>
              <ListItemIcon className={classes.listItemIcon}>
                <PersonIcon color={this.state.selected === 0 ? "primary" : "inherit"}/>
              </ListItemIcon>
            </ListItem>
            <ListItem button
              classes={{root: classes.root, divider: classes.divider, selected: classes.selected}}
              divider={this.state.selected === 1}
              name="busines"
              className={classes.listItem}
              //className={!pantalla ?
              //  classes.group :
              //  classes.textFieldDisabled}
              selected={this.state.selected === 1}
              onClick={() => this.handleOnClick(1)}>
              <ListItemIcon className={classes.listItemIcon}>
                <BusinessIcon color={this.state.selected === 1 ? "primary" : "inherit"}/>
              </ListItemIcon>
            </ListItem>
            <ListItem button
              classes={{root: classes.root, divider: classes.divider, selected: classes.selected}}
              divider={this.state.selected === 2}
              name="phone"
              className={classes.listItem}
              //className={!pantalla ?
              //  classes.group :
              //  classes.textFieldDisabled}
              selected={this.state.selected === 2}
              onClick={() => this.handleOnClick(2)}>
              <ListItemIcon className={classes.listItemIcon}>
                <PhoneIcon color={this.state.selected === 2 ? "primary" : "inherit"}/>
              </ListItemIcon>
            </ListItem>
            <ListItem button
              classes={{root: classes.root, divider: classes.divider, selected: classes.selected}}
              divider={this.state.selected === 3}
              name="home"
              className={classes.listItem}
              selected={this.state.selected === 3}
              onClick={() => this.handleOnClick(3)}>
              <ListItemIcon className={classes.listItemIcon}>
                <HomeIcon color={this.state.selected === 3 ? "primary" : "inherit"}/>
              </ListItemIcon>
            </ListItem>
          </List>
        </Col>
        <Col xs={11} className={classes.cols}>
          {content}
        </Col>
      </Row>
    </Grid>)
  }
}

export default withStyles(styles)(LeftIconMenuPanel);
