import { fetch } from "./dbprovider.js";

export default {
  data() {
    return {
      isLoading: false,
      rcmMov: [],
      current: 0,
      max: 5,
    };
  },
  async created() {
    this.isLoading = true;
    const response = await fetch("get/movie/?");
    const data = response.items;
    this.rcmMov = data;

    this.isLoading = false;
  },
  methods: {
    next() {
      this.current++;
      if (this.current > this.max - 1) {
        this.current = 0;
      }
    },
    back() {
      this.current--;
      if (this.current < 0) {
        this.current = this.max - 1;
      }
    },
    toMovieDetail(e) {
        const crrEl = e.target
        const movieId = $(crrEl).attr('alt')
        this.$emit('activeMovieDetail', movieId)
    }
  },
  template: `
    <div id="rcmMov" class="row">
        <div class="angle-btn col-3" @click="back"><i class="fa fa-angle-left" style="font-size:70px"></i></div>
            <div id="rcmRow" class="col-5">
                <img @click="toMovieDetail" class="rcm-img" v-if="rcmMov.length > 0" :alt="rcmMov[current].id" :src="rcmMov[current].image"/>
                <div v-if="isLoading == true" class="loader loader-rcm"></div>
            </div>
        <div class="angle-btn col-3" @click="next"><i class="fa fa-angle-right" style="font-size:70px"></i></div>
    </div>
    `,
};
