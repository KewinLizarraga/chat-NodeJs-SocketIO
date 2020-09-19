const { Schema, model } = require('mongoose')

const MessageSchema = new Schema({
  message: String,
  date: String,
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  room: { type: Schema.Types.ObjectId, ref: 'Room' }
})

module.exports = model('Message', MessageSchema)
