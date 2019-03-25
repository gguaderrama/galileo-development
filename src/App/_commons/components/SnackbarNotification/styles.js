export const styles = theme => ({
  root: {
    //border: 'solid 2px orange',
    margin: 0,
    padding: 0,
  },
  message: {
    margin: 0,
    padding: 0,
    height: 234,
    width: 562,
  },
  buttonAceptar: {
    position: 'absolute',
    bottom: 10,
    right: 15
  },
    divTitleFlex: {
      display: 'flex',
      backgroundColor: '#FFFFFF',
      height: 226,
      width: 562,
      margin: 0,
    },
    divContainer: {
        //margin: 20
    },
    divButttonContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        margin: theme.spacing.unit,
        float: 'left',
        fontSize: '2.2em',
        position: 'relative',
        top: -5,
        paddingRight: 5
    },
    snackbarWarning: {
        backgroundColor: '#FFA000',
    },
    snackbarError: {
        backgroundColor: '#d32f2f',
    },
    snackbarInformation: {
        backgroundColor: theme.palette.primary.dark,
    },
    snackbarSuccess: {
        backgroundColor: '#43A047',
    },

    warning: {color: '#FFA000'},
    error: {color: '#d32f2f'},
    success: {color: '#43A047'},
    information: {color: theme.palette.primary.dark}
});
