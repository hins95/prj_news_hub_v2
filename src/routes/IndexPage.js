import React, {useMemo} from 'react';
import {connect} from 'dva';
import styles from './IndexPage.css';
// import AppBar from '@material-ui/core/AppBar';
import {AppBar, Toolbar, Typography, Grid, Container} from '@material-ui/core';
import {fade, makeStyles} from '@material-ui/core/styles';
// import AppBar from '@material-ui/core/AppBar';
// import Toolbar from '@material-ui/core/Toolbar';
// import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
    // [theme.breakpoints.down('sm')]: {
    //   display: 'none',
    // },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200,
      },
    },
    [theme.breakpoints.down('sm')]: {
      width: 120,
      '&:focus': {
        width: 180,
      },
    },
  },
}));

function IndexPage() {
  const classes = useStyles();

  const renderedHeader = useMemo(() => (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6">
          US News
        </Typography>
        <div style={{flexGrow: 1,}}/>

        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon/>
          </div>
          <InputBase
            placeholder="Search"
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            inputProps={{'aria-label': 'search'}}
          />
        </div>

      </Toolbar>
    </AppBar>
  ), []);

  return (
    <>
      <CssBaseline/>
      {renderedHeader}
      <main>

        <Container maxWidth="md">
        <Grid container spacing={1}>
          <Grid container item xs={12} spacing={3}>
            <Grid item lg={4} sm={6} xs={12}>
              <Paper className={classes.paper}>item</Paper>
            </Grid>
            <Grid item lg={4} sm={6} xs={12}>
              <Paper className={classes.paper}>item</Paper>
            </Grid>
            <Grid item lg={4} sm={6} xs={12}>
              <Paper className={classes.paper}>item</Paper>
            </Grid>
            <Grid item lg={4} sm={6} xs={12}>
              <Paper className={classes.paper}>item</Paper>
            </Grid>
            <Grid item lg={4} sm={6} xs={12}>
              <Paper className={classes.paper}>item</Paper>
            </Grid>
            <Grid item lg={4} sm={6} xs={12}>
              <Paper className={classes.paper}>item</Paper>
            </Grid>
            <Grid item lg={4} sm={6} xs={12}>
              <Paper className={classes.paper}>item</Paper>
            </Grid>
            <Grid item lg={4} sm={6} xs={12}>
              <Paper className={classes.paper}>item</Paper>
            </Grid>
            <Grid item lg={4} sm={6} xs={12}>
              <Paper className={classes.paper}>item</Paper>
            </Grid>
            <Grid item lg={4} sm={6} xs={12}>
              <Paper className={classes.paper}>item</Paper>
            </Grid>
          </Grid>
        </Grid>
        </Container>

      </main>


      <div className={styles.normal}>
        <h1 className={styles.title}>Yay! Welcome to dva!</h1>
        <div className={styles.welcome}/>
        <ul className={styles.list}>
          <li>To get started, edit <code>src/index.js</code> and save to reload.</li>
          <li><a href="https://github.com/dvajs/dva-docs/blob/master/v1/en-us/getting-started.md">Getting Started</a>
          </li>
        </ul>
      </div>
    </>
  );
}

IndexPage.propTypes = {};

export default connect()(IndexPage);
