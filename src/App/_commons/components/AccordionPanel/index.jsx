// Dependencies
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
 import ExpansionPanel from '@material-ui/core/ExpansionPanel';
// import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpansionPanelSummaryAdded from '@material-ui/core/ExpansionPanelSummary';
// Commons
import { TitlePanelContainerAlt } from 'App/_commons/elements/PanelContainer';

// Owns
import Demo from './Demo';

// Styles
import styles from './styles';


const ExpansionPanelSummary = withStyles(theme => ({
  root: {
    borderBottom: '1px solid #e8e8e8 !important',
    marginBottom: -1,
    minHeight: 56
  },
  expanded: {
    margin: 'auto',
  },
}))(ExpansionPanelSummaryAdded);


const AccordionPanel = props => {
  const { /*expanded, handleChange=null,*/
    classes, spaceBetween=null, itemList=null, contentList=null, contentPadding=null } = props;

  if(!itemList || itemList.length === 0)
    return <Demo classes={classes} />

  return <div className={classes.divContainer} >
    {itemList.map((item, index) => <ExpansionPanel key={item.name || index}
        style={spaceBetween && {marginBottom:spaceBetween}}
        //expanded={expanded === item.name} onClick={handleChange(item.name)}
        >
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
        { item.title && React.isValidElement(item.title)
          ? item.title
          : item.title && <TitlePanelContainerAlt>{item.title}</TitlePanelContainerAlt> }
      </ExpansionPanelSummary>
      <ExpansionPanelDetails style={{padding:contentPadding}}>
        { contentList ? contentList[index] : item.content || <i style={{color:'blue'}}>No content defined</i> }
      </ExpansionPanelDetails>
    </ExpansionPanel>)}
  </div>
}

/*
const accordionPanelExtended = AttrComponent => {

  return class InnerComponent extends Component {
    constructor(props) {
      super(props);
      this.handleChange = this.handleChange.bind(this);
      this.state = {
        expanded: null
      }
    }

    componentWillReceiveProps(nextProps) {
      console.log('nextProps>', nextProps);
    }

    handleChange(panel) {
      console.log('handleChange>', panel);
      this.setState({expanded:panel});
    }

    render() {
      console.log('RENDER', this.state.expanded);

      if(this.state.expanded)
        return null

      return <AttrComponent {...this.props} {...this.state} handleChange={this.handleChange} />
    }
  }
}
//const AccordionPanelExtended = accordionPanelExtended(AccordionPanel);
*/

export default withStyles(styles)(AccordionPanel);
