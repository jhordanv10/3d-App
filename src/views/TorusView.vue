<template>
  <div>
    <h1 class="text pt-4">Torus</h1>
    <Torus3d />
  </div>
</template>

<script>

import Torus3d from '@/components/Torus3d.vue';

export default {
  components: {  Torus3d },
};
</script>

<style scoped>
.text {
  text-align: center;
  background-color: #000;
  color: #fff;
}
.start {
  text-align: center;
}
</style>