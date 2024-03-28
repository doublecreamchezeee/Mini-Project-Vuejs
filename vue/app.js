import Header from "./header.js";
import NavBar from "./nav.js";
import Footer from "./footer.js";
import rcmMov from "./rcmMov.js";
import topMov from "./topMov.js";
import popularMov from "./popularMov.js";
import detailMov from "./detailMov.js";
import detailActor from "./detailActor.js"
import searchMov from "./searchMov.js";

export default {
  data() {
    return {
      home: true,
      movieDetail: false,
      actorDetail: false,
      searchResult: false,
      movie: '',
      actor: '',
      search: '',

    };
  },
  components: {
    Header,
    NavBar,
    Footer,
    rcmMov,
    topMov,
    popularMov,
    detailMov,
    searchMov,
    detailActor,
  },
  methods: {
    activeHome() {
      this.movie = ''
      this.search = ''
      this.actor = ''
      this.home = true
      this.movieDetail = false
      this.actorDetail = false
      this.searchResult = false
      location.reload();
    },
    activeActorDetail(actor) {
        this.actor = actor
        this.movie = ''
        this.search = ''
        this.home = false
        this.movieDetail = false
        this.actorDetail = true
        this.searchResult = false
    },
    activeMovieDetail(movie) {
        this.movie = movie
        this.actor = ''
        this.search = ''
        this.home = false
        this.movieDetail = true
        this.actorDetail = false
        this.searchResult = false
    },
    activeSearchResult(searchKey) {
      this.search = searchKey
      this.movie = ''
      this.actor = ''
      this.home = false
      this.movieDetail = false
      this.actorDetail = false
      this.searchResult = true
  },
  },
  template: `
        <Header/>
        <NavBar     @activeSearchResult="activeSearchResult" @activeHome="activeHome"/>
        <rcmMov     v-if="home == true" @activeMovieDetail="activeMovieDetail"/>
        <popularMov v-if="home == true" @activeMovieDetail="activeMovieDetail"/>
        <topMov     v-if="home == true" @activeMovieDetail="activeMovieDetail"/>
        <detailActor v-if="actorDetail == true" @activeHome="activeHome" :actor="actor"/>
        <detailMov  v-if="movieDetail == true" @activeActorDetail="activeActorDetail" :movie="movie"/>
        <searchMov  v-if="searchResult == true" @activeHome="activeHome" @activeMovieDetail="activeMovieDetail" :searchKey="search"/>
        <Footer/>
    `,
};
