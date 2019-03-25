// Dependencies
import React from 'react';

// _commons
import PanelContainer from 'App/_commons/elements/PanelContainer';

//
import NotesPanelDemo from './NotesPanelDemo';
import TabsPanelDemo from './TabsPanelDemo';
import DialogNotificationModalDemo from './DialogNotificationModalDemo';
import DataCollectionPanelDemo from './DataCollectionPanelDemo';

const allComponents = {
  NotesPanelDemo,
  TabsPanelDemo,
  DialogNotificationModalDemo,
  DataCollectionPanelDemo,
};

const DemoRoomTopic = props=> {
  const tagName = `${props.whichTopic}Demo`;
  const TagName = allComponents[tagName];
  // Render
  if (!TagName)
    return <PanelContainer><pre>{`${tagName} no defined yet`}</pre></PanelContainer>
  return <TagName {...props} />
}

export default DemoRoomTopic;
