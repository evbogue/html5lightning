import { db } from './db.js'
import { marked } from "https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js";

for (let prop in db) {
  document.body.appendChild(Object.assign(document.createElement('div'), {innerHTML: marked.parse(db[prop])}))
}

