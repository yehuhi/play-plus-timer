<template>
  <v-container>

    <v-row class="text-center" style="display: flex; flex-direction: column; align-content: center; margin-top: 10%">
      <div style="height: 264px;width: 322px;left: 784px;top: 383px;  background-color: #FFFFFF;
                    box-shadow: 0px 0px 18px rgba(0, 0, 0, 0.05);border-radius: 8px">
        <p style="margin:20px -185px 0 0">שם משתמש</p>
        <input type="text" v-model="userName" placeholder="שם משתמש" style="text-align:right;margin-right: 5px; border: 1px solid #E3E6E9;border-radius: 8px;
          width: 272px; height: 42px"/><br/><br/>
        <p style="margin: -5px -225px 0 0">סיסמא</p>
        <input type="text" v-model="password" placeholder="סיסמא" style="text-align:right; border: 1px solid #E3E6E9;border-radius: 8px;
          width: 272px; height: 42px"/>

        <v-btn
            depressed
            style=" border-radius: 7px; width: 272px; font-size: 18px; height: 42px; margin-top: 20px"
            class="white--text"
            color="#34AA53"
            @click="login"
        >
          {{ login_btn }}
        </v-btn>

      </div>
    </v-row>
  </v-container>
</template>

<script>
/* eslint-disable */
import datos from '../middleware/server'

export default {
  name: "LoginComp",
  data() {
    return {
      login_btn: 'כניסה למערכת',
      userName: '',
      password: ''
    }
  },
  methods: {
    async login() {
      debugger
      let authentication = await datos.authentication({userName: this.userName, password: this.password});
      if (authentication) {
        sessionStorage["name"] = JSON.stringify(this.userName);
        window.user = this.userName;
        // window.location.reload();
        this.$router.push('/dashboard');
      }

    }
  }
}
</script>

<style scoped>
input[type="text"]::placeholder {
  color: #E3E6E9
}

input[type=text] {
  padding: 12px 20px;
}
</style>
