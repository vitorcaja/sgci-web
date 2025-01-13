module.exports = api => {
  return {
    presets: [
      [
        '@quasar/babel-preset-app',
        api.call(caller=>caller && caller.target === 'node')
          ? {targets: {node: 'current'}}
          : {}
      ]
    ]
  }
}
