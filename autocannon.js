const autocannon = require('autocannon')

autocannon({
  url: 'http://localhost:3000',
  connections: 200,
  pipelining: 1,
  duration: 10
}, console.log)
