import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Button, Dialog } from '@material-ui/core';
import { registroStyle } from './styles/styles';

const loadImage = (index) => {
  const { DW_RIGHTObject } = this.props;
  let { DWObject } = this.props;
  DWObject.CopyToClipboard(index); //Copy the image you just clicked on
  DW_RIGHTObject.LoadDibFromClipboard(); //Load the same image
}

const Right_Dynamsoft_OnMouseClick = (index) => {
    const { DWObject, DW_RIGHTObject } = this.props;
    console.log("imagen a cargar del buffer de las miniaturas " + index);
    DW_RIGHTObject.CopyToClipboard(index); //Copy the image you just clicked on
    DWObject.LoadDibFromClipboard(); //Load the same image
}

const loadLocalImage = () => {
    let { DWObject, DW_RIGHTObject } = this.props;
    console.log("Entro a cargar imagen con dialogo..");
    if (!DWObject) {
        DWObject = window.Dynamsoft.WebTwainEnv.GetWebTwain('dwtcontrolContainer');
        DW_RIGHTObject = window.Dynamsoft.WebTwainEnv.GetWebTwain('dwtcontrolContainerMiniatures');
    }

    if (DWObject) {
        // inicia la configuracion del escaner
        //initConfigurationScanner();

        DWObject.ProductKey = "5D97D438291D4BF53B644CA21912DB05EBFB3766DDFA168C22CAE23D1A1A7F4410000000";

        DWObject.SetViewMode(1, 1);
        DWObject.MaxImagesInBuffer = 1;
        DW_RIGHTObject.SetViewMode(1, 3);
        DW_RIGHTObject.IfAllowLocalCache = true;
        DWObject.IfAllowLocalCache = true;

        DWObject.CloseSourceManager();
        DWObject.CloseSource();

        //DWObject.OpenSource();
        DWObject.IfShowUI = false; // muestra interfaz = false
        // funcionalidad de fulduplex comentada se cambia a false
        DWObject.IfDuplexEnabled = false;
        DWObject.PageSize = 0;  // 4 es tamaño oficio//1;carta
        DWObject.IfAutomaticBorderDetection = true;
        DWObject.PixelType = 2;  // RGB a color
        DWObject.Resolution = 140;// 150
        DWObject.VScrollBar = false;
        DWObject.IfShowIndicator = false; // no mostrar progreso de escaneo
        DWObject.PixelFlavor = 0;// 1 / 0

        DWObject.RegisterEvent("OnPostTransfer", loadImage);
        DW_RIGHTObject.RegisterEvent("OnMouseClick", Right_Dynamsoft_OnMouseClick);

        // por si se requiere que se vayan concatenando se ira realizando
        // desde las miniaturas
        DWObject.RemoveAllImages();

        DW_RIGHTObject.IfShowFileDialog = true;
        //DW_RIGHTObject.LoadImageEx('', EnumDWT_ImageType.IT_ALL,onSuccess, onFailure);
        DW_RIGHTObject.LoadImageEx(
            '',
            5,
            () => {
                console.log("success carga de imagen en visor.");
                DW_RIGHTObject.CopyToClipboard(0); // Copy the image you just clicked on
                DWObject.LoadDibFromClipboard(); // Load the same image

                DW_RIGHTObject.IfShowFileDialog = false;
                DWObject.IfShowFileDialog = false;
            },
            (errorCode, errorString) => {
                console.error("errorCode   : " + errorCode);
                console.error("errorString : " + errorString);
            });
    }
}

const cleanVisor = () => {
    const { DWObject, DW_RIGHTObject } = this.props;
    //var botonDigitalizar = Ext.ComponentQuery.query('digitalizacionform button[name=digitalizar]')[0];
    // var botonGuardar = Ext.ComponentQuery.query('digitalizacionform
    // button[name=guardarImagen]')[0];
    //var botonTerminar	 = Ext.ComponentQuery.query('digitalizacionform button[name=finalizar]')[0];
    //var botonCancelar 	 = Ext.ComponentQuery.query('digitalizacionform button[name=cancelar]')[0];

    //botonDigitalizar.setDisabled(false);
    // botonGuardar.setDisabled(true);
    //botonTerminar.setDisabled(true);
    //botonCancelar.setDisabled(false);

    // se limpian las imagenes tanto de las miniaturas como la central.
    DWObject.RemoveAllImages();
    DW_RIGHTObject.RemoveAllImages();
    //A = 0;
}

