import Index from '../components/Index'
import About from '../views/About'


export default {
    mode: 'history',
    routes: [
        {
            name: 'Index',
            path: '/',
            component: Index
        },
        {
            name: 'About',
            path: '/about',
            component: About
        }
    ]
}