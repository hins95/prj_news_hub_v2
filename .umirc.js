export default {
  plugins: [
    [
      'umi-plugin-react',
      {
        dva: {
          immer: true,
        },
        antd: true,
        routes: {
          exclude: [/models\//],
        },
        polyfills: ['ie9'],
        locale: {},
        library: 'react',
        dynamicImport: {
          webpackChunkName: true,
          loadingComponent: './components/Loading.js',
        },
        dll: {
          exclude: [],
        },
        pwa: true,
        hd: true,
        fastClick: true,
        title: 'US News',
        chunks: ['vendor', 'umi'],
        // scripts: [
        //   { src: 'http://cdn/a.js' },
        //   { src: '<%= PUBLIC_PATH %>a.js' },
        //   { content: `alert('a');` },
        // ],
        headScripts: [],
        metas: [{ charset: 'utf-8' }],
        links: [
          { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap' },
          { rel: 'stylesheet', href: 'https://fonts.googleapis.com/icon?family=Material+Icons' },
          ],
      },
    ],
  ],
};
