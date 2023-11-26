# MdLink

This is a vary simple markdown editor. It can store and retrieve content in URL params, so it can be used as a embeded markdown renderer, or a link to a piece of markdown or LaTeX content. This can be used where markdown or LaTeX is not supported.

All function is implemented in browser and doesn't upload anything. However, it is XSS vulnerable, for it allows HTML.

## Features

- Embedable URL
- Markdown powered by remarkable.js
- Syntax highlight powered by highlight.js
- $\LaTeX$ support powered by KaTeX

## URL examples:

- normal

  ```
  https://mdlink.netlify.app/?content=%23+MdLink
  ```

- no editor (only rendered result)

  ```
  https://mdlink.netlify.app/?noeditor&content=%23+MdLink
  ```

- This readme

  ```
  https://mdlink.netlify.app/?content=%23+MdLink%0A%0AThis+is+a+vary+simple+markdown+editor.+It+can+store+and+retrieve+content+in+URL+params%2C+so+it+can+be+used+as+a+embeded+markdown+renderer%2C+or+a+link+to+a+piece+of+markdown+or+LaTeX+content.+This+can+be+used+where+markdown+or+LaTeX+is+not+supported.%0A%0AAll+function+is+implemented+in+browser+and+doesn%27t+upload+anything.+However%2C+it+is+XSS+vulnerable%2C+for+it+allows+HTML.%0A%0A%23%23+Features%0A%0A-+Embedable+URL%0A-+Markdown+powered+by+remarkable.js%0A-+Syntax+highlight+powered+by+highlight.js%0A-+%24%5CLaTeX%24+support+powered+by+KaTeX%0A%0A%23%23+URL+examples%3A%0A%0A-+normal%0A%0A++%60%60%60%0A++https%3A%2F%2Fmdlink.netlify.app%2F%3Fcontent%3D%2523%2BMdLink%0A++%60%60%60%0A%0A-+no+editor+%28only+rendered+result%29%0A%0A++%60%60%60%0A++https%3A%2F%2Fmdlink.netlify.app%2F%3Fnoeditor%26content%3D%2523%2BMdLink%0A++%60%60%60%0A%0A-+This+readme%0A%0A++%60%60%60%0A++%28recursive%29%0A++%60%60%60%0A
  ```
