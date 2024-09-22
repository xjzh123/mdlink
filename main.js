import { createRenderer } from "./markdown"

const url = new URL(location)

const searchParams = new URLSearchParams(url.hash.slice(1))

if (url.searchParams.size ?? url.searchParams.toString().length) {
  for (let [key, val] of url.searchParams.entries()) {
    searchParams.set(key, val)
  }

  url.search = ''

  url.hash = searchParams.toString()

  history.pushState(null, null, url)
}

const url_content = searchParams.get('content')

const contentEl = document.getElementById('content')

const linkEl = document.getElementById('link')

const toggleEdtiorEl = document.getElementById('toggle-editor')

const toolsEl = document.getElementById('tools')

let isEditorHidden = true

/** @type {HTMLTextAreaElement} */
const editorEl = document.getElementById('editor')

const isSearchParamFalse = (key) => {
  return !searchParams.has(key) || searchParams.get(key) === 'false'
}

if (isSearchParamFalse('noeditor')) {
  toggleEdtiorEl.classList.remove('hidden')

  if (isSearchParamFalse('hideeditor')) {
    toolsEl.classList.remove('hidden')

    isEditorHidden = false
  }
}

const md = createRenderer()

if (url_content) {
  contentEl.innerHTML = md.render(url_content)
  editorEl.value = url_content
}

linkEl.value = url

editorEl.addEventListener('input', () => {
  if (editorEl.selectionStart === editorEl.selectionEnd && editorEl.selectionStart === editorEl.value.length) {
    editorEl.scrollTo(editorEl.scrollLeft, editorEl.scrollHeight)
    contentEl.scrollTo(contentEl.scrollLeft, contentEl.scrollHeight)
  }
})

editorEl.addEventListener('input', (e) => {
  const content = e.target.value

  contentEl.innerHTML = md.render(content)

  searchParams.set('content', content)

  url.hash = searchParams.toString()

  history.pushState(null, null, url)

  linkEl.value = url.toString()
})

linkEl.addEventListener('click', (e) => {
  navigator.clipboard.writeText(url.toString())
  linkEl.value = 'Copied to clipboard!'
  setTimeout(() => {
    linkEl.value = url.toString()
  }, 500);
})

toggleEdtiorEl.addEventListener('click', (e) => {
  toolsEl.classList.toggle('hidden')

  isEditorHidden = !isEditorHidden

  if (isEditorHidden) {
    searchParams.set('hideeditor', 'true')
  } else {
    searchParams.delete('hideeditor')
  }

  url.hash = searchParams.toString()

  history.pushState(null, null, url)
})
