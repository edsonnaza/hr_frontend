module.exports = // .babelrc
{
  "presets": [
    "@babel/preset-env",
    [ '@babel/preset-react', { runtime: 'automatic' } ]
  ],
  "plugins": [ "@babel/plugin-transform-modules-commonjs" ],
  
}
