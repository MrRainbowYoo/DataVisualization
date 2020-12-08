import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import China from "../components/China";
import Zhejiang from "../components/provinces/Zhejiang";
import Map from "../components/Map";

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    // {
    //   path: '/china',
    //   name: 'China',
    //   component: China
    // },
    // {
    //   path: '/zhejiang',
    //   name: 'Zhejiang',
    //   component: Zhejiang
    // },
    {
      path: '/map',
      name: 'Map',
      component: Map
    }
  ]
})
