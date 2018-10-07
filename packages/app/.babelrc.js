const plugins = [
  'babel-plugin-emotion',
  '@babel/plugin-proposal-class-properties',
  '@babel/plugin-proposal-object-rest-spread',
  '@babel/plugin-proposal-export-namespace-from',
  [
    'transform-inline-environment-variables',
    {
      include: [
        'APP_BASENAME',
        'APP_ORIGIN',
        'BLOBSTORE_ENDPOINT',
        'BLOBSTORE_API_KEY',
      ],
    },
  ],
  [
    'babel-plugin-module-resolver',
    {
      alias: {
        '~/service/blobStore':
          process.env.NODE_ENV === 'test'
            ? './src/service/blobStore/__mock__'
            : './src/service/blobStore',

        '~': './src',
      },
    },
  ],
]

const presets = [
  //
  '@babel/preset-flow',

  '@babel/preset-react',
]

if (process.env.NODE_ENV === 'production') {
  presets.push([
    '@babel/preset-env',
    { modules: false, targets: { chrome: '63', edge: '17', firefox: '62' } },
  ])
  plugins.push([
    '@babel/plugin-transform-runtime',
    {
      helpers: false,
      regenerator: true,
    },
  ])
}

if (process.env.NODE_ENV === 'test') {
  plugins.push(
    [
      'babel-plugin-flow-runtime',
      {
        assert: false,
        annotate: false,
      },
    ],

    '@babel/plugin-transform-modules-commonjs'
  )
}

module.exports = { plugins, presets }
