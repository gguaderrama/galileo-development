const DIALOG_NOTIFICATION_MODAL = Object.freeze({
  INITIAL_STATE: {
    opened: false,
    title: '',
    icon: '',
    iconColor: 'primary',
    content: '',
    subcontent: '',
    isLoadingDialog: true,
    flag: false
  },
  LOADING_STATE: {
    opened: true,
    title: 'Obteniendo Información',
    icon: 'info',
    iconColor: 'primary',
    content: 'Cargando Datos...',
    subcontent: 'Espere un momento, sea paciente...',
    isLoadingDialog: true,
    flag: false
  }
});

export default DIALOG_NOTIFICATION_MODAL;
