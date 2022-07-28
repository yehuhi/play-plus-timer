<template>
  <v-card class="overflow-hidden">
    <v-app-bar
        absolute
        color="white"
        height="52px"
        elevate-on-scroll
        scroll-target="#scrolling-techniques-7"
    >
      <v-toolbar-title
          style="margin-top: -2px;font-size: 14px; font-weight: 600;font-family: 'Almoni ML v5 AAA';color: #22272E">
        {{ userName }}
      </v-toolbar-title>
      <div style="width: 7px; height: 7px; border-radius: 50%; background-color: red; margin-left: 7px"></div>
      <div style="border-left: 1px solid #C2E6CB; height: 30px; margin-left: 9px"></div>

      <v-spacer></v-spacer>
      <img src="../assets/Vector.png" alt="logo" style="width: 104px; height: 27px">
    </v-app-bar>
    <!--    <v-sheet-->
    <!--        id="scrolling-techniques-7"-->
    <!--        class="overflow-y-auto"-->
    <!--        max-height="600"-->
    <!--    >-->
    <div style="min-height: 568px; max-width: 1400px; background-color: #fbfbfb">
      <p>Dashboard</p>
      <v-row>
        <v-col cols="5" class="py-4">
          <ButtonsComp/>
        </v-col>
        <v-col cols="7" class="py-4">
          <DataFieldsComp/>
        </v-col>
      </v-row>
      <v-row>
        <TimerComp/>
      </v-row>
      <v-row>
        <ReportComp/>
      </v-row>
    </div>
    <!--    </v-sheet>-->
  </v-card>

</template>

<script>
/* eslint-disable */
import DataFieldsComp from "../components/DatafieldsComp";
import ButtonsComp from "@/components/ButtonsComp";
import TimerComp from "@/components/TimerComp";
import ReportComp from "@/components/ReportComp";

export default {
  name: "DashboardPage",
  components: {
    TimerComp,
    ButtonsComp,
    DataFieldsComp,
    ReportComp
  },
  data() {
    return {
      userName: 'ירין מוסקוביץ'
    }
  },
  computed: {
    // userName: function () {
    //
    // }
  },
  methods: {},
  created() {
    // window.user = '';
  }
}
</script>

<style scoped>

</style>
