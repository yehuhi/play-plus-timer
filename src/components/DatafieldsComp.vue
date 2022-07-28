<template>
  <v-row style="margin-top: 35px">
    <p style="margin-left: 635px;font-weight: 600; font-family: Almoni ML v5 AAA">{{ selfDataTitle }}</p>
    <v-row style="margin-right: 40px">
      <v-col cols="3">
        <div style="width: 166px; height: 41px; background-color: #ffffff; border-radius: 8px; margin-right: 0px">
          <v-icon style="font-size: 13px; color: #34AA53; left: 86.26%">mdi-coffee</v-icon>
          <div style="margin-left: 105px; margin-top: -22px;margin-bottom: -5px; font-size: 12px; color: #909499;
             font-family: 'Almoni ML v5 AAA';font-weight: 600;font-style: normal;">:הפסקה
          </div>
          <span style="font-size: 13px;margin: -10px 0 0 116px; font-style: normal;
             font-family: 'Almoni ML v5 AAA';font-weight: 600; z-index: 900 ">{{all_breaks[0] ? breakTotal : breakTotal2 }}</span>
        </div>
      </v-col>
      <v-col cols="3">
        <div style="width: 166px; height: 41px; background-color: #ffffff; border-radius: 8px; margin-left: 0px">
          <v-icon style="font-size: 13px; color: #34AA53; left: 86.26%">mdi-clock-outline</v-icon>
          <div style="margin-left: 83px; margin-top: -22px;margin-bottom: -5px; font-size: 12px; color: #909499;
             font-family: 'Almoni ML v5 AAA';font-weight: 600;font-style: normal;">:סה"כ שעות
          </div>
          <span style="font-size: 13px;margin: -10px 0 0 116px; font-style: normal;
             font-family: 'Almoni ML v5 AAA';font-weight: 600; z-index: 900 "
                >{{ total_result_time !=='' ? totalTime : totalTime2 }}</span>
        </div>
      </v-col>
      <v-col cols="3">
        <div style="width: 166px; height: 41px; background-color: #ffffff; border-radius: 8px; margin-left: 0px">
          <v-icon style="font-size: 13px; color: #34AA53; left: 86.26%; transform: rotateY(180deg)">mdi-login-variant
          </v-icon>
          <div style="margin-left: 105px; margin-top: -22px;margin-bottom: -5px; font-size: 12px; color: #909499;
             font-family: 'Almoni ML v5 AAA';font-weight: 600;font-style: normal;">-נכנס ב
          </div>
          <span style="font-size: 13px;margin: -10px 0 0 88px; font-style: normal;
             font-family: 'Almoni ML v5 AAA';font-weight: 600; z-index: 900"
                v-if="started_time.hour">{{ started_time.hour }}:{{
              started_time.minutes
            }}:{{ started_time.seconds }}</span>
          <span style="font-size: 13px;margin: -10px 0 0 88px; font-style: normal;
             font-family: 'Almoni ML v5 AAA';font-weight: 600; z-index: 900"
                v-else-if="started_time2"> {{ started_time2 }} </span>
          <span style="font-size: 13px;margin: -10px 0 0 88px; font-style: normal;
             font-family: 'Almoni ML v5 AAA';font-weight: 600; z-index: 900" v-else> 00:00:00 </span>
        </div>
      </v-col>
      <v-col cols="3">
        <div style="width: 166px; height: 41px; background-color: #ffffff; border-radius: 8px">
          <v-icon style="font-size: 13px; color: #34AA53; left: 86.26%">mdi-calendar-month</v-icon>
          <div style="margin-left: 105px; margin-top: -22px;margin-bottom: -5px; font-size: 12px; color: #909499;
             font-family: 'Almoni ML v5 AAA';font-weight: 600;font-style: normal;">:תאריך
          </div>
          <span style="font-size: 13px;margin: -10px 0 0 67px; font-style: normal;
             font-family: 'Almoni ML v5 AAA';font-weight: 600; z-index: 900 ">{{ dato_year }},{{ dato }}</span>
        </div>
      </v-col>

    </v-row>
  </v-row>

</template>


<script>
/* eslint-disable */

import {mapMutations, mapState} from "vuex";
import moment from "moment";
import datos from "@/middleware/server";

export default {
  name: "DashboardComp",
  data() {
    return {
      selfDataTitle: 'אזור אישי',
      started_at: '00:00:00',
      total_hours: '0',
      break_time: '0.25',
      dateFieldName: 'תאריך',
      dato_day: '01',
      dato_month: 'ביוני',
      dato_year: '2022',
      date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      menu: false,
      modal: false,
      menu2: false,
      breakTotal2: '',
      totalTime2: '',
      started_time2: ''
    }
  },
  computed: {
    ...mapState('schedules', ['started_time', 'all_breaks', 'ended_time', 'total_time', 'total_result_time']),

    dato: function () {
      moment.locale('he');
      return moment(this.date).format('D בMMM');
    },

    breakTotal: function () {
      if (this.all_breaks) {
        let total_break = this.all_breaks.reduce((partialSum, a) => partialSum + a, 0);
        return total_break.toFixed(2);
      }
      return '0.00';
    },

    totalTime: function () {
      if (this.total_result_time) {
        let total_result = this.total_result_time;
        return total_result.toFixed(2);
      }
      return '0.00';
    }
  },
  methods: {
    ...mapMutations('schedules', ['setBreaksTime']),
    save: () => {

    }
  },
  created() {
    datos.allData().then(res => {
      if (res.data[res.data.length - 1]) {
        console.log('get from api fields-> ', res.data[res.data.length - 1].break_time);
        console.log('get from api fields-> ', res.data[res.data.length - 1].total_hours_without_break);
        // for (let i = 0; i < res.data.length; i++) {
        this.breakTotal2 = res.data[res.data.length - 1].break_time;
        this.started_time2 = `${res.data[res.data.length - 1].started_at}:00`;
        console.log('LO ESPECIALITE -- > ', this.started_time)
        console.log('ESPECIALITE -- > ', this.started_time2)
        this.totalTime2 = res.data[res.data.length - 1].total_hours_without_break;
      } else {
        return
      }
    })
  }
}
</script>

<style scoped>

</style>
