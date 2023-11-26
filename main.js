import { createRenderer } from "./markdown"

const url = new URL(location)

const url_content = url.searchParams.get('content')

const contentEl = document.getElementById('content')

/** @type {HTMLTextAreaElement} */
const editorEl = document.getElementById('editor')

if (url.searchParams.has('noeditor')) {
  editorEl.style.display = 'none'
}

const md = createRenderer()

if (url_content) {
  contentEl.innerHTML = md.render(url_content)
  editorEl.value = url_content
}

editorEl.addEventListener('input', (e) => {
  const content = e.target.value

  contentEl.innerHTML = md.render(content)

  url.searchParams.set('content', content)

  history.pushState(null, null, url)
})
