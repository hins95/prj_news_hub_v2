import request from '../utils/request';
import qs from 'qs';


// export function query() {
//   return request('/api/users');
// }

export function queryNews(payload) {
  const {keyword, page = 1} = payload;
  let extraQueryParams = {page};

  console.log('hi');

  if (keyword && keyword.length > 0) {
    extraQueryParams = {...extraQueryParams, q: keyword};
  }
  // const extraQueryParams = encodeURI(Object.entries(extraQueryParamsObj).map(([key, val]) => `${key}=${val}`).join('&'));
  return request(`https://newsapi.org/v2/everything?sources=the-new-york-times,the-washington-post&apiKey=dc83f5beab3549d7a10d4ec6e36c7498&pageSize=10&${qs.stringify(extraQueryParams)}`);
}
