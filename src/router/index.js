import Vue from 'vue'
import Router from 'vue-router'
import routes from './routes'
Router.prototype.goBack = function () {
  this.isBack = true
  this.go(-1)
}

Vue.use(Router);
const router = new Router({
  routes
})

export default router
