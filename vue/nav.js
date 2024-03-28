export default {
  data() {
    return {};
  },
  mounted() {},

  methods: {
    searchMovie() {
      const searchKey = document.getElementById("searchInput").value.toString();
      if (searchKey != "") {
        this.$emit("activeSearchResult", searchKey);
      }
    },
    backHome() {
      this.$emit("activeHome");
    },
  },

  template: `
    <div id="navbar">
        <div @click="backHome" id="nav-title">Home</div>
        <form id="searchForm">
            <input id="searchInput" class="form-control" type="search" placeholder="Search...">
            <button @click="searchMovie" class="btn btn-outline-success" type="button">Search</button>
        </form>
    </div>
    `,
};
