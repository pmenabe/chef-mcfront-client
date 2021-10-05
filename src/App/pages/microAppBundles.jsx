 
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Typography from '@material-ui/core/Typography'
import DeleteIcon from '@material-ui/icons/Delete'

import { fetchMicroAppBundles, deleteMicroAppBundle } from '../actions/microAppBundleActions'
import { openModal } from '../actions/modalActions'

class MicroAppBundles extends Component {

  componentDidMount() {
    this.props.dispatch(fetchMicroAppBundles())
  }

  goTo(id) {
    this.props.history.push(`/micro-app-bundles/${id}`)
  }

  delete(event, id) {
    event.preventDefault()
    let title = 'Eliminar' 
    let message = '¿Está seguro de eliminar este elemento?' 
    let action = () => this.props.dispatch(deleteMicroAppBundle(id))
    this.props.dispatch(openModal(title, message, action))
  }
  
  render() {
    let rows = this.props.microAppBundles ? this.props.microAppBundles : []

    return (
      <React.Fragment>
        <Typography component="h2" variant="h6" color="primary" gutterBottom>
          Mis MicroApps
        </Typography>
        <NavLink to='/micro-app-bundles/add' style={{ color: 'inherit', textDecoration: 'none'}}>
          <Button variant="outlined" color="primary">
            Construir
          </Button>
        </NavLink>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Denominación</TableCell>
              <TableCell>Branch</TableCell>
              <TableCell>Commit</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell>Creado</TableCell>
              <TableCell>Actualizado</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.micro_app ? row.micro_app.name : ''}</TableCell>
                <TableCell>{row.branch}</TableCell>
                <TableCell>{row.commit}</TableCell>
                <TableCell>{row.status}</TableCell>
                <TableCell>{row.createdAt}</TableCell>
                <TableCell>{row.updatedAt}</TableCell>
                <TableCell align="right">
                  <Button variant="contained" color="secondary" onClick={(event) => this.delete(event, row.id)}>
                    <DeleteIcon />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
  microAppBundles: state.microAppBundles,
  user: state.user
})

export default connect(mapStateToProps)(MicroAppBundles)