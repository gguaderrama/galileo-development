import React from 'react';
import { stepsCaptura } from 'constants/captura';
import Grid from '@material-ui/core/Grid';
import SteperAlt from 'components/Generic/SteperAlt';
import MenuMapaComponent from 'components/captura/MenuMapaComponent';

export const SteperTemplate = () => {
  return (
    <div  style={{ marginLeft: -70 + 'px', marginBottom: -50 + 'px' }} >
      <Grid container spacing={8}>
        <Grid item xs={9}>
          <SteperAlt opciones={stepsCaptura}
            opcionActiva={0}
            nonLinear={false}
            handleOnChange={null}
            enableContinuar={false}
            titulo={'Captura de solicitud'}>
          </SteperAlt>
        </Grid>
        <Grid item xs={3} container
          direction="row"
          justify="flex-end"
          alignItems="center">
          <Grid item >
            <MenuMapaComponent handleOpenVisorExpedientes={true} />
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}