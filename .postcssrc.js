// postcss.config.js
module.exports = {
  plugins: {
    'postcss-pxtorem': {
      // 设计稿1rem的大小
      // vant组件库是根据37.5
      rootValue: (module) => {
        if (/vant/gi.test(module.file)) {
          return 37.5
        } else {
          return 75
        }
      },
      // 适配的属性
      propList: ['*']
    }
  }
}
