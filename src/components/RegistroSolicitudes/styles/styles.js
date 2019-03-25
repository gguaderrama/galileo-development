export const registroStyle = theme => ({

    containerTitle: {
        fontSize: '25px',
        marginLeft: '140px',
        marginRight: '163px',
    },
    title: {
        fontSize: '14px'
    },
    icon: {
        fontSize: '4px'
    },
    containerBusqueda: {
        width: '1400px',
        height: '154px',
        marginLeft: '141px',
        marginRight: '140px',
    },
    divZonaAutorizadaDomicilio: {
        marginLeft: '55px',
        marginRight: '20px',
        marginTop: '31px'
    },
    containerCaptura: {
        textAlign: 'center',
        width: '100%',
        height: '154px',
    },
    containerZonaAutorizadaDomicilio: {
        width: '627px',
        height: '138px',
    },

    resultado: {
        padding: '30px',
        marginTop: '30px'

    },
    tableRow: {
        cursor: 'pointer',
    },
    textFieldBusqueda: {
        margin: theme.spacing.unit,
        width: 200,
        marginLeft: theme.spacing.unit * 8
    },
    radioSexo: {
        marginLeft: theme.spacing.unit * 4
    },
    textFieldDatosDomicilio: {
        width: 175,
        marginLeft: theme.spacing.unit * 4
    },
    textFieldDatosDomicilio2: {
        width: 110,
        marginLeft: theme.spacing.unit * 4
    },
    textFieldDatosDomicilio3: {
        width: 200,
        marginLeft: theme.spacing.unit * 4
    },
    btnsBusqueda: {
        position: 'absolute',
        bottom: theme.spacing.unit * 2,
        right: theme.spacing.unit * 2,
    },
    btnNext: {
        left: '1450px',
        top: '890px',
        position: 'absolute'
    },
    btnUpdate: {
        position: 'absolute',
        bottom: '35px',
        right: '55px',
    },
    btnDomicilios: {
        position: 'absolute',
        right: '55px',
        bottom: '155px'
    },

    integrantes: {
        position: 'absolute',
    },
    btnsGe: {
        marginTop: '25px',
        margin: theme.spacing.unit
    },

    btnsBusquedaL: {
        position: 'absolute',
        bottom: theme.spacing.unit * 2,
        right: theme.spacing.unit * 15,
    },

    btnsFolio: {
        marginTop: theme.spacing.unit * 5,
        bottom: theme.spacing.unit * 2,
        left: theme.spacing.unit * 18,
    },
    btnsLimpiar: {
        position: 'absolute',
        top: theme.spacing.unit * 2,
        marginTop: theme.spacing.unit * 8
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing.unit,
        top: theme.spacing.unit,
        color: 'primary',
    },
    deleteSeguros: {
        position: 'static',
        marginLeft: '280px'
    },
    tableCell: {
        textAlign: 'center',
        padding: 10
    },
    textFields: {
        margin: theme.spacing.unit,
        width: 250,
        marginLeft: theme.spacing.unit * 5,

    },
    textFieldsDatosPersonales: {
        width: 190,
        marginLeft: 18,

    },
    textFieldsDatosCredito: {
        margin: theme.spacing.unit * 2,
        width: 200,
        marginLeft: theme.spacing.unit * 3,
        marginTop: '10px'

    },
    vendedorCorresponsal: {
        margin: theme.spacing.unit * 2,
        width: 300,
        marginLeft: theme.spacing.unit * 3,
        marginTop: '10px'

    },

    encabezadoCalculoCredito: {
        margin: theme.spacing.unit,
        color: '#233A79',
        textAlign: 'center'
    },
    contenido: {
        margin: theme.spacing.unit,
        marginTop: theme.spacing.unit * 2,
        textAlign: 'center'

    },
    textFieldsSeguros: {
        margin: theme.spacing.unit,
        width: 180,
        marginLeft: theme.spacing.unit * 4
    },
    button: {
        marginLeft: theme.spacing.unit,
    },
    instructions: {
        marginTop: theme.spacing.unit,
        marginBottom: theme.spacing.unit,
    },
    button2: {
        padding: '5px',
        paddingTop: '5px',
        marginTop: theme.spacing.unit * 4,
        marginLeft: theme.spacing.unit * 5,
        marginRight: theme.spacing.unit * 8
    },
    formControlStyle: {
        paddingBottom: '35px',
        display: 'inline-block'
    },
    divBtnBusqueda: {
        width: 220,
        paddingTop: '35px'
    },
    datosProductoForm: {
        padding: '24px',
        width: 'calc(98%)',
        minHeight: '40vh',
        display: 'flex'
    },

    titleDatosProd: {
        paddingLeft: '180px',
        paddingTop: '10px'
    },

    paperResultadoBusqueda: {
        padding: '30px',
        width: 'calc(99% - 40px)'
    },
    tableResultadoBusqueda: {
        minWidth: 700
    },
    rootSeguro: {
        flexGrow: 1,
    },
    grow: {
        flexGrow: 1,
    },

    expanded: {
        margin: 'auto'
    },
    zonaAutorizadaContainer: {
        padding: '24px',
        display: 'flex'
    },
    titleZona: {
        paddingLeft: '30px',
        marginBottom: '10px',
        paddingTop: '10px'
    },
    titleZona2: {
        paddingLeft: '30px',
        marginBottom: '10px',
        paddingTop: '10px',
        textAlign: 'center',
        fontSize: '15px'
    },
    datosSolicitudDiv: {
        width: '90%',
        minHeight: '10vh',
        marginLeft: theme.spacing.unit,
        display: 'inline-block',

    },
    tablaPreScoreRoot: {
        width: '100%',
        // marginTop: theme.spacing.unit * 3,
        overflow: 'auto',
        maxHeight: '40vh'

    },
    btnsPrescore: {
        textAlign: 'center',
        padding: '30px',
        marginLeft: theme.spacing.unit,
    },
    containerCalculoCredito: {
        display: 'flex'
    }

});



export const toolbarStyles = theme => ({
    root: {
        paddingRight: theme.spacing.unit,
    },
    spacer: {
        flex: '1 1 100%',
    },
    actions: {
        color: theme.palette.primary,
    },
    title: {
        flex: '0 auto',
    },
});



export const registroStyles = theme2 => ({
    fieldsFolios: {
        width: 380,
        marginTop: theme2.spacing.unit
    },
    divBtnDialogoFolio: {
        paddingTop: '30px',
        width: 200,
        marginLeft: theme2.spacing.unit * 30
    },

});
