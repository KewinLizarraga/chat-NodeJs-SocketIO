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
  const messageHistory = document.getElementById('message-history')

  const incomingMsg = document.createElement('div')
  incomingMsg.className = 'incoming-msg'
  const incomingMsgImg = document.createElement('div')
  incomingMsgImg.className = 'incoming-msg-img'
  const imgUser = document.createElement('img')
  imgUser.src = `http://gravatar.com/avatar/${data.gravatar}?d=monsterid&s=45`
  imgUser.alt = 'img-user'

  incomingMsgImg.appendChild(imgUser)
  incomingMsg.appendChild(incomingMsgImg)

  const receivedMsg = document.createElement('div')
  receivedMsg.className = 'received-msg'
  const receivedWithMsg = document.createElement('div')
  receivedWithMsg.className = 'received-with-msg'
  const msg_p = document.createElement('p')
  msg_p.textContent = data.message
  const msg_date = document.createElement('span')
  msg_date.className = 'time-date'
  msg_date.textContent = data.date

  receivedWithMsg.appendChild(msg_p)
  receivedWithMsg.appendChild(msg_date)
  receivedMsg.appendChild(receivedWithMsg)
  incomingMsg.appendChild(receivedMsg)
  messageHistory.appendChild(incomingMsg)
})
