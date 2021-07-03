"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handler = void 0;

var _movies = _interopRequireDefault(require("./../data/movies.json"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const handler = async ({
  queryStringParameters
}) => {
  const {
    id
  } = queryStringParameters;

  const movie = _movies.default.find(m => m.id === id);

  if (!movie) {
    return {
      statusCode: 404,
      body: 'Not found'
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify(movie)
  };
};

exports.handler = handler;