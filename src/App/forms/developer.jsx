import React from 'react'
import { connect } from 'react-redux'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'

import { saveDeveloper } from '../actions/developerActions'

const useStyles = makeStyles((theme) => ({
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}))

function Developer(props) {
  const classes = useStyles()

  function onSubmit(event) {
    const formData = new FormData(event.currentTarget);
    event.preventDefault();
    let data = {}
    for (let [key, value] of formData.entries()) {
      data[key] = value
    }
    props.dispatch(saveDeveloper(data))
  }

  return (
    <div>
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
        Desarrolladores
      </Typography>
      <form className={classes.form} onSubmit={onSubmit} >
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email"
          name="email"
          autoComplete="email"
          autoFocus
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Crear
        </Button>
      </form>
    </div>
  )
}

export default connect()(Developer)