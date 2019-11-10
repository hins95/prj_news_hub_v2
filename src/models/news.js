import {queryNews} from "../services/news";
import { delay } from 'dva/saga';

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
          type: 'initFetch',
          payload: {isAppend: false, page: 1},
        });
      });
    },
  },

  effects: {

    * initFetch({payload}, { put}) {  // eslint-disable-line

      yield put({type: 'fetch', payload});
    },
    * fetchMore({payload}, {put}) {  // eslint-disable-line

      yield put({type: 'fetch', payload});
    },
    * fetch({payload}, {call, put, select}) {  // eslint-disable-line

      const {isAppend = false, page = 1} = payload;

      const keyword = yield select(state => state.news.keyword);

      let response = yield call(queryNews, {keyword, page});

      // const result = queryNews()
      console.log('abc');
      console.log(response);
      const {data: {articles, totalResults}} = response;

      yield put({type: 'save', payload: {articles, totalResults, isAppend}});
    },
    setKeyword: [
      function* ({payload}, {put, select}) {

        yield delay(500);

        const currentKeyword = yield select(state => state.news.keyword);

        const {keyword: newKeyword} = payload;

        if (currentKeyword === newKeyword) {
          return;
        }

        yield put({type: 'saveKeyword', payload});
        yield put({type: 'initFetch', payload: {isAppend: false, page: 1}});
        // return {...state, ...action.payload};
      }, {type: 'takeLatest'}
    ],
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
    saveKeyword(state, action) {
      return {...state, ...action.payload};
    },
  },

};
