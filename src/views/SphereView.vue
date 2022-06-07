<template>
  <div>
    <h1 class="text pt-4">Sphere</h1>
    <Sphere3d />
  </div>
</template>

<script>
import Sphere3d from "@/components/Sphere3d.vue";

export default {
  components: { Sphere3d},

};
</script>

<style>
.text {
  text-align: center;
  background-color: #000;
  color: #fff;
}
</style>
