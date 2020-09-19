const { Schema, model } = require('mongoose')

const RoomSchema = new Schema({
    room: Number,
    user: { type: Schema.Types.ObjectId, ref: 'User' }
})

module.exports = model('Room', RoomSchema)
