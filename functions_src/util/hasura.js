import fetch from 'node-fetch'

export async function query({ query, variables = {} }) {
  try {
    const result = await fetch(process.env.HASURA_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Hasura-Admin-Secret': process.env.HASURA_ADMIN_SECRET
      },
      body: JSON.stringify({ query, variables })
    }).then((response) => response.json())
    return result.data
  } catch (err) {
    console.log(err)
  }
}
