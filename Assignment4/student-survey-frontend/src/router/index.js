// This file defines the routes for the Vue application using vue-router.

import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/survey',
    name: 'SurveyForm',
    // Lazy-load the SurveyFormView component
    component: () => import(/* webpackChunkName: "survey-form" */ '../views/SurveyFormView.vue')
  },
  {
    path: '/surveys',
    name: 'SurveyList',
    // Lazy-load the SurveyListView component
    component: () => import(/* webpackChunkName: "survey-list" */ '../views/SurveyListView.vue')
  },
  {
    path: '/survey/update/:id',
    name: 'SurveyUpdate',
    component: () => import(/* webpackChunkName: "survey-update" */ '../views/SurveyUpdateView.vue'),
    props: true
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
