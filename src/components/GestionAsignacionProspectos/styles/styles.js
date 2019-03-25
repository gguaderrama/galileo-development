export const styles = theme => ({
    tableCellHeader: {
        textAlign: 'center',
        padding: 5,
        position: 'sticky'
    },
    tableCell: {
        textAlign: 'center',
        padding: 5
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing.unit,
        top: theme.spacing.unit,
        color: 'inherit',
    },
    button: {
        margin: theme.spacing.unit,
    },
    divButtonContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 200
    },
    formControlExtended: {
        margin: theme.spacing.unit,
        minWidth: 420
    }
});