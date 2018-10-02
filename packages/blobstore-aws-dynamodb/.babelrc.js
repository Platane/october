const plugins = [
  '@babel/plugin-proposal-class-properties',
  '@babel/plugin-proposal-object-rest-spread',
  '@babel/plugin-proposal-export-namespace-from',
  [
    'transform-inline-environment-variables',
    {
      include: [
        'AWS_ACCESS_KEY_ID',
        'AWS_SECRET_ACCESS_KEY',
        'AWS_DEFAULT_REGION',
      ],
    },
  ],
]

const presets = [
  //
  '@babel/preset-flow',
]

if (process.env.BABEL_ENV === 'test') {
  plugins.push('@babel/plugin-transform-modules-commonjs')
}

module.exports = { plugins, presets }
