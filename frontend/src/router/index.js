import {createRouter, createWebHistory} from 'vue-router';

import Login from '../components/Login.vue';
import Register from '../components/Register.vue';
import Home from '../components/Home.vue';
import MapView from '../components/MapView.vue';

const routes = [
    { path: '/', component: Home },
    {path: '/login', component: Login},
    {path: '/register', component: Register},
    {path: '/map', component: MapView}
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;