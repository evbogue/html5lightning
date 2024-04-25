import { marked } from "https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js";

const input = Object.assign(
  document.createElement('input'),
  { placeholder: 'Type into me',
    onkeyup: ({key}) => { if (key === 'Enter') {
      input.after(Object.assign(document.createElement('span'), {innerHTML: marked.parse(input.value)}))
      /*send to friends here*/
      input.value = ''
    }
  }}
)

document.body.appendChild(input)

