require('dotenv').config()

const app = require('./app')
const db = require('./config/db.config')

const { PORT } = require('./config')

const main = () => {
  db.then(() => {
    console.log('DB connected')
    app.listen(PORT, () => console.log(`Chat run on PORT: ${PORT}`))
  }).catch((err) => {
    console.log(`DB disconnected. - ERROR: ${err}`)
  })
}

main()
