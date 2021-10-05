import React, { useState } from 'react'
import { connect } from 'react-redux'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'

import { buildMicroAppBundle } from '../actions/microAppBundleActions'
import MicroAppField from './fields/MicroAppField'
import BranchField from './fields/BranchField'

const useStyles = makeStyles((theme) => ({
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}))

function MicroAppBundle(props) {
  const classes = useStyles()
  
  const [state, setState] = useState({})

  const handleState = (data) => {
    let newState = {...state}
    newState[data.name] = data.value
    setState(newState)
  }

  const handleField = (event) => {
    let newState = {...state}
    newState[event.target.name] = event.target.value
    setState(newState)
  }

  function onSubmit(event) {
    const formData = new FormData(event.currentTarget);
    event.preventDefault();
    let data = { ...state }
    data['microAppId'] = data['microAppId']['value']
    data['branch'] = data['branch']['value'] 
    for (let [key, value] of formData.entries()) {
      data[key] = value
    }
    props.dispatch(buildMicroAppBundle(data))
  }

  return (
    <div>
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
        Mi MicroApp
      </Typography>
      <form className={classes.form} onSubmit={onSubmit} >

        <MicroAppField value={state.microAppId ? state.microAppId : ''}  onChange={handleState} />
        {
          state['microAppId'] ? 
            <BranchField value={state.branch ? state.branch : ''} microAppId={state['microAppId'].value} onChange={handleState} /> : 
            null
          
        }
        {
          state['microAppId'] ? 
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="commit"
              label="Commit"
              name="commit"
              autoComplete="commit"
              value={state.commit ? state.commit : ''}
              onChange={handleField}
            /> : 
            null
        }
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Construir
        </Button>
      </form>
    </div>
  )
}

export default connect()(MicroAppBundle)