import React, { Fragment } from 'react';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import CustomTableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { styles } from './styles';
import { withStyles } from '@material-ui/core/styles';

// Commons
import PanelContainer, { TitlePanelContainer, NoResultRowTable } from 'App/_commons/elements/PanelContainer';

// Owns
import TableBodyContent from './TableBodyContent';

const ResultTablePanel = props => {
  const { classes={divContainer:'', tableCell:'', tableCellHead:''}, classesOverride } = props;
  const { title = null, rowData=null, rowTemplate=null, rowClickDisabled=false, intoPanelContainer = true,
    columsData=[{key:0, label:'No columData defined'}],
    emptyRowDataMsg = 'No results found', initRowDataMsg = null  } = props;
  const { handleRowChange = event => console.log('handleRowChange into ResultTablePanel', event) } = props;
  //const { handlePageChange = event => console.log('handlePageChange into ResultTablePanel', event) } = props;

  const TableCell = withStyles(theme => ({
    head: {
      borderTop: '1px solid #ededed'
    },
    body: {
      fontSize: 14,
    },
  }))(CustomTableCell);

  const innerRender = <Fragment>
    { title && React.isValidElement(title)
      ? title
      : title && <TitlePanelContainer>{title}</TitlePanelContainer> }
    <Fragment>
      <Table>
        <TableHead>
          <TableRow>
            {columsData.map(column =>
              column && <TableCell className={classes.tableCellHead} style={{width: column.width || null}} key={column.key}>{column.label}</TableCell>
            )}
          </TableRow>
        </TableHead>

        { rowData ? rowData.length > 0 ?
            <TableBodyContent
              data={{rowData, columsData, rowTemplate}}
              handleRowChange={handleRowChange}
              rowClickDisabled={rowClickDisabled}
              classes={classes}
              classesOverride={classesOverride} />
            : null
          : null
        }
      </Table>

      {/* <TablePagination
        component="div"
        count={rowData.length}
        rowsPerPage={5}
        rowsPerPageOptions={[]}
        page={rowData.length / 5 < 0 ? rowData.length / 5 : 0}
        backIconButtonProps={{'aria-label': 'Previous Page'}}
        nextIconButtonProps={{'aria-label': 'Next Page'}}
        onChangePage={handlePageChange} /> */}

      { rowData ? rowData.length > 0 ? null
          : <NoResultRowTable>{emptyRowDataMsg}</NoResultRowTable>
        : null
      }
      { !rowData && initRowDataMsg && <NoResultRowTable>{initRowDataMsg}</NoResultRowTable> }
    </Fragment>
  </Fragment>

  // Render
  if (intoPanelContainer)
    return (
      <Fragment>
        <PanelContainer>
          {innerRender}
        </PanelContainer>
      </Fragment>
    );

  return <Fragment>{innerRender}</Fragment>
}

export default withStyles(styles)(ResultTablePanel);
