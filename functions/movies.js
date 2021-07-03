"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handler = void 0;

var _url = require("url");

var _nodeFetch = _interopRequireDefault(require("node-fetch"));

var _hasura = require("./util/hasura");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const handler = async () => {
  const result = await (0, _hasura.query)({
    query: `query AllMovies { 
  movies {
    id
    poster
    tagline
    title
  }
}
`
  });
  const api = new _url.URL('https://www.omdbapi.com/'); // eslint-disable-next-line no-undef

  api.searchParams.set('apiKey', process.env.OMDB_API_KEY);
  const promises = result.movies.map(movie => {
    api.searchParams.set('i', movie.id);
    return (0, _nodeFetch.default)(api).then(response => response.json()).then(data => {
      const scores = data.Ratings;
      return { ...movie,
        scores
      };
    });
  });
  const moviesWithRatings = await Promise.all(promises);
  return {
    statusCode: 200,
    body: JSON.stringify(moviesWithRatings)
  };
};

exports.handler = handler;