const digitalizarImg = () => {
    const { DWObject, DW_RIGHTObject } = this.props;
    //console.log("iFrameWin");
    //console.log(iFrameWin);

    //DWObject       = iFrameWin.DWObject;
    //DW_RIGHTObject = iFrameWin.DW_RIGHTObject;

    DW_RIGHTObject.IfShowFileDialog = false;
    DWObject.IfShowFileDialog = false;

    console.log("Invocando escaneo...");
    Simple_AcquireImage();
    console.log("Finaliza Invocando escaneo...");

    //var producto,noVendedor;

    // var parametrosDigitalizacionStore =
    // this.getParametrosDigitalizacionStoreStore();
    // var record = parametrosDigitalizacionStore.getAt(0);
    //
    // console.log("record");
    // console.log(record);



    // console.log("Obteniendo Applet");
    // var applet = document.getElementById('miApplet');
    // applet.asignarParametros(record.get("rutaValijaPreliberacion"),record.get("rutaValijaLiberacion"));
    // console.log("Termino asignar rutas..");



    // document.getElementById('miApplet').asignarParametros(record.get("rutaValijaPreliberacion"),record.get("rutaValijaLiberacion"));
    //
    //
    // this.ocultaPanelTemporalMuestraPanelDigitalizacion();
    //
    // se limpia el visor y el buffer de imagens para que no las mezcle con las de
    // otro integrante.
    // DWObject.RemoveAllImages();
    // DW_RIGHTObject.RemoveAllImages();
    // metodo que invoca el escaner
    // Simple_AcquireImage();
    // A=0;


    // var botonGuardarImagen = Ext.ComponentQuery.query('digitalizacionform
    // button[name=guardarImagen]')[0];
    //	var botonFinalizar 		= Ext.ComponentQuery.query('digitalizacionform button[name=finalizar]')[0];

    // botonGuardarImagen.setDisabled(true);
    //	botonFinalizar.setDisabled(false);

    //	var bcancelar       = Ext.ComponentQuery.query('digitalizacionform button[name=cancelar]')[0];
    //	bcancelar.setDisabled(false);

    // var progress = Ext.create('Ext.ProgressBar', {
    // renderTo : 'formularioForm',
    // width : 10
    // });
    // progress.center();
    // progress.wait( {
    // interval : 15,
    // duration : 150,
    // increment : 10,
    // //text : 'Escaneando...',
    // scope : this,
    // fn : function () {
    //
    // progress.updateText('Listo!');
    //
    // progress.hide(true);
    //
    // //botonGuardarImagen.setDisabled(false);
    //
    // //var botonCancelar = Ext.ComponentQuery.query('digitalizacionform
    // button[name=cancelar]')[0];
    // //botonCancelar.setDisabled(false);
    //
    // //var boton = Ext.ComponentQuery.query('digitalizacionform
    // button[name=guardarImagen]')[0];
    // var bfinalizar = Ext.ComponentQuery.query('digitalizacionform
    // button[name=finalizar]')[0];
    // var bcancelar = Ext.ComponentQuery.query('digitalizacionform
    // button[name=cancelar]')[0];
    // var bdig = Ext.ComponentQuery.query('digitalizacionform
    // button[name=digitalizar]')[0];
    //
    // //boton.setDisabled(true);
    // bfinalizar.setDisabled(false);
    // bcancelar.setDisabled(false);
    // bdig.setDisabled(true);
    //
    // //var botonDigitalizar = Ext.ComponentQuery.query('digitalizacionform
    // button[name=digitalizar]')[0];
    // //botonDigitalizar.setDisabled(true);
    //
    // }
    // });
}

