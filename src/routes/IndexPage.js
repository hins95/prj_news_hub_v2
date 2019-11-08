import React, {useCallback, useMemo} from 'react';
import {connect} from 'dva';
import {AppBar, Avatar, Card, CircularProgress, Container, Grid, Toolbar, Typography} from '@material-ui/core';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import {fade, makeStyles} from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import CssBaseline from '@material-ui/core/CssBaseline';
import moment from 'moment';
import InfiniteScroll from 'react-infinite-scroller';

const useStyles = makeStyles(theme => ({
  card: {
    // Provide some spacing between cards
    // margin: 10,
    // padding: theme.spacing(2),

    // Use flex layout with column direction for components in the card
    // (CardContent and CardActions)
    // display: "flex",
    // flexDirection: "column",

    // Justify the content so that CardContent will always be at the top of the card,
    // and CardActions will be at the bottom
    // justifyContent: "space-between"
  },
  loadingBlock: {
    marginTop: 10,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
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
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  infiniteScroll: {
    minHeight: '100vh',
    marginTop: 20,
  }
}));

function IndexPage({
                     totalResults,
                     articles,
                     dispatch,
                     isLoading,
                   }) {

  // console.log('articlesarticles');
  // console.log(articles);
  // const {articles = []} = data || {};

  const classes = useStyles();

  const renderedSearchBar = useMemo(() => (
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
        onKeyUp={(e) => {
          dispatch({
            type: 'news/setKeyword',
            payload: {keyword: e.target.value},
          });
        }}
        inputProps={{'aria-label': 'search'}}
      />
    </div>
  ), []);

  const renderedHeader = useMemo(() => (
    <AppBar position="static">

      <Container maxWidth="md">
      <Toolbar>
        <Typography variant="h6">
          US News
        </Typography>
        <div style={{flexGrow: 1,}}/>

        {renderedSearchBar}

      </Toolbar>
      </Container>
    </AppBar>
  ), []);

  const renderArticleCard = useCallback((article) => (
    <Grid item md={4} sm={6} xs={12}>

      <Card className={classes.card}>
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar}>
              {article.source.name.charAt(0)}
            </Avatar>
          }
          title={article.source.name}
          subheader={moment(article.publishedAt).format('YYYY-MM-DD HH:mm')}
        />
        <CardMedia
          className={classes.media}
          image={article.urlToImage}
          title={article.title}
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {article.description}
          </Typography>
        </CardContent>
      </Card>
      {/*<Paper className={classes.paper}>item</Paper>*/}
    </Grid>
  ), []);

  return (
    <>
      <CssBaseline/>
      {renderedHeader}
      {isLoading ? <div className={classes.loadingBlock}><CircularProgress thickness={10}/></div> : null}
      <main
        className={classes.infiniteScroll}>

        <Container maxWidth="md">
          <InfiniteScroll
            pageStart={1}
            loadMore={(page) =>
              dispatch({
                type: 'news/fetch',
                payload: {isAppend: true, page},
              })
            }
            hasMore={!(articles.length >= totalResults)}
            loader={
              <div className={classes.loadingBlock}><CircularProgress/></div>
            }
          >
            <Grid container spacing={1}>
              <Grid container item xs={12} spacing={3}
                    direction='row'
                // alignItems="stretch"
                    alignItems="stretch"
              >
                {articles.map((article) => (

                  renderArticleCard(article)
                ))}

              </Grid>
            </Grid>
          </InfiniteScroll>
        </Container>

      </main>


    </>
  );
}

IndexPage.propTypes = {};

export default connect(({news, loading}) => {
  const {
    totalResults,
    articles,
  } = news;

  // const { visible: isScoreModalVisible } = scoreModals;
  return {

    // isLoading:
    //   loading.effects['example/fetch'] ||
    //   loading.effects['example/fetch'] ||
    //   loading.effects['example/fetch'],
    totalResults,
    articles,
    isLoading: loading.effects['news/fetch'],
  };
})(IndexPage);
