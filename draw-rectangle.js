const tools = document.querySelectorAll('.toolset .tool')

tools.forEach(tool => {
  tool.addEventListener('click', function() {
    tools.forEach(t => t.classList.remove('active'))
    this.classList.add('active')
  })
})
