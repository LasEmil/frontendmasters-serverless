"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handler = handler;

var _hasura = require("./util/hasura");

async function handler(event) {
  const {
    id,
    title,
    tagline,
    poster
  } = JSON.parse(event.body);
  const result = await (0, _hasura.query)({
    query: `mutation AddMovie($id: String, $poster: String, $tagline: String, $title: String) {
  insert_movies_one(object: {id: $id, poster: $poster, tagline: $tagline, title: $title}) {
    id
    poster
    tagline
    title
  }
}
`,
    variables: {
      id,
      title,
      tagline,
      poster
    }
  });
  return {
    statusCode: 200,
    body: JSON.stringify(result)
  };
}