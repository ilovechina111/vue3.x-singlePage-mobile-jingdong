import Vue from 'vue'
import './cube-ui'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import 'amfe-flexible'
import setaxios from './setaxios'  //引入拦截
Vue.use(setaxios)
Vue.config.productionTip = false
Vue.prototype.$http = axios  // 挂载axios 

// 路由守卫
router.beforeEach((to,from,next)=>{
  store.commit('settoken',localStorage.getItem('token'))
  if(to.meta.requireAuth){
    if(store.state.token){
      next()
    }else{
      next({
        path:'/login',
        query:{redirect:to.fullPath}
      })
      console.log(to.fullPath);
      
    }
  }else{
    next();
  }
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
