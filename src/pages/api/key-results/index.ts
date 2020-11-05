import mockedResponse from './mockedResponse.json'

export default (_, res) => {
  res.statusCode = 200
  res.end(JSON.stringify(mockedResponse))
}
