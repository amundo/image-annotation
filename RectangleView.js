export class RectangleView {
  constructor({
    x1,
    y1,
    x2,
    y2 
    width=10, 
    backgroundColor='red', 
    i
  }){
    this.el = document.createElement('div')
    this.el.classList.add('rectangle-view')

    this.el.textContent = i
    this.el.style.backgroundColor = backgroundColor 
    this.el.style.left = `${Math.floor(x - width/2)}px`
    this.el.style.top = `${Math.floor(y - width/2)}px`
  }

  render(){
    return this
  } 
}