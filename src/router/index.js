import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import ListView from '../views/ListView.vue'
import EditUser from '../components/EditUser.vue'
import EditPhoto from '../components/EditPhoto.vue'
import SearchForm from '../components/search/SearchForm.vue'
import UserView from '../views/UserView.vue'
import CabinetForm from '../views/CabinetView.vue'
//const HW = { template: '<div>{{$route.params.id}}</div>'}
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/auth',
    name: 'auth',
    component: UserView
  },
  {
    path: '/cabinet',
    name: "cabinet",
    component: CabinetForm
  },
  {
    path: '/search',
    name: "search",
    component: SearchForm
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView
  },
  {
    path: '/list',
    name: 'list',
    component: ListView
  },
  {
    path: '/editUser/:id',
    name: 'editUser',
    component: EditUser,
    props: route => ({ id: route.params.id})
  },
  {
    path: '/editPhoto/:id',
    name: 'editPhoto',
    component: EditPhoto,
    props: route => ({ id: route.params.id})
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
