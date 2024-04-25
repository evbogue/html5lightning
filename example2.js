import { joinRoom, selfId } from './trystero-torrent.min.js'

const room = joinRoom({appId: 'my-first-chatapp', password: 'password'}, 'chatapp')

const [send, receive] = room.makeAction('message')

const input = Object.assign(
  document.createElement('input'),
  { placeholder: 'Type into me',
    onkeyup: ({key}) => { if (key === 'Enter') {
      input.after(Object.assign(document.createElement('div'), {
        innerHTML: selfId + ' ' + input.value
       }))
      send(input.value)
      input.value = ''
    }
  }}
)

document.body.appendChild(input)

room.onPeerJoin(id => {
  const peerDiv = document.createElement('div')
  peerDiv.id = id
  peerDiv.textContent = id + ' joined the room.'
  input.after(peerDiv)
})

room.onPeerLeave(id => {
  const get = document.getElementById(id)
  if (id) {get.remove()}
})

receive((msg, id) => {
  const msgDiv = document.createElement('div')
  msgDiv.innerHTML = id + ' ' + msg
  input.after(msgDiv)
})
