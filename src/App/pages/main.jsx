 
import React, { Suspense, useEffect } from 'react'
import clsx from 'clsx'
import { connect } from  'react-redux'
import { Route, Switch } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Drawer from '@material-ui/core/Drawer'
import Box from '@material-ui/core/Box'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import List from '@material-ui/core/List'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import Badge from '@material-ui/core/Badge'
import Container from '@material-ui/core/Container'
import Popper from '@material-ui/core/Popper'
import Fade from '@material-ui/core/Fade'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Link from '@material-ui/core/Link'
import MenuIcon from '@material-ui/icons/Menu'
import PersonIcon from '@material-ui/icons/Person'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import MeetingRoomOutlinedIcon from '@material-ui/icons/MeetingRoomOutlined'
import socketIOClient from "socket.io-client"

import CONFIG from '../../../config'
import { loadUser, logout } from '../actions/authenticationActions' 
import { updateMicroAppBundleStatus } from '../actions/microAppBundleActions'
import { mainMenu } from './menu'
import Developers from './developers'
import MicroApps from './microApps'
import MicroAppBundles from './microAppBundles'
import FormDeveloper from '../forms/developer'
import FormMicroApp from '../forms/microApp'
import FormMicroAppBundle from '../forms/microAppBundle'
import { Button } from '@material-ui/core'
import Modal from '../components/modal'


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {' © '}
      <Link color="inherit" href="#">
        Chef MicroFrontends
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    })
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
}));

const usePopupStyles = makeStyles((theme) => ({
  root: {
    width: 500,
  },
  typography: {
    margin: 0,
    padding: theme.spacing(2),
  },
}));

function Main(props) {
  const classes = useStyles()
  const popupClasses = usePopupStyles()
  const [open, setOpen] = React.useState(true)
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [openPopup, setOpenPopup] = React.useState(false)
  const [placement, setPlacement] = React.useState()
  const routes = [
    { path: `/developers/add`, exact: true, name: 'Añadir desarrollador', id: 'add-developers', component: FormDeveloper },
    { path: `/developers`, name: 'Desarrolladores', id: 'developers', component: Developers },
    { path: `/micro-apps/add`, exact: true, name: 'Añadir MicroApp', id: 'micro-apps', component: FormMicroApp },
    { path: `/micro-apps/:id`, exact: true, name: 'Añadir MicroApp', id: 'micro-apps', component: FormMicroApp },
    { path: `/micro-apps`, name: 'MicroApps', id: 'micro-apps', component: MicroApps },
    { path: `/micro-app-bundles/add`, exact: true, name: 'Construir nueva MicroApp', id: 'micro-app-bundles', component: FormMicroAppBundle },
    { path: `/micro-app-bundles`, name: 'Mis MicroApps', id: 'micro-app-bundles', component: MicroAppBundles }
  ]

  useEffect(() => {
    const token = localStorage.getItem('authToken')
    const websockectHost = `${CONFIG.CHEF_WEBSOCKET.host}:${CONFIG.CHEF_WEBSOCKET.port}`
    const socket = socketIOClient(websockectHost, { query: { token }, forceNew: true });
    props.dispatch(loadUser())
    socket.on("status", data => {
      if (!data.error) {
        props.dispatch(updateMicroAppBundleStatus(data))
      }
    })
  }, []);

  const handleDrawerOpen = () => {
    setOpen(true);
  }
  const handleDrawerClose = () => {
    setOpen(false);
  }

  const handleClick = (newPlacement) => (event) => {
    setAnchorEl(event.currentTarget)
    setOpenPopup((prev) => placement !== newPlacement || !prev)
    setPlacement(newPlacement)
  }

  const onLogout = () => {
    props.dispatch(logout())
  }

  const loading = () => {
    return <div>Cargando...</div>
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <Popper open={openPopup} anchorEl={anchorEl} placement={placement} transition style={{zIndex: 1900}}>
            {({ TransitionProps }) => (
              <Fade {...TransitionProps} timeout={350}>
                <Paper>
                  <p className={popupClasses.typography}>Su identificador:</p>
                  <p className={popupClasses.typography} style={{ paddingTop: 0 }}>{props.user.id ? props.user.id : 'Cargando' }</p>
                </Paper>
              </Fade>
            )}
          </Popper>
          <Button
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={(e) => { handleDrawerOpen(e)}}
            disabled={false}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}>
            <MenuIcon />
          </Button>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            Chef MicroFrontends
          </Typography>
          <IconButton color="inherit" onClick={handleClick('bottom-end')}>
            <Badge color="secondary">
              <PersonIcon />
            </Badge>
          </IconButton>
          <Button color="inherit"
            disabled={false}
            onClick={(e) => { onLogout(e) }}>
            <MeetingRoomOutlinedIcon />
          </Button>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>{mainMenu}</List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Suspense fallback={loading()}>
            <Switch>
              { routes.map((route, idx) => {
                return route.component ? (
                  
                  <Route
                    key={idx}
                    path={route.path}
                    exact={route.exact}
                    name={route.name}
                    render={props => (
                      
                      <Grid container spacing={3}>
                        <Grid item xs={12}>
                          <Paper className={classes.paper}>
                          <route.component />
                          </Paper>
                        </Grid>
                      </Grid>
                    )} />
                  ) : (null)
                }) 
              }
            </Switch>
          </Suspense>
          <Box pt={4}>
            <Copyright />
          </Box>
        </Container>
      </main>
      <Modal {...props.modal} />
    </div>
  );
}

const mapStateToProps = state => ({
  modal: state.modal,
  user: state.user ? state.user : null
})

export default connect(mapStateToProps)(Main)