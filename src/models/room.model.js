const { Schema, model } = require('mongoose')

const RoomSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' }
})

module.exports = model('Room', RoomSchema)
