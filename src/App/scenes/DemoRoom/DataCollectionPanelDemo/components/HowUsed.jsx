// Dependencies
import React, { Fragment } from 'react';

// _commons
import { SpanBlue, SpanGray, LiSpaceBottom, Pp } from 'App/_commons/elements/usefulSnippets';
import PanelContainer, { TitlePanelContainer } from 'App/_commons/elements/PanelContainer';
import AccordionPanel from 'App/_commons/components/AccordionPanel';

const HowUsed = props => <PanelContainer>
  <TitlePanelContainer>Review</TitlePanelContainer>
  <SpanGray>This Component offers a straightforward way to handle a input form collection exposing methods to handle the data related with these inputs.</SpanGray>
  <p>
    <AccordionPanel itemList={[
      {title: 'Properties', content:
        <Fragment>
          <ul style={{marginTop:0,marginBottom:0}}>
            <LiSpaceBottom><SpanBlue est>requiredList</SpanBlue></LiSpaceBottom>

            <LiSpaceBottom><SpanBlue est>disabledList</SpanBlue></LiSpaceBottom>

            <LiSpaceBottom>
              <SpanBlue est>title [ string ]</SpanBlue>
              <Pp>By default, and of course with a input collection defined (<SpanBlue>viewTemplate</SpanBlue>), don't has title.</Pp>
            </LiSpaceBottom>

            <LiSpaceBottom>
              <SpanBlue est>intoPanelContainer [ true | false ]</SpanBlue>
              <Pp>By default this prop is <SpanBlue>true</SpanBlue>. That means this panel is into a <SpanBlue>PanelContainer</SpanBlue> componet.
              When is <SpanBlue>false</SpanBlue> the background is transparent.</Pp>
            </LiSpaceBottom>

            <LiSpaceBottom>
              <SpanBlue est>viewTemplate [ react.element ]</SpanBlue>
            </LiSpaceBottom>
          </ul>
        </Fragment>
      },
      {title: 'Methods', content:
        <Fragment>
          Here methods...
        </Fragment>
      },
      {title: 'Extras', content:
        <Fragment>
          Here extras...
        </Fragment>
      }
    ]} />
  </p>
</PanelContainer>

export default HowUsed;
