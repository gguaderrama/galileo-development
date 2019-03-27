export const styles = theme => ({
  closeButton: {
    position: 'absolute',
    top: 18,
    right: 10,
  },
  formControl: {
    margin: theme.spacing.unit,
    width: '23.2%',
  },
  'input-label': {
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    width: '100%',
    color: 'red'
  },
  'input': {
    '&::placeholder': {
      textOverflow: 'ellipsis !important',
      color: 'blue'
    }
  }
})
