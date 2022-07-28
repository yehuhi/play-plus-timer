// import data from "../../middleware/server";

export default {

    setStartedTime: ((state, started_timex) => {
        // eslint-disable-next-line no-debugger
        debugger
        state.started_time = started_timex
    }),

    setStartedBreak: ((state, started_break) => {
        // eslint-disable-next-line no-debugger
        debugger
        state.start = started_break
    }),

    setBreakTime: ((state, break_time) => {
        // eslint-disable-next-line no-debugger
        debugger
        state.break_started = break_time
    }),

    setBreakEndTime: ((state, break_endtime) => {
        // eslint-disable-next-line no-debugger
        debugger
        state.break_ended = break_endtime
    }),

    setBreaksTime: ((state, breaks) => {
        // eslint-disable-next-line no-debugger
        debugger
        state.all_breaks.push(breaks);
    }),

    setEndedTime: ((state, close_time) => {
        // eslint-disable-next-line no-debugger
        debugger
        state.ended_time = close_time
    }),
    setEndHour: ((state, end_hour) => {
        // eslint-disable-next-line no-debugger
        debugger
        state.end_hour = end_hour
    }),

    setTotalTime: ((state, total_time) => {
        // eslint-disable-next-line no-debugger
        debugger
        state.total_time = total_time;
    }),

    setTotalResultTime: ((state, total_time) => {
        // eslint-disable-next-line no-debugger
        debugger
        state.total_result_time = total_time;
    }),

    setReportData: ((state, report_data) => {
        // eslint-disable-next-line no-debugger
        debugger
        state.report_data.push(report_data);
    })


}