const Simple_AcquireImage = () => {

    const { DWObject, DW_RIGHTObject } = this.props;
    //initConfigurationScanner();
    //let DWObject = DWObject;
    //let DW_RIGHTObject = DW_RIGHTObject;

    DWObject.ProductKey = "5D97D438291D4BF53B644CA21912DB05EBFB3766DDFA168C22CAE23D1A1A7F4410000000";

    DWObject.SetViewMode(1, 1);
    DWObject.MaxImagesInBuffer = 1;
    DW_RIGHTObject.SetViewMode(1, 3);

    DW_RIGHTObject.IfAllowLocalCache = true;
    DWObject.IfAllowLocalCache = true;

    DWObject.CloseSourceManager();
    DWObject.CloseSource();

    DWObject.OpenSource();
    DWObject.IfShowUI = false; // muestra interfaz = false
    DW_RIGHTObject.IfShowUI = false;
    // funcionalidad de fulduplex comentada se cambia a false
    DWObject.IfDuplexEnabled = false;
    DWObject.PageSize = 0;  // 4 es tamaño oficio//1;carta
    DWObject.IfAutomaticBorderDetection = true;
    DWObject.PixelType = 2;  // RGB a color
    DWObject.Resolution = 140;// 150
    DWObject.VScrollBar = false;
    DWObject.IfShowIndicator = false; // no mostrar progreso de escaneo
    DWObject.PixelFlavor = 0;// 1 / 0

    DWObject.AcquireImage();

    // Registrando nuevos eventos del scanner.
    DWObject.RegisterEvent("OnPostTransfer", loadImage);
    // DWObject.RegisterEvent("OnPostAllTransfers", loadImage);
    DW_RIGHTObject.RegisterEvent("OnMouseClick", Right_Dynamsoft_OnMouseClick);

}

const saveImage = () => {
    const { DW_RIGHTObject } = this.props;
    //var session = this.getSessionsStoreStore();
    // Se obtienen los parametros para digitalizacion enviados mediante la URL.
    var empresa = '000100000000';
    var oficina = '254';
    var solicitud = '000080082428';
    var codigoProducto = 'MIDN';
    var noIntegrante = '1';
    var noCliente = '000770001755';
    var randomTamanio = Math.floor((Math.random() * 100) + 1);
    console.log("random generado  [" + randomTamanio + "]");

    /*se asgina el nombre del archivo y se agrega a la lista de archivos que seran movidos por el applet*/
    var imagenConstant = empresa + "_" + oficina + "_" + solicitud + "_" + codigoProducto + "_" + noCliente + "_" + randomTamanio + "_" + noIntegrante + ".pdf";

    //var DW_RIGHTObjectL = DW_RIGHTObject;
    //var DWObjectL = DWObject;

    console.log("Salvando imagen....(1)");

    var rutaActualizada = 'C:/digitalizacion/';

    console.log("valor de ruta actualizada : " + rutaActualizada);

    var rutas;

    // no tiene configuracion proxy correcta
    if (rutaActualizada === '-1') {

        console.log("No cuenta con la configuracion de proxy se toman rutas de drools.");
        //rutas = this.getParametroDigitalizacion("rutaValijaLiberacion").split(",");

    } else {

        console.log("Se toma la ruta actualizada");
        rutas = rutaActualizada.split(",");
    }

    console.log("Rutas");
    console.log(rutas);

    var rutaCoa = null;
    //var rutaCol = null;

    rutaCoa = rutas[0] + imagenConstant;
    //rutaCol = rutas[1]+imagenConstant;

    console.log("Guardando en coa en ruta : " + rutaCoa);
    DW_RIGHTObject.SaveAllAsPDF(rutaCoa, onSuccessCoa, onFailureCoa);
}

/*const onFailureCol = (errorCode, errorString) => {
    console.log("On fails");
    console.log("errorCode   : " + errorCode);
    console.log("errorString : " + errorString);
};*/

const onFailureCoa = (errorCode, errorString) => {
    //const { DWObject, DW_RIGHTObject } = this.props;
    console.log("On fails");
    console.log("errorCode   : " + errorCode);
    console.log("errorString : " + errorString);
};

