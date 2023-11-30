const socket = io('http://localhost:8080')
const messageContainer = document.getElementById('message-container')
const messageForm = document.getElementById('send-container')
const messageInput = document.getElementById('message-input')
//Client script untuk register User Baru
const name = prompt('What is your name?')
appendMessage('You joined')
socket.emit('new-user', name)
//Chat message client / User
socket.on('chat-message', data => {
  appendMessage(`${data.name}: ${data.message}`)
})
//Chat message pertanda user baru join
socket.on('user-connected', name => {
  appendMessage(`${name} connected`)
})
//Chat Message pertanda User disconnected
socket.on('user-disconnected', name => {
  appendMessage(`${name} disconnected`)
})
//Event post untuk Submit Message
messageForm.addEventListener('submit', e => {
  e.preventDefault()
  const message = messageInput.value
  appendMessage(`You: ${message}`)
  socket.emit('send-chat-message', message)
  messageInput.value = ''
})
//Event get misal ada message Baru dari User Lain 
function appendMessage(message) {
  const messageElement = document.createElement('div')
  messageElement.innerText = message
  messageContainer.append(messageElement)
}