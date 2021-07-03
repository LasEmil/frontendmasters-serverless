"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.query = query;

var _nodeFetch = _interopRequireDefault(require("node-fetch"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function query({
  query,
  variables = {}
}) {
  try {
    const result = await (0, _nodeFetch.default)(process.env.HASURA_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Hasura-Admin-Secret': process.env.HASURA_ADMIN_SECRET
      },
      body: JSON.stringify({
        query,
        variables
      })
    }).then(response => response.json());
    return result.data;
  } catch (err) {
    console.log(err);
  }
}