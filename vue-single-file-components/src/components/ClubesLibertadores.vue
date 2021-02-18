<template>
  <div>
    <h3>Times classificados para Libertadores</h3>
    <ul>
      <li v-for="(time, idx) in timesLibertadores" :key="idx">
        <clube :time="time"></clube>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ["times"],
  computed: {
    timesLibertadores() {
      return this.times.slice(0, 6);
    },
  },
};
</script>