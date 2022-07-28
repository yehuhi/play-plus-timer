<template>
  <v-row style="display: flex;flex-direction: column; align-content: center; margin-top: 20px">
    <div style="font-size: 30px; font-weight: bold"> {{ hours }}:{{ minutes }}:{{ seconds }}</div>
  </v-row>
</template>

<script>
/* eslint-disable */
import {mapMutations, mapState} from "vuex";
import datos from "@/middleware/server";


export default {
  name: "TimerComp",
  data() {
    return {
      hours: '00',
      actual_hour: '00',
      end_hourx: '00',
      minutes: '00',
      actual_minutes: '00',
      end_minutes: '00',
      seconds: '00',
      actual_seconds: '00',
      end_seconds: '00',
      countDownDate: '',
      currentSec: 0,
      currentMin: 0,
      currentHour: 0,
      pauseFlag: false,
      breakStartedTime: '',
      endTime: '',
      pauseCounter: 0,
      stop: 0,
      breakMin: 0,
      totalMin: 0,
      breakHour: 0,
      totalHour: 0,
      resultBreak: '0.0',
      resultTime: '0.0',
      resto: '',
      date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)

    }
  },
  watch: {
    date(value, oldValue) {
      debugger
      if (value !== oldValue) {
        debugger
        datos.addTimerData({hour: '00', minutes: '00', seconds: '00'});
        window.location.href;
      }
    }
  },
  computed: {
    ...mapState('schedules', ['started_time', 'start', 'break_started', 'break_ended', 'all_breaks', 'ended_time', 'total_time', 'total_result_time', 'end_hour', 'report_data']),
    breakTotal: function () {
      if (this.all_breaks) {
        let total_break = this.all_breaks.reduce((partialSum, a) => partialSum + a, 0);
        return Number(total_break.toFixed(2));
      }
      return 0;
    }
  },
  methods: {
    ...mapMutations('schedules', ['setStartedTime', 'setStartedBreak', 'setBreakTime', 'setBreakEndTime', 'setBreaksTime', 'setTotalTime', 'setReportData', 'setTotalResultTime', 'setEndHour']),

    actualTime() {
      debugger
      let currentdate = new Date();
      this.actual_hour = (currentdate.getHours() < 10 ? '0' : '') + currentdate.getHours();
      this.actual_minutes = (currentdate.getMinutes() < 10 ? '0' : '') + currentdate.getMinutes();
      this.actual_seconds = (currentdate.getSeconds() < 10 ? '0' : '') + currentdate.getSeconds();
      this.setStartedTime({hour: this.actual_hour, minutes: this.actual_minutes, seconds: this.actual_seconds});
      this.startedTime();
    },

    startedTime() {
      debugger
      setInterval(() => {
        if (this.ended_time) {
          let currentdate = new Date();
          this.end_hourx = (currentdate.getHours() < 10 ? '0' : '') + currentdate.getHours();
          this.end_minutes = (currentdate.getMinutes() < 10 ? '0' : '') + currentdate.getMinutes();
          this.end_seconds = (currentdate.getSeconds() < 10 ? '0' : '') + currentdate.getSeconds();
          this.endTime = {hour: this.hours, minutes: this.minutes, seconds: this.seconds};
          if (this.stop === 0) {
            this.setEndHour({hour: this.end_hourx, minutes: this.end_minutes, seconds: this.end_seconds});
          }
          this.setTotalTime({hour: this.hours, minutes: this.minutes, seconds: this.seconds});
          if (parseInt(this.total_time.minutes) > 0) {
            this.totalMin = (parseInt(this.total_time.minutes));
            if (this.totalMin < 10) {
              this.totalMin = `0${this.totalMin}`;
            }
            if (parseInt(this.total_time.hour) > 0) {
              this.totalHour = parseInt(this.total_time.hour);
            }
            this.resultTime = `${this.totalHour}.${this.totalMin}`;
          }
          if (this.resultTime !== '0.0') {
            this.setTotalResultTime(Number(this.resultTime));
          }
          console.log('total_hours_without_break -> ', Number(this.resultTime))

          if (this.started_time && this.stop === 0) {
            this.setReportData({
              date: `${new Date().getDate()}/${new Date().getMonth() < 10 ? `0${new Date().getMonth() + 1}` : new Date().getMonth() + 1}/${new Date().getFullYear()}`,
              started_at: `${this.started_time.hour}:${this.started_time.minutes}`,
              ended_at: `${this.end_hour.hour}:${this.end_hour.minutes}`,
              total_hours_with_break: this.total_result_time ? this.total_result_time : 0 + this.all_breaks ? this.breakTotal : 0,
              total_hours_without_break: this.total_result_time ? this.total_result_time : 0,
              break_time: this.breakTotal
            });
            // datos.addFieldsData(this.report_data[this.report_data.length - 1]);
            datos.addReportData(this.report_data);
          }
          this.stop = +1;
          return;
        }
        if (this.start && !this.ended_time) {
          let currentdate = new Date();
          this.actual_hour = (currentdate.getHours() < 10 ? '0' : '') + currentdate.getHours();
          this.actual_minutes = (currentdate.getMinutes() < 10 ? '0' : '') + currentdate.getMinutes();
          this.actual_seconds = (currentdate.getSeconds() < 10 ? '0' : '') + currentdate.getSeconds();
          this.breakStartedTime = {hour: this.hours, minutes: this.minutes, seconds: this.seconds};
          if (this.pauseCounter === 0) {
            this.setBreakTime({hour: this.actual_hour, minutes: this.actual_minutes, seconds: this.actual_seconds});
          }
          this.pauseCounter = +1;
          return;
        }
        if (!this.start && this.pauseCounter > 0 && !this.ended_time) {
          this.resultBreak = '0.0';
          let currentdate = new Date();
          this.pauseCounter = 0;
          this.setBreakEndTime({
            hour: (currentdate.getHours() < 10 ? '0' : '') + currentdate.getHours(),
            minutes: (currentdate.getMinutes() < 10 ? '0' : '') + currentdate.getMinutes(),
            seconds: (currentdate.getSeconds() < 10 ? '0' : '') + currentdate.getSeconds()
          });
          if ((parseInt(this.break_ended.minutes) - parseInt(this.break_started.minutes)) > 0) {
            this.breakMin = (parseInt(this.break_ended.minutes) - parseInt(this.break_started.minutes));
            if (this.breakMin < 10) {
              this.breakMin = `0${this.breakMin}`;
            }
            if ((parseInt(this.break_ended.hour) - parseInt(this.break_started.hour)) > 0) {
              this.breakHour = parseInt(this.break_ended.hour) - parseInt(this.break_started.hour);
            }
            this.resultBreak = `${this.breakHour}.${this.breakMin}`;
          }
          if (this.resultBreak !== '0.0') {
            this.setBreaksTime(Number(this.resultBreak));
          }
          // console.log('THE BREAK TIME RESULT-> ', Number(this.resultBreak));
        }
        debugger
        if (this.seconds === '59' && !this.ended_time) {
          if (this.minutes === '59') {
            this.currentHour++;
            this.hours = (this.currentHour < 10 ? '0' : '') + this.currentHour;
            this.currentMin = 0;
          }
          this.currentSec = 0;
          this.seconds = (this.currentSec < 10 ? '0' : '') + this.currentSec;
          this.currentMin++;
          this.minutes = (this.currentMin < 10 ? '0' : '') + this.currentMin;
        } else if (!this.ended_time) {
          this.currentSec++;
          this.seconds = (this.currentSec < 10 ? '0' : '') + this.currentSec;
        }
        // Set Timer
        if (this.hours && this.minutes && this.seconds && !this.ended_time) {
          datos.addTimerData({hour: this.hours, minutes: this.minutes, seconds: this.seconds});
        }
      }, 1000);

    }
  },
  mounted() {
    this.$root.$on('TimerComp', () => {
      // your code goes here
      if (this.seconds === '00' && this.minutes === '00' && this.hours === '00' && !this.start) {
        debugger
        this.actualTime();
      }
    });
    this.$root.$on('TimerComp', () => {
      // your code goes here
      if (this.start) {
        debugger
        // this.pauseTimer();
      }
    });
  },
  created() {
    if (this.ended_time) {
      debugger
      datos.timerData().then(res => {
        debugger
        if (res.data[0]) {
          console.log('get from api -> ', res.data);
          this.currentSec = res.data[0].timer.seconds;
          this.hours = res.data[0].timer.hour;
          this.minutes = res.data[0].timer.minutes;
          this.seconds = res.data[0].timer.seconds;
          this.resto = res.data;
          this.startedTime();
        } else {
          this.hours = '00';
          this.minutes = '00';
          this.seconds = '00';
        }
      });
    } else if (!this.ended_time) {
      // if (!this.$store.state.schedules) {
      //   if (!this.$store.state.schedules.report_data[0]) {
          datos.timerData().then(res => {
            if (res.data[0]) {
              debugger
              this.currentSec = res.data[0].timer.seconds;
              this.hours = res.data[0].timer.hour;
              this.minutes = res.data[0].timer.minutes;
              this.seconds = res.data[0].timer.seconds;
            } else {
              this.hours = '00';
              this.minutes = '00';
              this.seconds = '00';
            }
          });
        // } else {
        //   this.hours = '00';
        //   this.minutes = '00';
        //   this.seconds = '00';
        // }
      // }
    } else {
      this.hours = '00';
      this.minutes = '00';
      this.seconds = '00';
    }
  }
}
</script>

<style scoped>

</style>
