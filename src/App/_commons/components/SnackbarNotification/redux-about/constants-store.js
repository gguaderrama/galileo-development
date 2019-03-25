const SNACKBAR_NOTIFICATION = Object.freeze({
  INITIAL_STATE: {
    opened: false,
    verticalPosition: "top",
    horizontalPosition: "right",
    duration: 2000,
    icon: "",
    message: "",
    type: "",
    onClose: null,
  }
});

export default SNACKBAR_NOTIFICATION;
