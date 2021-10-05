 
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

import { fetchDevelopers } from '../actions/developerActions'

class Developers extends Component {

  componentDidMount() {
    this.props.dispatch(fetchDevelopers())
  }

  render() {
    let rows = this.props.developers ? this.props.developers : []

    return (
      <React.Fragment>
        <Typography component="h2" variant="h6" color="primary" gutterBottom>
          Desarrolladores
        </Typography>
        <NavLink to='/developers/add' style={{ color: 'inherit', textDecoration: 'none'}}>
          <Button variant="outlined" color="primary">
            Añadir
          </Button>
        </NavLink>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Email</TableCell>
              <TableCell>Creado</TableCell>
              <TableCell>Actualizado</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.createdAt}</TableCell>
                <TableCell>{row.updatedAt}</TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
  developers: state.developers
})

export default connect(mapStateToProps)(Developers)