import {DotView} from './DotView.js'
// import {RectangleView} from './RectangleView.js'

export class AnnotationView extends HTMLElement {
  constructor(){
    super()
    this.innerHTML = `
    <header class=annotation-view-header>
      <input type=file class=annotation-view-image-loader>
    </header>
    <figure>
      <img>
    </figure>
    `

    this.annotations = []

    this.i = 0

    this.listen()

  }

  connectedCallback(){

  }

  static get observedAttributes(){
    return []
  }

  attributeChangedCallback(attribute, oldValue, newValue){

  }

  render(){
    this.querySelector('figure').appendChild(this.img)
    return this

  }

  where(e){
    let rect = e.target.getBoundingClientRect()
    let x = e.clientX - rect.left //x position within the element
    let y = e.clientY - rect.top  //y position within the element
    return {x,y}
  }

  listen(){
    this.querySelector('figure').addEventListener('mousedown', mousedownEvent => {
      
    })

    this.querySelector("input[type=file]").addEventListener('change', changeEvent => {
      let img = this.querySelector('img')
      img.src = URL.createObjectURL(changeEvent.target.files[0])
      img.addEventListener('load', loadEvent => {
        URL.revokeObjectURL(img.src) // free memory
      })
    })
    
    this.querySelector('img').addEventListener('click', clickEvent => {
      let x0 = clickEvent.offsetX
      let y0 = clickEvent.offsetY 
    
      
      let {x,y} = this.where(clickEvent)
      console.log({x,y,x0,y0});
      this.appendChild(new DotView({x,y, i: ++this.i, backgroundColor:"fuchsia"}).render().el)  
    })

  }
}

customElements.define('annotation-view', AnnotationView)

