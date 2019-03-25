import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
import Tooltip from '@material-ui/core/Tooltip';
import { STYLES } from '../../constants/styles';

let EnhancedTableToolbar = props => {
    const { numSelected, classes, handleClickDelete, handleClickAdd, handleClickEdit, selected, maxRows, totalRows, titulo } = props;
    return (
      <Toolbar
        className={classNames(classes.root, {
          [classes.highlight]: numSelected > 0,
        })}
      >
        <div className={classes.title}>
          {numSelected > 0 ? (
            <Typography color="inherit" variant="subtitle1">
              {numSelected} selected
            </Typography>
          ) : (
              <Typography id="tableTitle">
                {titulo}
              </Typography>
            )}
        </div>
        <div className={classes.spacer} />
        <div className={classes.actions}>
          {numSelected > 0 ? (
            <div style={{ display: 'flex' }} >
                <Tooltip title="Eliminar">
                <IconButton aria-label="Eliminar" onClick={handleClickDelete}>
                    <DeleteIcon />
                </IconButton>
                </Tooltip>
                { handleClickEdit && 
                    <Tooltip title="Editar">
                    <IconButton aria-label="Editar" onClick={() => handleClickEdit(selected[0])}>
                        <EditIcon />
                    </IconButton>
                    </Tooltip>
                }
            </div>
            ) : (
                handleClickAdd && (!maxRows || maxRows > totalRows) ?
                <Tooltip title="Agregar">
                    <IconButton aria-label="Agregar" onClick={() => handleClickAdd(null)}>
                        <AddIcon />
                    </IconButton>
                </Tooltip> : <div />
            )}
        </div>
      </Toolbar>
    );
  };
  
  EnhancedTableToolbar.propTypes = {
    classes: PropTypes.object.isRequired,
    numSelected: PropTypes.number,
    maxRows: PropTypes.number,
    totalRows: PropTypes.number,
  };
  
  export default EnhancedTableToolbar = withStyles(STYLES)(EnhancedTableToolbar);