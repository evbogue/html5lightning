export const db = {}

db.title = `
  # How to turn a static website into a distributed chatroom using Trystero (WebRTC) and the Bog protocol

  (A five to ten minute talk)
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
`

db.intro = `

### Simple Web Design

In the beginning of time people thought the web was going to be for sharing research papers, and thus HTML was designed to format research papers. 

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

Distributing your chat messages is the hard part. 

Most of the time we solve this by using a centralized chat server. 

🤔 Can anyone name a popular chat server company?

`

db.trystero = `
### Trystero

https://oxism.com/trystero

Trystero is software by Dan Motzenbecker that bootstraps WebRTC (a protocol for Real-time communication for the web) connections using free infrastructure such as Bittorrent, Nostr, MQTT, IPFS, and Firebase (if you register for an account).

The Trystero API is very simple, you just create a room.

\`\`\`
import {joinRoom} from 'trystero'
const room = joinRoom({appId: 'my-first-chatapp', password: 'password'}, 'chatapp')
\`\`\`

you can handle join/leaves and add a message handlers

\`\`\`
room.onPeerJoin(id => {})
room.onPeerLeave(id => {})

const [send, receive] = room.makeAction('message')

receive(msg, id => {})
send('hello world')
send('hey ' + id, id)
\`\`\`

With these simple tools you can turn a website into a chatroom!

`
