import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import TimeLine from "../components/TimeLine";
import Map from "../components/Map";
import RankPie from "../components/RankPie";
import RankBar from "../components/RankBar";

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/map',
      name: 'Map',
      component: Map
    },
    {
      path: '/timeline',
      name: 'TimeLine',
      component: TimeLine
    },
    {
      path: '/rankpie',
      name: 'RankPie',
      component: RankPie
    },
    {
      path: '/rankbar',
      name: 'RankBar',
      component: RankBar
    }
  ]
})
