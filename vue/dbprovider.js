import data from "../db/data.js";

function parseURL(url) {
  const [path, queryString] = url.split("?");
  const [type, className, pattern] = path.split("/");

  const params = {};

  if (queryString) {
    const queryParams = queryString.split("&");
    queryParams.forEach((param) => {
      const [key, value] = param.split("=");
      params[key] = value;
    });
  }

  if (!params.page) {
    params.page = 1;
  }

  if (!params.per_page) {
    params.per_page = 10;
  }

  return {
    type,
    className,
    pattern,
    params,
  };
}

export const fetch = (url) => {
  try {
    const parsedURL = parseURL(url);
    if (parsedURL.type === "get" && parsedURL.className === "movie") {
      const filteredMovies = data.Movies.filter((movie) => movie.year <= 2022);
      filteredMovies.sort((a, b) => b.year - a.year);
      const response = {
        search: parsedURL.pattern,
        page: parsedURL.params.page || 1,
        per_page: parsedURL.params.per_page || 10,
        total_page: parsedURL.params.page * parsedURL.params.per_page,
        items: filteredMovies,
      };
      return Promise.resolve(response);
    }

    if (parsedURL.type === "get" && parsedURL.className === "mostpopular") {
      const response = {
        search: parsedURL.pattern,
        page: parsedURL.params.page || 1,
        per_page: parsedURL.params.per_page || 10,
        total_page: parsedURL.params.page * parsedURL.params.per_page,
        items: data.MostPopularMovies,
      };
      return Promise.resolve(response);
    }

    if (parsedURL.type === "get" && parsedURL.className === "top50") {
      const response = {
        search: parsedURL.pattern,
        page: parsedURL.params.page || 1,
        per_page: parsedURL.params.per_page || 10,
        total_page: parsedURL.params.page * parsedURL.params.per_page,
        items: data.Top50Movies,
      };
      return Promise.resolve(response);
    }

    if (parsedURL.type === "search" && parsedURL.className === "movie") {
      const name = parsedURL.pattern;
      const filteredMovies = data.Movies.filter((movie) =>
        movie.title.includes(name)
      );

      const response = {
        search: parsedURL.pattern,
        page: parsedURL.params.page || 1,
        per_page: parsedURL.params.per_page || 10,
        total_page: parsedURL.params.page * parsedURL.params.per_page,
        items: filteredMovies,
      };
      return Promise.resolve(response);
    }

    if (parsedURL.type === "details") {
      if (parsedURL.className === "name") {
        const name = parsedURL.pattern;
        const filteredActor = data.Names.filter((actor) =>
          actor.name.includes(name)
        );
        const response = {
          id: filteredActor[0].id,
          name: filteredActor[0].name,
          role: filteredActor[0].role,
          image: filteredActor[0].image,
          summary: filteredActor[0].summary,
          movie: filteredActor[0].images,
        };

        return Promise.resolve(response);
      } else {
        const id = parsedURL.pattern;
        let filteredMovies;
        const moviesMovie = data.Movies.filter((movie) =>
          movie.id.includes(id)
        );
        filteredMovies = moviesMovie;

        const response = {
          directorList: filteredMovies[0].directorList,
          writerList: filteredMovies[0].writerList,
          actorList: filteredMovies[0].actorList,
          genreList: filteredMovies[0].genreList,
          countries: filteredMovies[0].countries,
          languages: filteredMovies[0].languages,
          runtimeStr: filteredMovies[0].runtimeStr,
          plot: filteredMovies[0].plot,
          releaseDate: filteredMovies[0].releaseDate,
          id: filteredMovies[0].id,
          rank: filteredMovies[0].rank,
          title: filteredMovies[0].title,
          rankUpDown: filteredMovies[0].rankUpDown,
          image: filteredMovies[0].image,
          ratings: filteredMovies[0].ratings,
          imDbRatingCount: filteredMovies[0].imDbRatingCount,
        };

        return Promise.resolve(response);
      }
    } else {
      return Promise.reject("Data not found for the given URL");
    }
  } catch (error) {
    return Promise.reject(error.message);
  }
};
