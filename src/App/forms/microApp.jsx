import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { withRouter } from "react-router"
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'

import api from '../api'
import NodeField from './fields/NodeField'
import ProveedorField from './fields/ProveedorField'

import { saveMicroApp } from '../actions/microAppActions'

const useStyles = makeStyles((theme) => ({
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}))

function MicroApp(props) {
  const classes = useStyles()
  
  const [state, setState] = useState({})
  
  async function getState(id) {
    try {
      const response = await api.getMicroApp(id)
      const data = await response.data
      console.log(data)
      setState(data)
    } catch (e) {
      console.log(e)
    } // finally {
      //setLoadingA(false);
    //}
  }

  useEffect(() => {
    let { match } = props
    let { params } = match ? match : {}
    if (params.id) {
      getState(params.id)
    }
  }, []);

  const handleChange = (data) => {
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
    data['type'] = data['type']['value']
    data['node'] = data['node']['value'] 
    for (let [key, value] of formData.entries()) {
      data[key] = value
    }
    props.dispatch(saveMicroApp(data))
  }

  return (
    <div>
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
        MicroApps
      </Typography>
      <form className={classes.form} onSubmit={onSubmit} >
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="name"
          label="Identificador"
          name="name"
          autoComplete="appName"
          value={state.name ? state.name : ''}
          onChange={handleField}
          autoFocus
          helperText="Identificador de la microaplicación para ser solicitada desde entorno de desarrollo."
        />
        <ProveedorField value={state.type ? state.type : ''} onChange={handleChange} />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="repository"
          label="Repositorio"
          name="repository"
          autoComplete="repository"
          value={state.repository ? state.repository : ''}
          onChange={handleField}
          helperText="Repositorio desde el cual se sincronizará la aplicación."
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="branchs"
          label="Branchs"
          name="branchs"
          autoComplete="branchs"
          value={state.branchs ? state.branchs : ''}
          onChange={handleField}
          helperText="Listado de branchs. (Deben ir separados por coma ',')."
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="username"
          label="Usuario Repositorio"
          name="username"
          autoComplete="username"
          value={state.username ? state.username : ''}
          onChange={handleField}
          helperText="Nombre de usuario para acceder al repositorio"
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="password"
          label="Token repositorio"
          name="password"
          type="password"
          autoComplete="password"
          value={state.password ? state.password : ''}
          onChange={handleField}
          helperText="Token de acceso al repositorio"
        />
        <NodeField value={state.node ? state.node : null} onChange={handleChange} />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          multiline
          maxRows={4}
          id="commadsToBuild"
          label="Comandos de construcción"
          name="commadsToBuild"
          autoComplete="commadsToBuild"
          value={state.commadsToBuild ? state.commadsToBuild : ''}
          onChange={handleField}
          helperText="Listado de comandos para la configuración y construcción de la aplicación (Deben ir separados por '&&')."
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="bundleDir"
          label="Ruta del directorio donde se construye el paquete"
          name="bundleDir"
          autoComplete="bundleDir"
          value={state.bundleDir ? state.bundleDir : ''}
          onChange={handleField}
          helperText="Ruta relativa dentro del proyecto dónde se encuentran los paquetes."
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

export default withRouter(connect()(MicroApp))