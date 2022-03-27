<template>
  <div class="row">
    <h2 @click="clicke">Campeonato Brasileiro - Série A - 2018</h2>
  </div>
</template>

<script>
export default {
  methods: {
    clicke() {
      console.log(this.$parent.visao);
    },
  },
};
</script>