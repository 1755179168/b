<template>
  <div>
    <h1>欢迎来到个人空间后台系统</h1>
    <div class="chart">
      <Veline />
    </div>
  </div>
</template>

<script>
import Veline from "./charts.vue";
export default {
  components: {
    Veline,
  },
};
</script>

<style scoped>
h1 {
  text-align: center;
}
.chart{
  padding: 50px;
}
</style>