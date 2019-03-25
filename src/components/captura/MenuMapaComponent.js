import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import PaymentIcon from '@material-ui/icons/Payment';
import ImageSearchIcon from '@material-ui/icons/ImageSearch';
import NoteIcon from '@material-ui/icons/Note';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const ITEM_HEIGHT = 48;

class MenuMapaComponent extends React.Component {
  state = {
    anchorEl: null,
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleClickVisorExpedientes = () => {
    this.handleClose();
    this.props.handleOpenVisorExpedientes();
  }

  render() {
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <div>
        <IconButton
          aria-label="More"
          aria-owns={open ? 'long-menu' : undefined}
          aria-haspopup="true"
          onClick={this.handleClick}
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          id="long-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={this.handleClose}
          PaperProps={{
            style: {
              maxHeight: ITEM_HEIGHT * 4.5,
            },
          }}
        >
            <MenuItem onClick={this.handleClose}>
                <ListItemIcon >
                    <NoteIcon color="primary" />
                </ListItemIcon>
                Notas
            </MenuItem>
            <MenuItem onClick={this.handleClickVisorExpedientes}>
                <ListItemIcon >
                    <ImageSearchIcon color="primary"/>
                </ListItemIcon>
                Visor de Expedientes
            </MenuItem>
            <MenuItem onClick={this.handleClose}>
                <ListItemIcon >
                    <PaymentIcon color="primary"/>
                </ListItemIcon>
                Reporte de Buró
            </MenuItem>
        </Menu>
      </div>
    );
  }
}
  
export default MenuMapaComponent;