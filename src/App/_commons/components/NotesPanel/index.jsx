// Dependencies
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';

// Commons
import PanelContainer from 'App/_commons/elements/PanelContainer';
import { ButtonOriginPrimary } from 'App/_commons/elements/ButtonsFeature';

// Owns
import ItemNote from './ItemNote';
import AddNotePanel from './AddNotePanel';

// Styles
import { styles } from './styles';

const NotesPanel = props => {
  const { classes,
    addNoteDisabled = false,
    description = <span>Notes description - <pre style={{display: 'inline', color: 'blue'}}>description</pre> - | - <pre style={{display: 'inline', color: 'blue'}}>tooltipDescription</pre> - | Disabled button - <pre style={{display: 'inline', color: 'blue'}}>addNoteDisabled</pre> -</span>,
    tooltipDescription = "Agrega nota",
    noNotesMsg = "notes=null, There is not notes. - noNotesMsg -",
    handleAddNote = (e, addNoteComponent) => console.log('Method exposed -> |handleAddNote|', e, addNoteComponent),
    notes = null,
  } = props;

  const _handleAddNote = e => {
    if(handleAddNote)
      return handleAddNote(e, AddNotePanel);
  }

  return (<div className={classes.divContainer}>
    <div>
      <div className={classes.divButttonContainer}>
        <span>{description}</span>
        <Tooltip title={tooltipDescription} style={{float: 'right'}}>
            <ButtonOriginPrimary
              onClick={_handleAddNote}
              disabled={addNoteDisabled}
              children={"AGREGAR NOTA"}/>
        </Tooltip>
      </div>
    </div>
    { notes && notes.length > 0
      ? notes.map((note, key) => <ItemNote key={key} classes={classes} {...note} />)
      : <PanelContainer children={
          React.isValidElement(noNotesMsg)
          ? noNotesMsg
          : <pre style={{color:'blue'}}>{noNotesMsg}</pre>
        } /> }
  </div>)
}

export default withStyles(styles)(NotesPanel);
