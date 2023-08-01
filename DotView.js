export class DotView {
  constructor({
    x,
    y, 
    width=10, 
    backgroundColor='red', 
    i
  }){
    this.el = document.createElement('div')
    this.el.classList.add('dot-view')

    this.el.textContent = i
    this.el.style.backgroundColor = backgroundColor 
    this.el.style.left = `${Math.floor(x - width/2)}px`
    this.el.style.top = `${Math.floor(y - width/2)}px`
  }

  render(){
    return this
  } 

  listen(){
    this.el.addEventListener('click', clickEvent => {
      if(clickEvent.shiftKey){
        this.el.dispatchEvent(new CustomEvent('destroy-dot-view', {
          bubbles: true,
          detail: this.annotation
        }))
      }
    })
  }
}