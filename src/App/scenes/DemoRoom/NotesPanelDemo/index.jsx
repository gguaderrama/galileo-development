// Dependencies
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

// Actions
import * as appActions from 'redux/shared-reducers/app-actions';

// constants
import { DIALOGO_NOTIFICACION_INITIAL_STATE } from 'constants/Generic';

// _commons
import DialogNotificationModal from 'App/_commons/components/DialogNotificationModal';
import PanelContainer from 'App/_commons/elements/PanelContainer';
//
import NotesPanel from 'App/_commons/components/NotesPanel';

const notesDummie = [
  {
    title: "Nota uno",
    date: "Dicembre 20, 2018",
    hour: "08:00 hrs",
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam mattis nunc quis nisl gravida, in rutrum ex luctus. Etiam turpis nibh, lacinia id nibh eu, rhoncus dignissim risus."
  },
  {
    title: "Nota dos, y mas larga",
    date: "Dicembre 21, 2018",
    hour: "08:30 hrs",
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam mattis nunc quis nisl gravida, in rutrum ex luctus. Etiam turpis nibh, lacinia id nibh eu, rhoncus dignissim risus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam mattis nunc quis nisl gravida, in rutrum ex luctus. Etiam turpis nibh, lacinia id nibh eu, rhoncus dignissim risus."
  }
]

class NotesPanelDemo extends Component {
  constructor(props){
    super(props);
    this.handleAddNote = this.handleAddNote.bind(this);
    this.handleOnSubmitNote = this.handleOnSubmitNote.bind(this);
    //
    this.closeDialog = this.closeDialog.bind(this);
    this.openDialog = this.openDialog.bind(this);
    //
    this.state = {};
  }

  // React methods
  componentDidMount() {
    this.props.breadcrumbsShow('NotesPanel Demo');
  }

  // Own methods
  handleAddNote(event, AddNoteComponent) {
    this.openDialog({
      content: <AddNoteComponent
        placeholder="Escribe un comentario sobre el cliente"
        label={null}
        handleOnCancel={this.closeDialog}
        handleOnSubmit={(e,v) => {this.handleOnSubmitNote(v); this.closeDialog()}}
        handleOnChange={null} //handleOnChange={(e, v) => console.log(v)}
        //addNoteValue="Persistant data"
      />,
      opened: true,
      buttonsHidden: true,
    });
  }

  handleOnSubmitNote(note){
    console.log('handleOnSubmitNote>', note);
  }

  closeDialog() {
      this.setState({ openDialog: DIALOGO_NOTIFICACION_INITIAL_STATE })
  }

  openDialog(mensaje) {
      this.setState({ openDialog: mensaje })
  }

  //
  render() {

    return (<Fragment>
      <PanelContainer><NotesPanel /></PanelContainer>

      <PanelContainer>
        <NotesPanel
          description="Notas varias..."
          notes={notesDummie}
          handleAddNote={this.handleAddNote}
        />
    </PanelContainer>

    <DialogNotificationModal {...this.state.openDialog} />

    </Fragment>)

  }
}
export default connect(null, appActions)(NotesPanelDemo);
