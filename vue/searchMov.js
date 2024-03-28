import { fetch } from './dbprovider.js'

export default {
    props: ['searchKey'],
    data() {
        return {
            isLoading: false,
            items: [],
        }
    },
    created() {
        if (this.searchKey !== '' || this.searchKey != null) {
            this.searchMovie(this.searchKey)
        }
    },
    watch: {
        searchKey(newKey, oldKey) {
            if (this.searchKey !== '') {
                this.searchMovie(newKey)
            }
        }
    },
    methods: {
        async searchMovie(name) {
            this.isLoading = true
            const url = 'search/movie/' + name + '?';
            const response = await fetch(url);
            const data = response.items;
            this.items = data;
            this.isLoading = false;
        },
        toMovieDetail(e) {
            const el = e.target
            const crrEl = $(el).parent()
            const movieId = $(crrEl).children('.card-img-top').attr('alt')
            this.$emit('activeMovieDetail', movieId)
        }
    },
    template: `
    <div id="searchArea" class="card-group d-flex justify-content-center my-4">
        <div v-if="isLoading == true" class="loader"></div>
            <div v-if="isLoading == false" class="col-4 py-4" v-for="item of items">
                <div class="btn p-0 card movie-view-card mx-10" @click="toMovieDetail">
                    <img :src="item.image" :alt="item.id" class="card-img-top">
                    <div class="card-body">
                        <h5 class="card-title text-start overflow-hidden">{{item.title}}</h5>
                    </div>
            </div>
        </div>
    </div>
    `
}