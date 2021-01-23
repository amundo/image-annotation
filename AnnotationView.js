import {DotView} from './DotView.js'
import {RectangleView} from './RectangleView.js'

export class AnnotationView {
  constructor({
    el=document.createElement("figure"),
    img
  }){
    this.el = el
    this.el.classList.add("annotation-view")
    this.img = img

    this.annotations = []

    this.reset()
    this.listen()
  }

  reset(){
    this.el.innerHTML = `
      <header class=annotation-view-header>
        <input type=file class=annotation-view-image-loader>
      </header>
      <figure>

      </figure>
    `
  }

  render(){
    this.el.querySelector('figure').appendChild(this.img)
    return this
  }

  listen(){

    this.el.querySelector('figure').addEventListener('mousedown', mousedownEvent => {
      
    })

    let dotAtClick = clickEvent => {
      let x = clickEvent.offsetX
      let y = clickEvent.offsetY 
    
      this.el.appendChild(new DotView({x,y,i: ++i, backgroundColor:"fuchsia"}).render().el)  
    }
    
    document.querySelector('img').addEventListener('click', dotAtClick)
  }
}