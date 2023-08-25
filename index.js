document.querySelectorAll('.show-image-size')
  .forEach(img => {
    img.addEventListener('load', () => {
      let p = document.createElement('p')
      let {width, height } = img.getBoundingClientRect()
      let {naturalWidth, naturalHeight} = img

      p.innerHTML = `<table>
      <tr><th>naturalWidth</th><td>${parseInt(naturalWidth)}px</td></tr>
      <tr><th>naturalHeight</th><td>${parseInt(naturalHeight)}px</td></tr>
      <tr><th>rendered width</th><td>${parseInt(width)}px</td></tr>
      <tr><th>rendered height</th><td>${parseInt(height)}px</td></tr>
      </table>`
      img.after(p)
    })
  })

document.querySelectorAll('.show-svg-size')
  .forEach(svg => {
      let p = document.createElement('p')
      let {width, height } = svg.getBoundingClientRect()

      p.innerHTML = `<table>
      <tr><th>rendered width</th><td>${parseInt(width)}px</td></tr>
      <tr><th>rendered height</th><td>${parseInt(height)}px</td></tr>
      </table>`
      svg.after(p)
  })