Vue.filter('ucwords', (valor) => {
    return valor.charAt(0).toUpperCase() + valor.slice(1);
}); // filtro global

Vue.component('titulo', {
    template: `
    <div class="row">
        <h2 @click="clicke">Campeonato Brasileiro - Série A - 2018</h2>
    </div>
    `,
    methods: {
        clicke() {
            console.log(this.$parent.visao);
        }
    }
});

Vue.component('my-app', {
    data() {
        return {
            timeCasa: null,
            timeFora: null,
            visao: 'tabela',
            times: [],
        }
    },
    template: `
    <div class="container">
        <titulo></titulo>

        <div class="row">
            <div class="col-md-12">
                <novo-jogo :times="times"></novo-jogo>
            </div>
        </div>
        <br>
        <div class="row">
            
            <div class="col-md-12">
                <tabela-clubes :times="times"></tabela-clubes>
            </div>
        </div>
    </div>
    `,
    methods: {
        showTabela() {
            this.visao = 'tabela';
        },
        showPlacar({timeCasa, timeFora}) {
            this.timeCasa = timeCasa;
            this.timeFora = timeFora;

            this.visao = 'placar';
        },
    },
});

Vue.component('tabela-clubes', {
    // props: ['times'],
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
    template: `
    <div>
        <input type="text" class="form-control" v-model="busca">
        <table class="table table-striped">
            <thead>
                <tr>
                    <th>Nome</th>
                    <th v-for="(coluna, indice) in ordem.colunas">
                        <a href="#" @click.prevent="ordenar(indice)">
                            {{coluna | ucwords}}
                        </a>
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(time, indice) in timesFiltrados" :class="{'table-success' : indice<6}" :style="{'font-size': indice<6 ? '17px' : '15px'}">
                    <td>
                        <clube :time="time" invertido="false"></clube>
                    </td>
                    <td>{{ time.pontos }}</td>
                    <td> {{ time.gm }} </td>
                    <td> {{ time.gs }} </td>
                    <td> {{ time.saldo }} </td>
                </tr>
            </tbody>
        </table>
        <clubes-libertadores :times="timesOrdenados"></clubes-libertadores>
        <clubes-rebaixados :times="timesOrdenados"></clubes-rebaixados>
    </div>
    `,
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
});

Vue.component('clubes-rebaixados', {
    props: ['times'],
    template: `
    <div>
        <h3>Times na zona de rebaixamento</h3>
        <ul>
            <li v-for="time in timesRebaixados">
                <clube :time="time"></clube>
            </li>
        </ul>
    </div>
    `,
    computed: {
        timesRebaixados() {
            return this.times.slice(16, 20);
        },
    },
});

Vue.component('clubes-libertadores', {
    props: ['times'],
    template: `
    <div>
        <h3>Times classificados para Libertadores</h3>
        <ul>
            <li v-for="time in timesLibertadores">
                <clube :time="time"></clube>
            </li>
        </ul>
    </div>
    `,
    computed: {
        timesLibertadores() {
            return this.times.slice(0, 6);
        },
    },
});

Vue.component('placar', {
    props: ['timeCasa', 'timeFora'],
    data() {
        return {
            golsCasa: 0,
            golsFora: 0,
        }
    },
    template: `
    <form class="form-inline">
        <input type="text" class="form-control col-md-1" v-model="golsCasa">

        <clube :time="timeCasa" invertido="false" v-if="timeCasa"></clube>

        <span><img src="https://freepikpsd.com/wp-content/uploads/2019/10/letra-x-png-2-1-Transparent-Images.png" width="14" height="14" alt="X"></span>
        
        <clube :time="timeFora" invertido="true" v-if="timeFora"></clube>
        
        <input type="text" class="form-control col-md-1" v-model="golsFora">

        <button type="button" class="btn btn-primary" @click="fimJogo">Fim de Jogo</button>
    </form>
    `,
    methods: {
        fimJogo() {
            var golsMarcados = parseInt(this.golsCasa);
            var golsSofridos = parseInt(this.golsFora);

            this.timeCasa.fimJogo(this.timeFora, golsMarcados, golsSofridos);

            this.$emit('fim-jogo');
        },
    }
});

