import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 引入字体图标
import '@/assets/fonts/iconfont.css'

// 引入vant
import Vant from 'vant'
import 'vant/lib/index.css'

// 引入flexble
import 'amfe-flexible/index.min.js'

// 引入文章详情css
import '../node_modules/github-markdown-css/github-markdown.css'
Vue.use(Vant)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
