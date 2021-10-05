 
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { withRouter } from "react-router"
import Button from '@material-ui/core/Button'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Typography from '@material-ui/core/Typography'
import DeleteIcon from '@material-ui/icons/Delete'

import { fetchMicroApps, deleteMicroApp } from '../actions/microAppActions'
import { openModal } from '../actions/modalActions'

class MicroApps extends Component {

  componentDidMount() {
    this.props.dispatch(fetchMicroApps())
  }

  goTo(id) {
    this.props.history.push(`/micro-apps/${id}`)
  }

  delete(event, id) {
    event.preventDefault()
    let title = 'Eliminar' 
    let message = '¿Está seguro de eliminar este elemento?' 
    let action = () => this.props.dispatch(deleteMicroApp(id))
    this.props.dispatch(openModal(title, message, action))
  }

  render() {
    let rows = this.props.microApps ? this.props.microApps : []

    return (
      <React.Fragment>
        <Typography component="h2" variant="h6" color="primary" gutterBottom>
          MicroApps
        </Typography>
        <NavLink to='/micro-apps/add' style={{ color: 'inherit', textDecoration: 'none'}}>
          <Button variant="outlined" color="primary">
            Añadir
          </Button>
        </NavLink>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Denominación</TableCell>
              <TableCell>Proveedor</TableCell>
              <TableCell>Repositorio</TableCell>
              <TableCell>Branchs</TableCell>
              <TableCell>Node</TableCell>
              <TableCell>Creado</TableCell>
              <TableCell>Actualizado</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell onClick={(event) => this.goTo(row.id)}>{row.name}</TableCell>
                <TableCell onClick={(event) => this.goTo(row.id)}>{row.type ? row.type.label : ''}</TableCell>
                <TableCell onClick={(event) => this.goTo(row.id)}>{row.repository}</TableCell>
                <TableCell onClick={(event) => this.goTo(row.id)}>{row.branchs}</TableCell>
                <TableCell onClick={(event) => this.goTo(row.id)}>{row.node ? row.node.label : ''}</TableCell>
                <TableCell onClick={(event) => this.goTo(row.id)}>{row.createdAt}</TableCell>
                <TableCell onClick={(event) => this.goTo(row.id)}>{row.updatedAt}</TableCell>
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
  microApps: state.microApps
})

export default withRouter(connect(mapStateToProps)(MicroApps))