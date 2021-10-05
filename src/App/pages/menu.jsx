import React from 'react'
import { NavLink } from 'react-router-dom'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import DashboardIcon from '@material-ui/icons/Dashboard'
import PeopleIcon from '@material-ui/icons/People'
import LayersIcon from '@material-ui/icons/Layers'

export const mainMenu = (
  <div>
    <NavLink to='/micro-apps' style={{ color: 'inherit', textDecoration: 'none'}}>
      <ListItem button>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="MicroApss" />
      </ListItem>
    </NavLink>
    <NavLink to='/micro-app-bundles' style={{ color: 'inherit', textDecoration: 'none'}}>
      <ListItem button>
        <ListItemIcon>
          <LayersIcon />
        </ListItemIcon>
        <ListItemText primary="Mis MicroApss" />
      </ListItem>
    </NavLink>
    <NavLink to='/developers' style={{ color: 'inherit', textDecoration: 'none'}}>
      <ListItem button>
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText primary="Desarrolladores" />
      </ListItem>
    </NavLink>
  </div>
)