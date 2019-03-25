/* eslint-disable import/first */
// Dependencies
import React from 'react';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles } from '@material-ui/core/styles';

// Commons elements
import PanelContainer, { TitlePanelContainer } from 'App/_commons/elements/PanelContainer';
import { ButtonOriginPrimary } from 'App/_commons/elements/ButtonsFeature';
import NoContent from 'App/_commons/elements/NoContent';

// Styles
import { styles } from './styles';

// utils
import { childrenIterator, beginsWith } from 'utils/misc';

// BUSINESS WRAPPER
import businessWrapper from './businessWrapper';

// Main component
const SearchPanel_ = props => {
  const { classes,
    content = <NoContent>
        No content template defined.
        You need included into <u>'content'</u> prop or as a children
      </NoContent>,
    onSearch = e => console.log("Into SearchPanel [onSearch]>", e),
    onClean = e => console.log("Into SearchPanel [onClean]>", e),
    children = null,
    submitDisabled = false,
    title = "Busqueda",
    intoPanelContainer = true,

    // Input settings from businessWrapper
    inputsSetting,
  } = props;

  const nodeTransformRules = iNode => {
    const filtered = Object.keys(inputsSetting).filter(i => beginsWith(iNode.props.valuetext, i))
    return {...iNode.props, ...props.inputsSetting[filtered[0]], classes:{...classes}};
  };

  // Transform 'content' to add inherit props
  const template = children || content;
  const templateTransform = React.isValidElement(template)
  ? React.Children.map(template.type().props.children, Itm => {
      if(!React.isValidElement(Itm)){ return Itm };
      const childrenOfMine = childrenIterator(Itm.props.children, nodeTransformRules);
      const ItmProps = {...Itm.props, children: childrenOfMine};
      return {...Itm, props:ItmProps};
  }) : template;

  const innerRender = <div>
    <TitlePanelContainer>{title}</TitlePanelContainer>
    { templateTransform }
    <div className={classes.divButttonContainer}>
      <Tooltip title="Limpiar filtros de busqueda">
        <Button color="primary" className={classes.button} onClick={onClean}>
          Limpiar
        </Button>
      </Tooltip>
      <Tooltip title="Realizar consulta con filtros seleccionados">
        <ButtonOriginPrimary className={classes.button} onClick={onSearch} disabled={submitDisabled}>
          Consultar
        </ButtonOriginPrimary>
      </Tooltip>
    </div>
  </div>

  // Render
  if (intoPanelContainer)
    return (
      <div className={classes.divContainer}>
        <PanelContainer>
          {innerRender}
        </PanelContainer>
      </div>
    );

  return <div className={classes.divContainer}>{innerRender}</div>
}

const SearchPanel = businessWrapper(SearchPanel_);

export default withStyles(styles)(SearchPanel);
