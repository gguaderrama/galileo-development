import { amber700, green600 } from "material-ui/styles/colors";

export const styles = theme => ({
    divTitleFlex: {
        display: 'flex',
        alignItems: 'center'
    },
    divContainer: {
        margin: 20
    },
    divButttonContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        margin: theme.spacing.unit,
    },
    snackbarWarning: {
        //backgroundColor: '#FFD703'
        backgroundColor: amber700
    },
    snackbarError: {
        //backgroundColor: '#FF4139'
        backgroundColor: theme.palette.error.dark
    },
    snackbarInformation: {
        //backgroundColor: '#6583D5'
        backgroundColor: theme.palette.primary.dark
    },
    snackbarSuccess: {
        //backgroundColor: '#38DE4E'
        backgroundColor: green600
    },
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }
});