<template>
  <v-container fill-height fluid class="home">
    <v-row>
      <v-col class="start">
        <img height="80px" width="80px" src="../assets/ImgStart.png" alt="" />
        <h2>
          Hola! <br>
          <small>👈  Escoge una figura para visualizarla</small> 
        </h2>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  name: "Home",

  components: {},
};
</script>

<style scoped>
.home {
  background-color: #000;
  color: #fff;
}
.start {
  text-align: center;
}
</style>
