import { fetch } from './dbprovider.js'


export default {
    props: ['movie'],
    data() {
        return {
            isLoading: false,
            item: null,
        }
    },
    created() {
        this.getMovie(this.movie)
    },
    watch: {
        movie(newId, oldId) {
            this.getMovie(newId)
        }
    },
    methods: {
        async getMovie(id, className) {
            this.isLoading = true
            const url = 'details/' + className + '/' + id + '?';
            const response = await fetch(url);
            this.item = response;

            if (this.item != null) {
                this.changeRating();
            }
            this.isLoading = false;
        },
        changeRating() {
            const rating = this.item.imDbRating
            const rated = Math.round(rating)
            let ratingHTML = ``
            for (let i = 1; i <= 10; i++) {
                if (i > rated) {
                    ratingHTML += `<i class="fa fa-star unrated"></i>`
                } else {
                    ratingHTML += `<i class="fa fa-star rated"></i>`
                }
                ratingHTML += `\n`
            }

            $(".rating-points").append(ratingHTML)
        },
        toActorDetail(e){
            const crrEl = e.target
            const actorName = $(crrEl).attr('alt')
            this.$emit('activeActorDetail', actorName)
        },
    },
    template: `
    <div v-if="isLoading == true" class="loader loader-movie-detail"></div>
    <div id="movieDetail">
        <div id="detail" class="container-fluid d-flex mt-4">
            <div class="poster mx-4">
                <img :src="item.image" alt="Movie Poster">
            </div>
            <div class="border-movie-info">
                <div class="title">{{ item.title }}</div>
                <div class="movie-meta-info container-fluid mt-2 py-1 px-2">
                    <div class="movie-dt">Director:</div>
                    <div class="movie-dd">
                        <span v-for="director in item.directorList" :key="director.id">
                            {{ director.name }}
                            <span v-if="index < item.directorList.length - 1">, </span>
                        </span>
                    </div>
                    <br>
                    <div class="movie-dt">Writer:</div>
                    <div class="movie-dd">
                        <span v-for="writer in item.writerList" :key="writer.id">
                            {{ writer.name }}
                            <span v-if="index < item.writerList.length - 1">, </span>
                        </span>
                    </div>
                    <br>
                    <div class="movie-dt">Released:</div>
                    <div class="movie-dd">{{ ' ' + item.releaseDate }}</div>
                    <br>
                    <div class="movie-dt">Countries:</div>
                    <div class="movie-dd">{{ ' ' + item.countries }}</div>
                    <br>
                    <div class="movie-dt">Runtime:</div>
                    <div class="movie-dd">{{ ' ' + item.runtimeStr }}</div>
                    <br>
                    <div class="movie-dt">Languages:</div>
                    <div class="movie-dd">{{ ' ' + item.languages }}</div>
                    <br>
                    <div class="movie-dt">Genre:</div>
                    <div class="movie-dd">
                        <span v-for="genre in item.genreList" :key="genre.key">
                            {{ ' ' + genre.value + ' ' }}
                        </span>
                    </div>
                    <br>
                    <div class="movie-dt">Actor:</div>
                    <div class="movie-dd">
                        <div v-for="actor in item.actorList" :key="actor.id">
                            <div class="d-flex col-8 mx-3 my-5">
                                <span style="width:300px;">
                                    {{ actor.name }}
                                </span>
                                <img @click="toActorDetail" class="img-fluid" style="height: 100px; width: 100px;" :src="actor.image" :alt="actor.name" />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="rating container-fluid mt-2 py-1 px-2">
                    <span class="rating-title">{{ 'Ratings: ' +  item.ratings.imDb + '  '}}</span>
                    <span class="rating-points"></span>
                </div>
                <div class="plot container-fluid mt-2 py-1 px-2">
                    <div class="plot-title">Plot:</div>
                    <span class="plot-content">{{ item.plot }}</span>
                </div>
            </div>
        </div>
    </div>    
    `
}

