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

      // editorEl.value = editorEl.value.slice(0, editorEl.selectionStart) + ' '.repeat(j - i - 1) + editorEl.value.slice(editorEl.selectionStart, -1)

      document.execCommand('insertText', false, ' '.repeat(j - i - 1))
    }
  }
})

editorEl.addEventListener('input', (e) => {
  const content = e.target.value

  contentEl.innerHTML = md.render(content)

  url.searchParams.set('content', content)

  history.pushState(null, null, url)
})
