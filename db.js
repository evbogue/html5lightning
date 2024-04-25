export const db = {}

db.title = `
  # How to turn a static website into a distributed chatroom using Trystero and the Bog protocol

  (A five to ten minute talk)
<hr>
`

db.bio = `
### Everett Bogue

+ From Chicago
+ Has been coding JavaScripts since 1999 
+ Famous on the Internet for moving to SF with all of his stuff in a backpack a long time ago
+ Skipping the "AI Era" of the Internet to embrace quantum computing
+ Working on the Bog Protocol via the apps [Bogbook](https://bogbook.com/) and [Decent](https://decent.deno.dev/)

Find me:

+ https://evbogue.com/
+ ev@evbogue.com
+ [773-510-8601](tel:773-510-8601)
+ https://bogbook.com/#EVxe89AeRwmTT0hfrT7sHe0wAuzvH9Yvg9TFUgqPh4M=

<hr>
`

db.intro = `

### Simple Development

People thought the web was going to be for sharing research papers, and thus HTML was designed to format research papers. 

\`<p>Hello World, this is static text!</p>\`

People wanted to write brochure home pages with Buy Now buttons on them instead, so CSS was invented.

\`<link rel='stylesheet' type='text/css' href='style.css' />\`

And people didn't want to write XML so Markdown was invented 

\`import { marked } from "https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js";\`

But the Internet's ultimate expression ended up being chatrooms. 

\`<script type='module' src='app.js'></script>\`

Making a chatroom is not hard.

\`\`\`
import { marked } from 'https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js'

const input = Object.assign(
  document.createElement('input'),
  { placeholder: 'Type into me',
    onkeyup: ({key}) => { if (key === 'Enter') {
      input.after(Object.assign(document.createElement('div'), {
        innerHTML: marked.parse(input.value)
       }))
      /*send to friends here*/
      input.value = ''
    }
  }}
)

document.body.appendChild(input)

\`\`\`

https://html5lightning.deno.dev/example1.html

<iframe src='./example1.html'></iframe>
<div id='example1'></div>

Distributing your chat messages is the hard part. 

Most of the time we solve this by using a centralized chat server in "The Cloud". 

Questions?
<hr>
`

db.trystero = `
### Trystero

https://oxism.com/trystero

Trystero is software by Dan Motzenbecker that bootstraps WebRTC (a protocol for Real-time communication for the web) "serverless" connections using free infrastructure such as Bittorrent, Nostr, MQTT, IPFS, and Firebase (if you register for an account).

The Trystero API is very simple, you just create a room.

\`\`\`
import {joinRoom} from 'trystero'
const room = joinRoom({appId: 'my-first-chatapp', password: 'password'}, 'chatapp')
\`\`\`

you can handle join/leaves and add message handlers

\`\`\`
room.onPeerJoin(id => {})
room.onPeerLeave(id => {})

const [send, receive] = room.makeAction('message')

receive(data, id => { console.log(data.message)})
send({message: 'hello world'})
send({message: 'hey ' + id, id})
\`\`\`

With these simple tools you can turn a website into a chatroom!

\`\`\`
import { joinRoom, selfId } from './trystero-torrent.min.js'

const room = joinRoom({appId: 'example2', password: 'password'}, 'chatapp')

const [send, receive] = room.makeAction('message')

const input = Object.assign(
  document.createElement('input'),
  { placeholder: 'Type into me',
    onkeyup: ({key}) => { if (key === 'Enter') {
      input.after(Object.assign(document.createElement('div'), {
        innerHTML: selfId + ' ' + input.value
       }))
      send({message: input.value})
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
  if (get) {get.remove()}
  const peerDiv = document.createElement('div')
  peerDiv.id = id
  peerDiv.textContent = id + ' has left.'
  input.after(peerDiv)
})

receive((data, id) => {
  const msgDiv = document.createElement('div')
  msgDiv.innerHTML = id + ' ' + data.message
  input.after(msgDiv)
})
\`\`\`

https://html5lightning.deno.dev/example2.html

<iframe src='./example2.html'></iframe>
<div id='example2'></div>

Questions?

<hr>

`

db.wave = `

Add the best thing about Google Wave to your chat...

\`\`\`
import { joinRoom, selfId } from './trystero-torrent.min.js'

const room = joinRoom({appId: 'example3', password: 'password'}, 'chatapp')

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


\`\`\`

https://html5lightning.deno.dev/example3.html

<iframe src='./example3.html'></iframe>
<div id='example3'></div>

Questions?!

`

db.bog = `
### The Bog Protocol

Let's add some ed25519 and sha256 on top of this serverless chatroom!

Why? to authenticate message integrety even if we are storing the messages elsewhere.

We send around messages this way:

\`\`\`
<ed25519 Public Key><Signature>
\`\`\`

Which opens to this:

\`\`\`
<timestamp><ed25519 Public Key><Previous Post Hash><Data Hash><Post Hash>
\`\`\`

And from that we create a message object:

\`\`\`
{
  timestamp: <timestamp>,
  author: <ed25519 Public Key>,
  previous: <sha256 hash from previous post>,
  data: <sha256 hash of post data>,
  hash: <sha256 hash of post (ts, author, data)>,
}
\`\`\`

That's the protocol, how do we use it?

\`\`\`
import { bogbot } from 'https://cdn.jsdelivr.net/gh/evbogue/bogbookv4/bogbot.js'

const keypairDiv = Object.assign(document.createElement('div'), {textContent: bogbot.pubkey()})

document.body.appendChild(keypairDiv)

\`\`\`

And then to sign messages we'll use 

\`\`\`
const signed = await bogbot.publish(input.value)

const opened = await bogbot.open(signed)
\`\`\`

https://html5lightning.deno.dev/example4.html

<iframe src='./example4.html'></iframe>
<div id='example4'></div>

Questions?!

<hr />

### Homework

+ Store the messages in localStorage or IndexedDB
+ Render markdown
+ Track the latest message so we can sync all message history
+ Create feeds of messages for profile pages and home feeds
+ Search
+ Add avatar images and names
+ Private direct messages

Esoteric/practical questions:

+ Edit? Delete?
+ Do we need message types?

If you're interested in exploring this topic further here are two implementations of the Bog Protocol: https://bogbook.com/ and https://decent.deno.dev/

And I'm also happy to discuss how this protocol differs from other similar attempts such as IPFS, Nostr, Secure-Scuttlebot, and Bluesky. And ask me how about this differs from the ActivityPub "Fediverse".

https://html5lightning.deno.dev/ <-- the talk.

<div id='talkurl'></div>

`
