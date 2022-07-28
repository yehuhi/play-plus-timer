<template>
  <v-row style="margin: 20px 40px 30px 0; display: flex; flex-direction: row-reverse">
    <p style="margin-left: -81px;z-index: 900;font-weight: 600; font-family: Almoni ML v5 AAA">{{ report_title }}</p>

    <v-row style="margin: 40px 0; display: flex;flex-direction: row-reverse">
      <v-simple-table dense>
        <template v-slot:default>
          <thead>
          <tr>
            <th class="text-right" style="width: 170px">
              {{ break_time }}
            </th>
            <th class="text-right" style="width: 250px">
              {{ total_hours_without_break }} <span style="color: #d5d5d5; margin-right: 2px">{{ without_break }}</span>
            </th>
            <th class="text-right" style="width: 280px">
              {{ total_hours_with_break }}<span style="color: #d5d5d5; margin-right: 2px">{{ with_break }}</span>
            </th>
            <th class="text-right" style="width: 150px">
              {{ ended_at }}
            </th>
            <th class="text-right" style="width: 150px">
              {{ started_at }}
            </th>
            <th class="text-right" style="width: 150px">
              {{ date }}
            </th>
          </tr>
          </thead>
          <tbody>
          <tr
              v-for="time in times"
              :key="time.id"
          >
            <td class="text-right" style="font-weight: bold; font-size: 10px">{{ time.break_time }}</td>
            <td class="text-right" style="font-weight: bold; font-size: 10px">{{ time.total_hours_without_break }}</td>
            <td class="text-right" style="font-weight: bold; font-size: 10px">{{ time.total_hours_with_break }}</td>
            <td class="text-right" style="font-weight: bold; font-size: 10px">{{ time.ended_at }}</td>
            <td class="text-right" style="font-weight: bold; font-size: 10px">{{ time.started_at }}</td>
            <td class="text-right" style="font-weight: bold; font-size: 10px">{{ time.date }}</td>
          </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-row>
  </v-row>
</template>

<script>
/* eslint-disable */

import {mapMutations, mapState} from "vuex";
import datos from '../middleware/server/index'

export default {
  name: "TableDataComp",
  data() {
    return {
      date: 'תאריך',
      report_title: 'דו"ח משמרת',
      started_at: 'שעת כניסה',
      ended_at: 'שעת יציאה',
      total_hours_with_break: 'סה"כ שעות',
      with_break: '(כולל הפסקות)',
      total_hours_without_break: 'סה"כ שעות',
      without_break: '(ללא הפסקות)',
      break_time: 'הפסקה',
      resto: ''
      // times: [{
      //   date: '26/05/2021',
      //   started_at: '09:50',
      //   ended_at: '19:28',
      //   total_hours_with_break: '9.31',
      //   total_hours_without_break: '9.31',
      //   break_time: '0.33'
      // }, {
      //   date: '26/05/2021',
      //   started_at: '09:50',
      //   ended_at: '19:28',
      //   total_hours_with_break: '9.31',
      //   total_hours_without_break: '9.31',
      //   break_time: '0.33'
      // }, {
      //   date: '26/05/2021',
      //   started_at: '09:50',
      //   ended_at: '19:28',
      //   total_hours_with_break: '9.31',
      //   total_hours_without_break: '9.31',
      //   break_time: '0.33'
      // }, {
      //   date: '26/05/2021',
      //   started_at: '09:50',
      //   ended_at: '19:28',
      //   total_hours_with_break: '9.31',
      //   total_hours_without_break: '9.31',
      //   break_time: '0.33'
      // }, {
      //   date: '26/05/2021',
      //   started_at: '09:50',
      //   ended_at: '19:28',
      //   total_hours_with_break: '9.31',
      //   total_hours_without_break: '9.31',
      //   break_time: '0.33'
      // }, {
      //   date: '26/05/2021',
      //   started_at: '09:50',
      //   ended_at: '19:28',
      //   total_hours_with_break: '9.31',
      //   total_hours_without_break: '9.31',
      //   break_time: '0.33'
      // }, {
      //   date: '26/05/2021',
      //   started_at: '09:50',
      //   ended_at: '19:28',
      //   total_hours_with_break: '9.31',
      //   total_hours_without_break: '9.31',
      //   break_time: '0.33'
      // }]
    }
  },
  computed: {
    ...mapState('schedules', ['report_data']),
    times: function () {
      debugger
      if (this.report_data[0]) {
        debugger
        this.resto = this.report_data[0];
        return this.report_data;
      }
      return [];
    }
  },
  methods: {
    ...mapMutations('schedules', ['setReportData']),
  },
  created() {
    datos.allData().then(res => {
      if (res.data[0]) {
        console.log('get from api -> ', res.data);
        for (let i = 0; i < res.data.length; i++) {
          this.setReportData(res.data[i]);
        }
      }

    })
  }
}
</script>

<style scoped>

</style>
