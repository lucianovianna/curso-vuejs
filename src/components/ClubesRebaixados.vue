<template>
  <div>
    <h3>Times na zona de rebaixamento</h3>
    <ul>
      <li v-for="(time, idx) in timesRebaixados" :key="idx">
        <clube :time="time"></clube>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ["times"],
  computed: {
    timesRebaixados() {
      return this.times.slice(16, 20);
    },
  },
};
</script>
