// Dependencies
import React, { Fragment } from 'react';

// Commons
import { TitlePanelContainerAlt } from 'App/_commons/elements/PanelContainer';
import RadiobuttonGroup from 'App/_commons/components/RadiobuttonGroup';
import TextFieldDecored from 'App/_commons/elements/TextFieldDecored';
import SelectDecored from 'App/_commons/elements/SelectDecored';

//
const DemoTemplate = props => <Fragment>
  <TitlePanelContainerAlt>HTML raw form elements</TitlePanelContainerAlt>
  <br />
  <div style={{display:'flex', justifyContent: 'space-between'}}>
    {/*<span>
      <input type="radio" name="gender" value="male" /> Male<br />
      <input type="radio" name="gender" value="female" /> Female<br />
      <input type="radio" name="gender" value="other" /> Other
    </span>*/}
    <span><input type="text" name="FirstName" valuetext="FirstName"/></span>
    {/*<span><select name="cars" valuetext="cars" selectlist="naves" /></span>*/}
    <span><textarea name="message" valuetext="message" rows="5" cols="30"/></span>
  </div>
  <br />
  <TitlePanelContainerAlt>Custom inputs</TitlePanelContainerAlt>
  <div style={{display:'flex', justifyContent: 'space-between'}}>
    <TextFieldDecored style={{margin:'0 10px', flexGrow:1, marginLeft:0}} valuetext="nombre" label="Nombre(s)" />
    <TextFieldDecored style={{margin:'0 10px', flexGrow:1}} valuetext="nickname" label="Apodo" />
    <TextFieldDecored style={{margin:'0 10px', flexGrow:1}} valuetext="oldNickname" label="Apodo de niño" />
    <SelectDecored style={{margin:'0 10px', flexGrow:1, width: '16%'}} valuetext="status" selectlist="statusList" keys="theKey theName" label="Estado de humor" />
    <RadiobuttonGroup style={{margin:'0 10px', flexShrink:1, marginRight:0}} valuetext="sexo" name="sexo" label="Género"
      radioList={[{label:'Masculino', valuetext: 'M'}, {label:'Femenino', valuetext: 'F'}]} />
  </div>
</Fragment>

export default DemoTemplate;

export const statusList = [
  {theKey: 'C', theName: 'Contento'},
  {theKey: 'T', theName: 'Triste'},
  {theKey: 'E', theName: 'Enojado'},
  {theKey: 'A', theName: 'Aburrido'},
];