const onSuccessCoa = () => {
    const { DWObject, DW_RIGHTObject } = this.props;

    console.log("Succes imagen alamcenada En COA");

    DWObject.RemoveAllImages();
    DW_RIGHTObject.RemoveAllImages();

    //var storeParametros  = Array[1];
    //var record           = storeParametros.getAt(0);
    console.log("Record para reactivar con digitalización");
    //console.log(record);
    //var jsonSolicitud         = record.get("jsonSolicitud");
    //var objSolicitud          = Ext.JSON.decode(jsonSolicitud);


    //console.warn("record.get(origen);" + record.get("origen"));

    //if(record.get("origen")!= undefined && record.get("origen") == 'VENTASTELEFONICAS'){
    console.log("entro a setear valores minimos para ventas tel");
    /*var solicitud = {
        oficina 		: objSolicitud.oficina,
        tipoAnalisis 	: objSolicitud.tipoAnalisis,
        codigoProducto 	: objSolicitud.codigoProducto
      };*/
    console.warn("Seteando los datos minimos ");
    /*var modeloBPM = {
        solicitudObject : solicitud
    };*/

    //} else {
    console.log("Se envia el objeto completo d ela solcitud.");
    /*var modeloBPM = {
        solicitudObject : objSolicitud
    };*/

    //}



    console.log("------------------Mi jsonSolicitudBPMModel");
    //console.log(modeloBPM);
    //var jsonModeloBPM = Ext.JSON.encode(modeloBPM);

    /*Ext.Ajax.request({
      url 	: 'rest/solicitud/getModeloBPM',
      method  : 'GET',
      scope	: self,
      headers : {
        'Content-Type' : 'application/json'
      },
      params : {
        "modeloBPM" : jsonModeloBPM
      },
      success : function(response) {
        var data = Ext.decode(response.responseText);
        MODELOBPMDATA = data;
        console.log("respuesta ModeloBPM");
        console.log(MODELOBPMDATA);
        console.log("Invocando el end digitalizacion");
        self.endDigitalization();
      },
      failure : function() {
        Ext.Msg.show({
          title	: 'Error al obtener modeloBPM',
          msg 	: 'Ocurri\u00F3 un error al obtener el modelo para saber destino de reactivaci\u00F3n',
          width 	: 250,
          buttons : Ext.Msg.OK,
          icon 	: Ext.Msg.ERROR
        });
      }
    });*/

}

class DigitalizacionComponent extends Component {
    static propTypes = {
        classes: PropTypes.object,
        DWObject: PropTypes.object.isRequired,
        DW_RIGHTObject: PropTypes.object.isRequired
    }

    componentDidMount() {
        let { DWObject, DW_RIGHTObject } = this.props;
        window.Dynamsoft.WebTwainEnv.Load();
        console.log("DWObject", DWObject)
        console.log("DW_RIGHTObject", DW_RIGHTObject)
        window.Dynamsoft.WebTwainEnv.RegisterEvent('OnWebTwainReady', () => {
            DWObject = window.Dynamsoft.WebTwainEnv.GetWebTwain('dwtcontrolContainer');
            DW_RIGHTObject = window.Dynamsoft.WebTwainEnv.GetWebTwain('dwtcontrolContainerMiniatures');

            DWObject.RemoveAllImages();
            DW_RIGHTObject.RemoveAllImages();
        });
    }

    componentWillUnmount() {
        window.Dynamsoft.WebTwainEnv.Unload();
    }

    render() {
        const { openDigitaliza, handleCloseDigitalizaComponent, DWObject, DW_RIGHTObject } = this.props;
        console.log("DWObject", DWObject)
        console.log("DW_RIGHTObject", DW_RIGHTObject)
        return (
            <Dialog onClose={handleCloseDigitalizaComponent} open={openDigitaliza}>
                <div id="dwtcontrolContainer"></div>
                <div id="dwtcontrolContainerMiniatures"></div>
                <Button variant="contained" color="primary" onClick={digitalizarImg}>
                    Digitalizar
                    </Button>
                <Button variant="contained" color="primary" onClick={loadLocalImage}>
                    Adjuntar Imagen
                    </Button>
                <Button variant="contained" color="primary" onClick={cleanVisor}>
                    Limpiar Visor Imágenes
                    </Button>
                <Button variant="contained" color="primary" onClick={saveImage}>
                    Enviar
                    </Button>
            </Dialog>
        )
    }
}

export default withStyles(registroStyle)(DigitalizacionComponent);
