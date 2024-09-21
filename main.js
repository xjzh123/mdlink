import { createRenderer } from "./markdown"

const url = new URL(location)

const url_content = url.searchParams.get('content')

const contentEl = document.getElementById('content')

const linkEl = document.getElementById('link')

const toggleEdtiorEl = document.getElementById('toggle-editor')

const toolsEl = document.getElementById('tools')

/** @type {HTMLTextAreaElement} */
const editorEl = document.getElementById('editor')

if (!url.searchParams.has('noeditor')) {
  toolsEl.classList.remove('hidden')
  toggleEdtiorEl.classList.remove('hidden')
}

const md = createRenderer()

if (url_content) {
  contentEl.innerHTML = md.render(url_content)
  editorEl.value = url_content
}

linkEl.value = url

editorEl.addEventListener('input', (e) => {
  console.debug('Input Event: ', e)

  if (e.inputType === 'insertLineBreak' || e.data === '\n') {
    if (editorEl.selectionStart === editorEl.selectionEnd) {
      let i = editorEl.selectionStart - 1
      while (i--) {
        if (editorEl.value.charAt(i) === '\n') {
          break
        }
      }
      let j = i
      while (j++) {
        if (editorEl.value.charAt(j) !== ' ') {
          break
        }
      }

      document.execCommand('insertText', false, ' '.repeat(j - i - 1))
    }
  }

  if (editorEl.selectionStart === editorEl.selectionEnd && editorEl.selectionStart === editorEl.value.length) {
    editorEl.scrollTo(editorEl.scrollLeft, editorEl.scrollHeight)
    contentEl.scrollTo(contentEl.scrollLeft, contentEl.scrollHeight)
  }

  editorEl.value = editorEl.value.replace(/(?:(?!\n)\s)+\n/g, '\n')
})

editorEl.addEventListener('input', (e) => {
  const content = e.target.value

  contentEl.innerHTML = md.render(content)

  url.searchParams.set('content', content)

  history.pushState(null, null, url)

  linkEl.value = url
})

linkEl.addEventListener('click', (e) => {
  navigator.clipboard.writeText(url)
  linkEl.value = 'Copied to clipboard!'
  setTimeout(() => {
    linkEl.value = url
  }, 500);
})

toggleEdtiorEl.addEventListener('click', (e) => {
  toolsEl.style.display = toolsEl.style.display ? '' : 'none'
})
