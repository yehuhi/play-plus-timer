// import data from "../../middleware/server";

export default {

    // getScheduleData: async ({commit}) => {
    // debugger
    // const users = await database.get({entity: 'users'});
    // debugger
    // console.log(users, 'my users')
    // commit('setUsers', users)
    // }

    startTimer: ({commit}) => {
        commit('setStartedTime', setInterval(() => {
        }, 1000))
    }
}
