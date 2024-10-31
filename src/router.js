import { createRouter, createWebHistory } from 'vue-router'
import CalendarView from './views/CalendarView.vue'

const routes = [
  {
    path: '/',               // デフォルトのルート
    name: 'Calendar',
    component: CalendarView, // カレンダーをデフォルト表示に設定
  },
  {
    path: '/pomodoro',
    name: 'Pomodoro',
    component: () => import('./views/PomodoroView.vue')
  },
  {
    path: '/todo',
    name: 'Todo',
    component: () => import('./views/TodoView.vue')
  },
  {
    path: '/finance',
    name: 'Finance',
    component: () => import('./views/FinanceView.vue')
  },
  {
    path: '/team-tasks',
    name: 'TeamTasks',
    component: () => import('./views/TeamTasksView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
