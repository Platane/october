const plugins = [
  '@babel/plugin-proposal-class-properties',
  '@babel/plugin-proposal-object-rest-spread',
  '@babel/plugin-proposal-export-namespace-from',
]

const presets = [
  //
  '@babel/preset-flow',
]

if (process.env.BABEL_ENV === 'node') {
  plugins.push('@babel/plugin-transform-modules-commonjs')
}

module.exports = { plugins, presets }
