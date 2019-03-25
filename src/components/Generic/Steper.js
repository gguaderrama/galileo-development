import React from 'react';
import PropTypes from 'prop-types';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';

import SnackbarNotificacion from './../Generic/SnackbarNotificacion'
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';


//
import { registroStyle } from 'components/RegistroSolicitudes/styles/styles';
import { theme2 } from 'constants/styles';

// _commons
import NoContent from 'App/_commons/elements/NoContent';


const Steper = (props) => {
  const {
    enableContinuar,
    snackbarNotificacion,
    handleCloseSnack,
    openSnackBar,
    handleNext,
    classes,
    opcionActiva,
    titulo,
    nonLinear = false,
    opciones = null,
    handleOnChange = e => console.log('Steper Component > |handleOnChange|', e),
  } = props;

  const handleChange = index => {
    handleOnChange(index);
  }
  return (
    < MuiThemeProvider theme={theme2} >
      <div>
        <div>
          <Typography className={classes.containerTitle} color="primary">{titulo}</Typography>
        </div>
        <div className={titulo === 'Captura de solicitud' ? classes.containerCaptura : classes.containerBusqueda} >
          <Stepper alternativeLabel
            className={!nonLinear ? 'nonlineal' : ''}
            nonLinear={nonLinear}
            activeStep={opcionActiva} >
            {opciones
              ? opciones.map((opcion, index) =>
                <Step
                  key={opcion.nombre}>
                  <StepButton
                    className={classes.title}
                    onClick={() => handleChange(index)}
                    icon={<Icon color={opcion.color} >{opcion.icon}</Icon>}
                    disabled={opcion.disabled}>
                    {opcion.nombre}
                  </StepButton>
                </Step>)
              : <NoContent>Attr - <pre style={{ display: 'inline' }}>opciones</pre> - no definido</NoContent>
            }
          </Stepper>
        </div>

        <div>

          <SnackbarNotificacion
            {...snackbarNotificacion}
            opened={openSnackBar}
            onClose={handleCloseSnack} />

        </div>
        {enableContinuar &&
          <Button color='primary'
            className={classes.btnNext}
            variant='contained'
            onClick={handleNext}> Continuar </Button>
        }
      </div>
    </MuiThemeProvider >
  );
};

Steper.propTypes = {
  classes: PropTypes.object,
  opcionActiva: PropTypes.number,
  opciones: PropTypes.array,
  handleOnChange: PropTypes.func,
  nonLinear: PropTypes.bool.isRequired,
  handleNext: PropTypes.func
};

export default withStyles(registroStyle)(Steper);
