import { Remarkable, utils } from "remarkable"
const { has, unescapeMd, replaceEntities, escapeHtml } = utils
import { linkify } from "remarkable/linkify"
import hljs from "highlight.js"
import remarkableKatex from "remarkable-katex"

import "katex/dist/katex.css"

import "highlight.js/styles/default.css"

/**
 * @param {Partial<Remarkable.Options>} options
 */
const createRenderer = (options) => {
  const markdownOptions = {
    html: true,
    xhtmlOut: false,
    breaks: false,
    langPrefix: 'hljs language-',
    linkTarget: '_blank" rel="noreferrer',
    typographer: true,
    quotes: `""''`,

    doHighlight: true,

    /**
     * @param {string} code
     * @param {string} lang
     */
    highlight(code, lang) {
      if (!this.doHighlight) {
        return ''
      }

      if (lang && hljs.getLanguage(lang)) {
        try {
          return hljs.highlight(code, { language: lang }).value
        } catch (_) { }
      }

      try {
        return hljs.highlightAuto(code).value
      } catch (_) { }

      return ''
    },

    ...options
  }

  const md = new Remarkable('full', markdownOptions)

  md.renderer.rules.fence = function (tokens, idx, options, env, instance) {
    var token = tokens[idx]
    var langClass = ' class="hljs"'
    var langPrefix = options.langPrefix
    var langName = '', fences, fenceName
    var highlighted

    if (token.params) {
      fences = token.params.split(/\s+/g)
      fenceName = fences.join(' ')

      if (has(instance.rules.fence_custom, fences[0])) {
        return instance.rules.fence_custom[fences[0]](tokens, idx, options, env, instance)
      }

      langName = escapeHtml(replaceEntities(unescapeMd(fenceName)))
      langClass = ' class="' + langPrefix + langName + '"'
    }

    if (options.highlight) {
      highlighted = options.highlight.apply(options, [token.content].concat(fences))
        || escapeHtml(token.content)
    } else {
      highlighted = escapeHtml(token.content)
    }

    return '<pre><code' + langClass + '>'
      + highlighted
      + '</code></pre>'
      + md.renderer.getBreak(tokens, idx)
  }

  md.use(remarkableKatex)

  md.use(linkify)

  return md
}

export { createRenderer }
