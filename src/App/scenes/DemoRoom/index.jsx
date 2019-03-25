// Dependencies
import React from 'react';

// material-ui
import Link from '@material-ui/core/Link';

// Common Components
import PanelContainer, { TitleMainHead, TitlePanelContainer } from 'App/_commons/elements/PanelContainer';

// data
import { CustomElementsAndComponents } from './listTopics';

// Utils
//import { snakeToCamel, snakeToPascal, camelToPascal, camelToSake, pascalToCamel, pascalToSnake } from 'utils/misc';

// Tmp
//import TextFieldDecored from 'App/_commons/elements/TextFieldDecored';
//import SelectDecored from 'App/_commons/elements/SelectDecored';
//import CheckboxGroup from 'App/_commons/components/CheckboxGroup';

const DemoRoom = props =>
  <div className="milcuatrocientos">
    <TitleMainHead>Elements & Componets Demo Room</TitleMainHead>
    <PanelContainer>

      <TitlePanelContainer>Main project structure</TitlePanelContainer>
      <PanelContainer>
        Topic list ...no ready yet!<br />
      </PanelContainer>

      <TitlePanelContainer>Custom Elements and Components</TitlePanelContainer>
      <PanelContainer>
        <ul style={{listStyleType: 'georgian', marginTop:0}}>
          { CustomElementsAndComponents.sort((a, b) => a.title < b.title).map(item => <li><Link href={item.link}>{item.title}</Link></li>) }
        </ul>
      </PanelContainer>

      <TitlePanelContainer>Utils</TitlePanelContainer>
      <PanelContainer>
        Topic list ...no ready yet!
        {/*
          {snakeToCamel('snake-to-camel-please')}<br />
          {snakeToPascal('snake-to-pascal-please')}<br />
          {camelToPascal('camelToPascalPlease')}<br />
          {camelToSake('camelToSnakePlease')}<br />
          {pascalToCamel('PascalToCamelPlease')}<br />
          {pascalToSnake('PascalToSnakePlease')}<br />
        */}
      </PanelContainer>

      {/*<TitlePanelContainer>Custom elements -> <pre style={{display:'inline', color: 'blue'}}>TextFieldDecored</pre></TitlePanelContainer>
      <PanelContainer style={{display: 'flex', justifyContent: 'space-between'}}>
        <TextFieldDecored />
        <TextFieldDecored required />
        <TextFieldDecored disabled />
        <TextFieldDecored type="date" />
        <TextFieldDecored variant='filled' />
        <TextFieldDecored variant='filled' type="date" />
      </PanelContainer>

      <TitlePanelContainer>Custom elements -> <pre style={{display:'inline', color: 'blue'}}>SelectDecored</pre></TitlePanelContainer>
      <PanelContainer style={{display: 'flex', justifyContent: 'space-evenly'}}>
        <SelectDecored style={{width:200}} />
        <SelectDecored style={{width:200}} onEmptyMsg="itemList needed" inputLabelTitle="Select label" />
        <SelectDecored style={{width:200}} inputLabelTitle="Select label" renderValue="renderValue" itemList={[{key:1,name:'one'},{key:2,name:'two'},{key:3,name:'three'}]}/>
      </PanelContainer>

      <TitlePanelContainer>Custom elements -> <pre style={{display:'inline', color: 'blue'}}>CheckboxGroup</pre></TitlePanelContainer>
      <PanelContainer style={{display: 'flex', justifyContent: 'space-evenly'}}>
        <CheckboxGroup />
        <CheckboxGroup checkboxList={[{label:'one', valuetext: 'one'},{label:'two', valuetext: 'two'},{label:'three', valuetext: 'three'}]}/>
        <CheckboxGroup checkboxList={[{label:'one', valuetext: 'one'},{label:'two', valuetext: 'two'},{label:'three', valuetext: 'three'}]} suited="colum"/>
      </PanelContainer>*/}

    </PanelContainer>
  </div>

export default DemoRoom;
