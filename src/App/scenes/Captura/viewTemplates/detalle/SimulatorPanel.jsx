// Dependencies
import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';

// Commons
import { ButtonsContainer, ButtonOriginPrimary, ButtonOriginSecondary } from 'App/_commons/elements/ButtonsFeature';
//import TextFieldDecored from 'App/_commons/elements/TextFieldDecored';
//import PanelContainer, { TitlePanelContainer, TitlePanelContainerAlt } from 'App/_commons/elements/PanelContainer';
import { TitlePanelContainer } from 'App/_commons/elements/PanelContainer';

// Styles
import { styles } from '../styles';

class SimulatorPanel extends Component {
  constructor(props) {
    super(props);
    this.handleOnChangeMenu = this.handleOnChangeMenu.bind(this);
    this.handleOnChangeInput = this.handleOnChangeInput.bind(this);
    this.handleOnSave = this.handleOnSave.bind(this);
    this.handleOnClear = this.handleOnClear.bind(this);
    //this.state = {
    //  selected: 0,
    //  personales: null,
    //  empleo: null,
    //  telefono: null,
    //  domicilio: null,
    //}
  }

  // React methods
  componentWillUnmount() {
    //if(this.props.setDataToParent)
    //  this.props.setDataToParent(this.state, 'panelInfoMore');
  }

  componentDidMount() {
    this.setState({...this.props.initData});
  }

  // Owns methods
  handleOnChangeMenu(itemIndex) {
    //this.setState({selected: itemIndex});
  }

  handleOnChangeInput(event, panel) {
    //this.setState({[panel]: {...this.state[panel], [event.target.name]: event.target.value}});
  }

  handleOnSave() {
    console.log('SimulatorPanel >: onSave');
  }

  handleOnClear() {
    console.log('SimulatorPanel >: onClear');
  }

  // Render indeed
  render() {
    console.log('Render state SimulatorPanel >:', this.state, this.props);
    const { classes={closeButton:''}, handleOnClose = e => console.log('Close icon') } = this.props;

    // Render indeed
    return (<div>
      <TitlePanelContainer>Datos del solicitante</TitlePanelContainer>
      <IconButton className={classes.closeButton} aria-label="Close" onClick={handleOnClose}>
        <Icon children="clear"/>
      </IconButton>
      <div>SimulatorPanel</div>
      <ButtonsContainer style={{margin:0}}>
        <ButtonOriginSecondary onClick={this.handleOnClear}>Limpiar</ButtonOriginSecondary>
        <ButtonOriginPrimary onClick={this.handleOnSave}>Guardar</ButtonOriginPrimary>
      </ButtonsContainer>
    </div>)
  }
}

export default withStyles(styles)(SimulatorPanel);
