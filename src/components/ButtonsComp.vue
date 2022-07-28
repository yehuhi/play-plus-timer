<template>
  <v-row style="margin: 80px 0 0 0">
    <v-btn
        depressed
        style="margin: 0 20px 0 60px; border-radius: 7px; width: 120px; font-size: 12px; height: 32px"
        class="white--text"
        color="#FF3366"
        @click="endendWork"
    >
      {{ close_button }}
    </v-btn>
    <v-btn
        depressed
        style="margin-right: 20px; border-radius: 7px; width: 120px; font-size: 12px; height: 32px"
        class="white--text"
        color="#34AA53"
        @click="startBreak"
    >
      {{ break_button }}
    </v-btn>
    <v-btn
        depressed
        style="border-radius: 7px; width: 120px; font-size: 12px; height: 32px"
        class="white--text"
        color="#5863F8"
        @click="started"
    >
      {{ start_button }}
    </v-btn>
  </v-row>
</template>

<script>
/* eslint-disable */
import TimerComp from "@/components/TimerComp";
import {mapMutations, mapState} from "vuex";

export default {
  name: "ButtonsComp",
  components: {TimerComp},
  data() {
    return {
      start_button: 'כניסה למשמרת',
      break_button: 'יציאה להפסקה',
      close_button: 'סגירת משמרת',
      startedShift: false
    }
  },
  computed: {
    ...mapState('schedules', ['started_time', 'start', 'ended_time']),

  },
  methods: {
    ...mapMutations('schedules', ['setStartedTime', 'setStartedBreak', 'setEndedTime']),

    started() {
      this.startedShift = true;
      this.$root.$emit('TimerComp');
    },
    startBreak() {
      if (!this.start && this.startedShift && !this.ended_time) {
        this.break_button = 'חזרה מהפסקה';
        this.setStartedBreak(true);
        this.$root.$emit('TimerComp');
      } else if (this.start && this.startedShift && !this.ended_time) {
        this.break_button = 'יציאה להפסקה';
        this.setStartedBreak(false);
        this.$root.$emit('TimerComp');
      }
    },
    endendWork() {
      if (!this.start && !this.ended_time && this.startedShift) {
        this.setEndedTime(true);
        this.$root.$emit('TimerComp');
      }
    }
  },
  created() {
  }
}
</script>

<style scoped>

</style>
