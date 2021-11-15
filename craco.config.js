const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { '@primary-color': '#1DA57A',
                          '@body-background': '#fcfafc',
                          '@layout-header-background': '@body-background',
                          '@layout-body-background': '#ffffff',
                          '@layout-header-color': '#333333',
                          },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};