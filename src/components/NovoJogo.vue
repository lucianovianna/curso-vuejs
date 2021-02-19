<template>
  <div>
    <button class="btn btn-primary" @click="criarNovoJogo" :disabled="loading">Novo Jogo</button>
    <placar-modal
      :time-casa="timeCasa"
      :time-fora="timeFora"
      ref="modal"
    ></placar-modal>
  </div>
</template>

<script>
import getTimes from "../get-times";

export default {
  created() {
    getTimes
      .then((times) => (this.times = times))
      .finally(() => (this.loading = false));
  },
  data() {
    return {
      loading: true,
      timeCasa: null,
      timeFora: null,
      // times: this.timesColecao,
      times: [],
    };
  },
  inject: ["timesColecao"],
  methods: {
    criarNovoJogo() {
      console.log(this.$refs); // debug
      let indiceCasa = Math.floor(Math.random() * 20);
      let indiceFora = Math.floor(Math.random() * 20);

      this.timeCasa = this.times[indiceCasa];
      this.timeFora = this.times[indiceFora];

      let modal = this.$refs.modal;
      modal.showModal();
    },
  },
};
</script>