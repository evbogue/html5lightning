import { bogbot } from 'https://cdn.jsdelivr.net/gh/evbogue/bogbookv4/bogbot.js'
import { joinRoom, selfId } from './trystero-torrent.min.js'

const room = joinRoom({appId: 'example4', password: 'password'}, 'chatapp')

const keypairDiv = Object.assign(document.createElement('div'), {textContent: await bogbot.pubkey()})

document.body.appendChild(keypairDiv)

const [send, receive] = room.makeAction('message')

const input = Object.assign(
  document.createElement('input'),
  { placeholder: 'Type into me',
    onkeyup: async ({key}) => { if (key === 'Enter') {
      const signed = await bogbot.publish(input.value)
      console.log(signed)
      const unboxer = Object.assign(document.createElement('pre'), {
        textContent: signed,
        onclick: async () => {
          const opened = await bogbot.open(signed)
          unboxer.replaceWith(Object.assign(document.createElement('pre'), {textContent: JSON.stringify(opened)}))
        }
      })

      input.after(unboxer)
      send({message: signed})
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

receive((data, id) => {
  const msgDiv = document.createElement('div')
  msgDiv.innerHTML = id + ' ' + data.message
  const unboxer = Object.assign(document.createElement('pre'), {
    textContent: data.message,
    onclick: async () => {
      const opened = await bogbot.open(data.message)
      unboxer.replaceWith(Object.assign(document.createElement('pre'), {textContent: JSON.stringify(opened)}))
    }
  })

  input.after(unboxer)
})


