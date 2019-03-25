export const styles = theme => ({
    divTitleFlex: {
        display: 'flex',
        alignItems: 'center'
    },
    divContainer: {
        //margin: 20
        marginBottom: 20
    },
    divContainerLoading: {
      backgroundColor: '#11FFEE00',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height:'100%',
      border: 0,
    },
    divLoadingSpiner: {
      display: 'flex',
      justifyContent: 'center',
      marginBottom: 25,
    },
    divLoadingText: {
      fontSize: '1.25em'
    },
    divButttonContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    button: {
      margin: theme.spacing.unit,
    },
    errorButton: {
      backgroundColor: 'red'
    }
});