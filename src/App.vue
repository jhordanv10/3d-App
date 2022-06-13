<template>
  <v-app>
    <!-- <v-icon >mdi-home</v-icon> -->
    <v-navigation-drawer
      app
      class="pt-4"
      color="grey lighten-3"
      mini-variant
    >
      <v-avatar
        cursor: pointer
        size="40"
        v-for="{id , icon, path} in routes"
        :key="id"
        class="d-block text-center mx-auto mb-9 avatar"
        @click="selectRute(path)"
        
      >
      <Icon :icon="icon" class="icon grey--text"/>
      </v-avatar>
    </v-navigation-drawer>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import { Icon } from '@iconify/vue2';
export default {
  name: "App",
  components: {
		Icon,
	},

  data() {
    return {
      routes: [
        { id:1, name:"home", icon:"mdi-home", path:"/"},
        { id:2, name:"sphere", icon:"mdi-sphere", path:"/sphere"},
        { id:3, name:"cubes", icon:"mdi-cube", path:"/cubes"},
        { id:4, name:"cone", icon:"mdi-cone", path:"/cone"},
        { id:5, name:"cylinder", icon:"mdi-cylinder", path:"/cylinder"},
        { id:6, name:"torus", icon:"mdi-record-circle", path:"/torus"},
        { id:7, name:"plane", icon:"mdi-earth-box", path:"/plane"},
        { id:8, name:"modelastronaut", icon:"mdi-rocket", path:"/modelastronaut"},
      ]
    };
  },
  methods: {
    selectRute(r) {
      this.$router.push(r).catch(()=>{});;
    },
  },
};
</script>
<style lang="scss" scoped>
  .avatar {
    cursor: pointer;
  }
</style>
