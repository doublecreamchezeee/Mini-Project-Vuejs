import { fetch } from './dbprovider.js'

export default {
    props: ['actor'],
    data() {
        return {
            item: null,
        }
    },
    created() {
        this.getActor(this.actor)
    },
    watch: {
        actor(newName, oldName) {
            this.getActor(newName)
        }
    },
    methods: {
        async getActor(name) {
            const url = 'details/name/' + name + '?';
            const response = await fetch(url);
            this.item = response;
            this.isLoading = false;
        }
    },
    template: `
    <div v-if="isLoading == true" class="loader loader-actor-detail"></div>
    <div id="actorDetail">
        <div id="detail" class="container-fluid d-flex mt-4">
            <div class="poster mx-4">
                <img :src="item.image">
            </div>
            <div class="border-actor-info">
                <div class="title">{{ item.title }}</div>
                <div class="actor-meta-info container-fluid mt-2 py-1 px-2">

                <div class="movie-dt">Name: </div>
                <div class="movie-dd">{{ ' ' + item.name }}</div>
                <br>

                <div class="movie-dt">Role: </div>
                <div class="movie-dd">{{ ' ' + item.role }}</div>
                <br>

                <div class="movie-dt">Summary: </div>
                <div class="movie-dd">{{ ' ' + item.summary }}</div>
                <br>

                <div class="movie-dt">Movie:</div>
                <div class="movie-dd" style="overflow-y: auto;">
                        <div v-for="movie in item.movie" :key="movie.title">
                            <div class="d-flex col-8 mx-3 my-5">
                                <span style="width:300px;">
                                    {{ movie.title }}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `
}

