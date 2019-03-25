import React from 'react';
//
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

// utils
//import { childrenIterator } from 'utils/misc';

const TableBodyContent = props => {
  const { classes={tableCell:'', tableRow:'', tableBody:''}, classesOverride={tableBody:null} } = props;
  const { columsData=[], rowData=[], rowTemplate:RowTemplate=null/*, children = null*/ } = props.data;
  const { handleRowChange, rowClickDisabled } = props;

  //const nodeTransformRules = iNode => {
  //  //const filtered = Object.keys(inputsSetting).filter(i => beginsWith(iNode.props.valuetext, i))
  //  return {...iNode.props, classes:{...classes}};
  //  //return iNode;
  //};

  // Transform 'content' to add inherit props
  //const _rowTemplate = children || RowTemplate;
  //const RowTemplate_ = _rowTemplate && React.isValidElement(_rowTemplate(props))
  //  ? childrenIterator(_rowTemplate(props).children, nodeTransformRules)
  //  : _rowTemplate;

  // Render
  return <TableBody className={classes.tableBody} style={classesOverride.tableBody && {...classesOverride.tableBody}}>
      { rowData.map((rowItem, idx) => !RowTemplate
        ? <TableRow hover={true}
          className={classes.tableRow}
          key={idx}
          onClick={!rowClickDisabled ? handleRowChange && (() => handleRowChange(rowItem)) : null} >
            { columsData.map( i => {
              const CellComponent = i.component || null;
              if (CellComponent && typeof(CellComponent) === 'function')
                return <CellComponent key={i.key} rowId={idx} className={classes.tableCell} handleRowChange={rowClickDisabled ? handleRowChange : null}>
                  { typeof(rowItem[i.key]) !== 'object' ? rowItem[i.key] : <pre style={{color:'blue'}}>OBJECT</pre> }
                </CellComponent>
              return <TableCell key={i.key} className={classes.tableCell}>
                { typeof(rowItem[i.key]) !== 'object' ? rowItem[i.key] : <pre style={{color:'blue'}}>OBJECT</pre> }
              </TableCell>
            }) }
          </TableRow>
        : <RowTemplate
            key={rowItem.persona}
            {...rowItem}
            {...props} />
        )}
    </TableBody>
}

export default TableBodyContent;
