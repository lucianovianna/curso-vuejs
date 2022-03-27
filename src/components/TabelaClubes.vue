<template>
  <div>
    <input type="text" class="form-control" v-model="busca" />
    <table class="table table-striped">
      <thead>
        <tr>
          <th>Nome</th>
          <th v-for="(coluna, indice) in ordem.colunas" :key="indice">
            <a href="#" @click.prevent="ordenar(indice)">
              {{ coluna | ucwords }}
            </a>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(time, indice) in timesFiltrados" :key="indice" :class="{ 'table-success': indice < 6 }"
          :style="{ 'font-size': indice < 6 ? '17px' : '15px' }"
        >
          <td>
            <clube :time="time" invertido="false"></clube>
          </td>
          <td>{{ time.pontos }}</td>
          <td>{{ time.gm }}</td>
          <td>{{ time.gs }}</td>
          <td>{{ time.saldo }}</td>
        </tr>
      </tbody>
    </table>
    <clubes-libertadores :times="timesOrdenados"></clubes-libertadores>
    <clubes-rebaixados :times="timesOrdenados"></clubes-rebaixados>
  </div>
</template>

<script>
import _ from 'lodash';
export default {
    data() {
        return {
            ordem: {
                colunas: ['pontos', 'gm', 'gs', 'saldo'],
                orientacao: ['desc', 'desc', 'asc', 'desc'],
            },
            busca: '',
            times: this.timesColecao,
        }
    },
    inject: ['timesColecao'],
    computed: {
        timesOrdenados() {
            return _.orderBy(this.times, this.ordem.colunas, this.ordem.orientacao);
        },
        timesFiltrados() {
            var self = this;
    
            return _.filter(this.timesOrdenados, function(time) {
                let buscar = self.busca.toLowerCase();
                return time.nome.toLowerCase().indexOf(buscar) >= 0;
            });
        },
    },
    methods: {
        ordenar(indice) {
            this.$set(this.ordem.orientacao, indice, this.ordem.orientacao[indice] == 'desc' ? 'asc' : 'desc');
        },
    }
};
</script>