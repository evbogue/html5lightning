import { joinRoom, selfId } from './trystero-torrent.min.js'

const room = joinRoom({appId: 'my-first-chatapp', password: 'password'}, 'chatapp')

const [send, receive] = room.makeAction('message')

const [typing, typed] = room.makeAction('typing')

const input = Object.assign(
  document.createElement('input'),
  { placeholder: 'Type into me',
    oninput: () => {
      const get = document.getElementById(selfId)
      if (get) { get.remove()}
      const newDiv = document.createElement('div')
      newDiv.id = selfId
      newDiv.textContent = selfId + ' ' + input.value
      input.after(newDiv)
      typing({typing: input.value})
    },
    onkeyup: ({key}) => { if (key === 'Enter') {
      input.after(Object.assign(document.createElement('div'), {
        innerHTML: selfId + ' ' + input.value
       }))
      send({message: input.value})
      input.value = ''
      const get = document.getElementById(selfId)
      const got = get
      get.remove()
    }
  }}
)

document.body.appendChild(input)

const myDiv = document.createElement('div')

myDiv.id = selfId
myDiv.textContent = selfId + ' is here.'

input.after(myDiv)

room.onPeerJoin(id => {
  const peerDiv = document.createElement('div')
  peerDiv.id = id
  peerDiv.textContent = id + ' is here.'
  input.after(peerDiv)
})

room.onPeerLeave(id => {
  const get = document.getElementById(id)
  if (id) {get.remove()}
})

receive((data, id) => {
  const msgDiv = document.createElement('div')
  msgDiv.innerHTML = id + ' ' + data.message
  input.after(msgDiv)
  const get = document.getElementById(id)
  if (get) { get.remove()}
})

typed((data, id) => {
  const get = document.getElementById(id)
  if (get) { get.remove() }
  const peerDiv = document.createElement('div')
  peerDiv.id = id
  peerDiv.textContent = id + ' ' + data.typing
  input.after(peerDiv)
})
