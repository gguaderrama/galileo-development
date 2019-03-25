// Dependencies
import React from 'react';

// Commons
import PanelContainer, { TitlePanelContainerAlt } from 'App/_commons/elements/PanelContainer';
import NoContent from 'App/_commons/elements/NoContent';

//
const ItemNote = props => {
  const { classes,
    title = "Title",
    date = "Dicembre 20, 2018",
    hour = "00:00 hrs",
    body = <NoContent />
  } = props;

  return (<PanelContainer style={{marginBottom: 13, paddingTop: 15, paddingBottom: 20}}>
    <TitlePanelContainerAlt className={classes.itemNoteTitle}>{title}</TitlePanelContainerAlt>
    <span className={classes.itemNoteDate}>{date}</span>
    <span className={classes.itemNoteHour}>{hour}</span>
    <div className={classes.itemNoteBody}>{body}</div>
    </PanelContainer>)
}

export default ItemNote;
