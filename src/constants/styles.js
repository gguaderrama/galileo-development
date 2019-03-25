import { createMuiTheme } from '@material-ui/core/styles';
import { lighten } from '@material-ui/core/styles/colorManipulator';

export const theme = createMuiTheme({
    typography: {
        useNextVariants: true,
    },
    palette: {
        primary: {
            main: '#233A79',
            light: '#6F7EA7',
            contrastText: '#ffffff'
        },
        secondary: {
            light: '#ffeee5',
            main: '#ff6e24',
            // dark: will be calculated from palette.secondary.main,
            contrastText: '#000000',
        },
        // error: will use the default color
    },
    overrides: {
        MuiStepLabel: { // Name of the component ⚛️ / style sheet
            root: {
                color: '#ff6e24',
                disabled: {
                    color: '#919191,100%',
                }
            },
            alternativeLabel: {

            }
        },
        MuiPaper: {
            elevation0: {
                //marginTop: '16px',
            }
        },
        MuiSelect: {
            root: {
                color: '#233A79'
            },

        },
        MuiInputLabel: {
            root: {
                color: '#414141, 100%',
                disabled: {
                    color: 'rgba(0, 0, 0, 0.38)'
                }
            }
        },
        MuiTypography: {
            h6: {
                fontSize: 20
            }
        },
        MuiMenuItem: {
            root: {
                color: '#233A79'
            }
        },
        MuiTableCell: {
            root: {
                padding: 0,
                align: 'center'
            },
            head: {
                color: '#233A79',
            },
            body: {
                color: '#414141,100%',

            },
        },
    },
});

export const stylesTabla = theme => ({
    root: {
        width: '100%',
        //marginTop: theme.spacing.unit * 3,
    },
    rootnon: {
        width: '100%',
        backgroundColor: 'rgba(35, 58, 121, 0.1)',
    },
    rootpar: {
        width: '100%',
        backgroundColor: 'rgba(157, 157, 157, 0.17)',
    },
    table: {
        minWidth: 800,
    },
    tableWrapper: {
        overflowX: 'auto',
    },
});
export const STYLES = theme => ({
    root: {
        display: 'flex',
        paddingRight: theme.spacing.unit,
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 250,
    },
    formControlSeguros: {
        marginLeft: 18,
        width: 228
    },
    formControlCredito: {
        marginLeft: 18,
        width: 190,
    },
    group: {
        margin: `${theme.spacing.unit}px 0`,
    },
    textField: {
        marginLeft: 18,
        width: 190
    },
    textFieldSeguros: {
        marginLeft: 18,
        width: 228
    },
    textField350: {
        marginLeft: 18,
        width: 400
    },
    textField150: {
        margin: theme.spacing.unit,
        width: 150
    },
    textFieldDisabled: {
        display: 'none'
    },
    selectEmpty: {
        marginTop: theme.spacing.unit * 2,
    },
    btnNext: {
        position: 'absolute',
        bottom: '35px',
        right: '59px',
    },
    button: {
        margin: theme.spacing.unit,
    },
    highlight:
        theme.palette.type === 'light'
            ? {
                color: theme.palette.secondary.main,
                backgroundColor: lighten(theme.palette.secondary.light, 0.85),
            }
            : {
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.secondary.dark,
            },
    segurovidanon: {
        backgroundColor: 'rgba(35, 58, 121, 0.1)',
    },
    segurovidapar: {
        backgroundColor: 'rgba(157, 157, 157, 0.17)',
    },
    spacer: {
        flex: '1 1 100%',
    },
    actions: {
        color: theme.palette.text.secondary,
    },
    title: {
        flex: '0 0 auto',
    },
    paperGenerales: {
        marginBottom: 29.72,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    rootSeguro: {
        flexGrow: 1,
    },
    grow: {
        flexGrow: 1,
    },
});


export const theme2 = createMuiTheme({
    typography: {
        useNextVariants: true,
    },

    palette: {
        primary: {
            main: '#233A79',
            light: '#6F7EA7',
            contrastText: '#ffffff'
        },
        secondary: {
            light: '#ffeee5',
            main: '#ff6e24',
            contrastText: '#000000',
        },

    },
    overrides: {
        MuiDialog: {
            paper: {
                width: '469.05px',
                height: '312.61px',
                marginLeft: '164px',
                marginRight: '163.2px'
            }
        }, MuiStepper: {
            root: {
                //backgroundColor: '#FAFAFA',
                //width: '1352.8px',
                backgroundColor: '#ebe9e026',
                height: '43px',

            }
        }, MuiListItem: {
            "&$selected": {
                backgroundColor: '#233A79'
            }
        }
    },
});
