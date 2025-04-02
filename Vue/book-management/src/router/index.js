import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import AddBook from '../views/AddBook.vue'
import EditBook from '../views/EditBook.vue'

const routes = [
    { path: "/", component: Home },
    { path: "/add", component: AddBook },
    { path: "/edit/:id", component: EditBook, props: true }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;