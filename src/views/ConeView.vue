<template>
  <div>
    <h1 class="text pt-4">Cono</h1>
    <Cone3d />
  </div>
</template>

<script>

import Cone3d from '@/components/Cone3d.vue';

export default {
  components: {  Cone3d },
};
</script>

<style scoped>
.text {
  background-color: #5d718b;
  color: #fff;
}
.start {
  text-align: center;
}
</style>