import { URL } from 'url'
import fetch from 'node-fetch'
import { query } from './util/hasura'

export const handler = async () => {
  const { movies } = await query({
    query: `query AllMovies { 
  movies {
    id
    poster
    tagline
    title
  }
}
`
  })
  const api = new URL('https://www.omdbapi.com/')
  // eslint-disable-next-line no-undef
  api.searchParams.set('apiKey', process.env.OMDB_API_KEY)

  const promises = movies.map((movie) => {
    api.searchParams.set('i', movie.id)
    return fetch(api)
      .then((response) => response.json())
      .then((data) => {
        const scores = data.Ratings
        return {
          ...movie,
          scores
        }
      })
  })

  const moviesWithRatings = await Promise.all(promises)
  return {
    statusCode: 200,
    body: JSON.stringify(moviesWithRatings)
  }
}
