// Dependencies
import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
//import Tooltip from '@material-ui/core/Tooltip';

// Commons
import PanelContainer, { TitlePanelContainerAlt } from 'App/_commons/elements/PanelContainer';
import TextFieldDecored from 'App/_commons/elements/TextFieldDecored';
import { ButtonsContainer, ButtonOriginPrimary } from 'App/_commons/elements/ButtonsFeature';

// Styles
import { styles } from './styles';

//
class AddNotePanel extends Component {
  constructor(props){
    super(props);
    this.handleAttrChangeValue = this.handleAttrChangeValue.bind(this);
    this.state = {
      addNoteValue: ''
    }
  }

  componentDidMount(){
    if(this.props.addNoteValue)
      this.setState({addNoteValue: this.props.addNoteValue})
  }

  /* Own Methos */
  handleAttrChangeValue(event){
    this.setState({[event.target.name]:event.target.value});
  }

  //
  render(){
    const { classes,
      title = "Nueva nota",
      placeholder = 'Escribe una nota',
      label = 'Escribe una nota',
      submitDisabled = false,
      handleOnChange = (e, value) => console.log('|AddNotePanel -> HANDLEONCHANGE|:>', e.target, value),
      handleOnCancel = e => console.log('|AddNotePanel -> HANDLEONCANCEL|:>', e),
      handleOnSubmit = e => console.log('|AddNotePanel -> HANDLEONSUBMIT|:>', e),
    } = this.props;

    const _handleOnChange = event => {
      if(handleOnChange)
        handleOnChange(event, event.target.value);
    }

    const _handleOnSubmit = event => {
      if(handleOnSubmit)
        handleOnSubmit(event, this.state.addNoteValue);
    }

    const _textAreaSpread = {
      placeholder:placeholder,
      label: label,
      value: this.state.addNoteValue,
      handleOnChange: e => { this.handleAttrChangeValue(e); _handleOnChange(e)},
      inputProps: { name: 'addNoteValue', id: 'addNoteValue-simple' },
    }

    return (<div className={classes.addNoteContainer}>
      <TitlePanelContainerAlt>{title}</TitlePanelContainerAlt>
      <PanelContainer>
        <TextFieldDecored multiline style={{width: '100%'}} {..._textAreaSpread} />
      </PanelContainer>
      <ButtonsContainer style={{margin:0}}>
          <Button color="primary" onClick={handleOnCancel}>Cancelar</Button>
          <ButtonOriginPrimary onClick={_handleOnSubmit} disabled={submitDisabled}>Guardar</ButtonOriginPrimary>
      </ButtonsContainer>
    </div>)
  }
}

export default withStyles(styles)(AddNotePanel);
