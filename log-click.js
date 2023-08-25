export let logClick = element => {
  let p = document.createElement('p')
  element.addEventListener('click', clickEvent => {
  
    document.querySelector('div.info')
      .append(p)
    
    p.innerHTML = `
      <table>
        <caption><code>&lt;${clickEvent.currentTarget.localName}></caption>
        <tr><th></th><th><code>offset</code></th><th><code>client</code></th> </tr>
        <tr>
          <th><code>x</code></th>
    .     <td>${clickEvent.offsetX}px</td>
    .     <td>${clickEvent.clientX}px</td>
        </tr>
        <tr>
          <th><code>y</code></th>
    .     <td>${clickEvent.offsetY}px</td>
    .     <td>${clickEvent.clientY}px</td>
        </tr>
      </table>
    `
  })
}