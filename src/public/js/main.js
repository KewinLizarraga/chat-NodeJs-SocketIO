// room.addEventListener('click', () => {

//     console.log(room.getAttribute('data-room'))
// })

const socket = io()

let message = document.getElementById('message')
const btnSend = document.getElementById('btnSend')
const email = document.getElementById('user').textContent.slice(13)

if (btnSend) {
  btnSend.addEventListener('click', () => {
    let room = document.getElementById('room')
    let date = new Date()
    room = Number(room.getAttribute('data-room'))
    date = `${date.getHours()}:${date.getMinutes()} | ${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`
    socket.emit('chat', { email, message: message.value, date, room })

    message.value = ''
  })
}

socket.on('chat', (data) => {
  const msgBox = document.getElementById('outgoing-msg').childNodes[1]

  const imgUser = document.getElementById('imgUser')

  const p = document.createElement('p')
  p.textContent = data.message
  const span = document.createElement('span')
  span.className = 'time-date'
  span.textContent = data.date
  const sentWithMsg = document.createElement('div')
  sentWithMsg.className = 'sent-with-msg'
  sentWithMsg.appendChild(p)
  sentWithMsg.appendChild(span)
  const sentMsg = document.createElement('div')
  sentMsg.className = 'sent-msg'
  sentMsg.appendChild(sentWithMsg)
  const outgoingMsgImg = document.createElement('div')
  outgoingMsgImg.className = 'outgoing-msg-img'
  outgoingMsgImg.appendChild(imgUser)
  msgBox.appendChild(sentMsg)
  msgBox.appendChild(outgoingMsgImg)
})
