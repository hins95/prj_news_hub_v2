import {queryNews} from "../services/news";

export default {

  namespace: 'news',

  state: {
    articles: [],
    totalResults: 0,
    keyword: '',
  },

  subscriptions: {
    setup({dispatch, history}) {  // eslint-disable-line

      return history.listen(({pathname}) => {
        console.log(pathname);
        console.log('hi');
        dispatch({
          type: 'fetch',
          payload: {isAppend: false, page: 1},
        });
      });
    },
  },

  effects: {
    * fetch({payload}, {call, put, select}) {  // eslint-disable-line

      const {isAppend = false, page = 1} = payload;
      console.log('ab');
      const keyword = yield select(state => state.news.user);

      console.log('abcc');
      let response = yield call(queryNews, {keyword, page});

      // const result = queryNews()
      console.log('abc');
      console.log(response);
      const {data: {articles, totalResults}} = response;

      yield put({type: 'save', payload: {articles, totalResults, isAppend}});
    },
  },

  reducers: {
    save(state, action) {
      const {payload: {articles, totalResults, isAppend}} = action;
      console.log('arti cles');
      console.log(articles);
      if (isAppend) {
        return {...state, totalResults, articles: [...state.articles, ...articles]};
      } else {
        return {...state, totalResults, articles};
      }
    },
    setKeyword(state, action) {
      return {...state, ...action.payload};
    },
  },

};
