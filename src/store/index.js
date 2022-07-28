import Vue from 'vue'
import Vuex from 'vuex'
import schedules from './schedules'
import users from './users'

Vue.use(Vuex)

export default new Vuex.Store({
    strict: process.env.NODE_ENV !== 'production',
    modules: {
        schedules,
        users
    }
})