Vue.component('novo-jogo', {
    // props: ['times'],
    data() {
        return {
            timeCasa: null,
            timeFora: null,
            times: this.timesColecao,
        }
    },
    inject: ['timesColecao'],
    template: `
    <div>
        <button class="btn btn-primary" @click="criarNovoJogo">Novo Jogo</button>
        <placar-modal :time-casa="timeCasa" :time-fora="timeFora" ref="modal"></placar-modal>
    </div>
    `,
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
});

Vue.component('placar-modal', {
    props: ['timeCasa', 'timeFora'],
    data() {
        return {
            golsCasa: 0,
            golsFora: 0,
        }
    },
    template:`
        <modal ref="modal">
            <h5 slot="header" class="modal-title">
                Novo Jogo
            </h5>
            <form slot="body" class="form-inline">
                <input type="text" class="form-control col-md-1" v-model="golsCasa">
        
                <clube :time="timeCasa" invertido="false" v-if="timeCasa"></clube>
        
                <span><img src="https://freepikpsd.com/wp-content/uploads/2019/10/letra-x-png-2-1-Transparent-Images.png" width="14" height="14" alt="X"></span>
                
                <clube :time="timeFora" invertido="true" v-if="timeFora"></clube>
                
                <input type="text" class="form-control col-md-1" v-model="golsFora">
            </form>
            <div slot="footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary" @click="fimJogo">Fim de Jogo</button>
            </div>
        </modal>
    `,
    methods: {
        showModal() {
            console.log(this.$el);
            this.getModal().show();
        },
        closeModal() {
            this.getModal().close();
        },
        getModal() {
            return this.$refs.modal;
        },
        fimJogo() {
            var golsMarcados = parseInt(this.golsCasa);
            var golsSofridos = parseInt(this.golsFora);

            this.timeCasa.fimJogo(this.timeFora, golsMarcados, golsSofridos);

            this.closeModal();
        },
    }
});

Vue.component('modal', {
    template: `
    <div class="modal fade" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <slot name="header"></slot>
          </div>
          <div class="modal-body">
            <slot name="body"></slot>
          </div>
          <div class="modal-footer">
            <slot name="footer"></slot>
          </div>
        </div>
      </div>
    </div>
    `,
    methods: {
        show() {
            $(this.$el).modal('show');
        },
        close() {
            $(this.$el).modal('hide');
        }
    }
});

Vue.component('clube', {
    props: ['time', 'invertido'],
    template: `
    <div style="display: flex; flex-direction: row">
        <img :src="time.escudo" class="escudo" alt="" :style="{order : (invertido == 'true') ? 2 : 1}">
        <span :style="{order : (invertido == 'true') ? 1 : 2}"> 
            {{ time.nome | ucwords }} 
        </span>
    </div>
    `
});


new Vue({
    el: "#app",
    provide() {
        return {
            timesColecao: [
                new Time('palmeiras', 'assets/palmeiras_60x60.png'),
                new Time('internacional', 'assets/internacional_60x60.png'),
                new Time('flamengo', 'assets/flamengo_60x60.png'),
                new Time('Atlético-MG', 'assets/atletico_mg_60x60.png'),
                new Time('Santos', 'assets/santos_60x60.png'),
                new Time('Botafogo', 'assets/botafogo_60x60.png'),
                new Time('Atlético-PR', 'assets/atletico-pr_60x60.png'),
                new Time('Corinthians', 'assets/corinthians_60x60.png'),
                new Time('Grêmio', 'assets/gremio_60x60.png'),
                new Time('Fluminense', 'assets/fluminense_60x60.png'),
                new Time('Bahia', 'assets/bahia_60x60.png'),
                new Time('Chapecoense', 'assets/chapecoense_60x60.png'),
                new Time('São Paulo', 'assets/sao_paulo_60x60.png'),
                new Time('Cruzeiro', 'assets/cruzeiro_60x60.png'),
                new Time('Sport', 'assets/sport_60x60.png'),
                new Time('Ceará', 'assets/ceara_60x60.png'),
                new Time('Vitória', 'assets/vitoria_60x60.png'),
                new Time('Vasco', 'assets/vasco_60x60.png'),
                new Time('América-MG', 'assets/america_mg_60x60.png'),
                new Time('Paraná', 'assets/parana_60x60.png'),
            ],
        }
    },
    // template: `<my-app></my-app>`,
    data: {},
    methods: {},
    filters: {},
});