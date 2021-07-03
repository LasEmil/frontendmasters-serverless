export const handler = async (event) => {
  const {
    queryStringParameters: { text }
  } = event
  console.log(text)
  const response = text ? `You said ${text}` : `Silence...`
  return { statusCode: 200, body: response }
}
