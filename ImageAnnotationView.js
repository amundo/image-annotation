import { DotView} from './DotView.js'


class ImageAnnotationView extends HTMLElement {
  constructor(){
    super();

    this.innerHTML = `
      <header>
        <input type="file">
      </header>

      <figure class=image>
        <img src=canvas/mystery.jpg draggable=false>
      </figure>

      <div class=annotations>
      </div>
    `;
    this.listen();
  }

  static get observedAttributes(){
    return ['src']
  }

  attributeChangedCallback(attribute, oldValue, newValue){
    if(attribute == 'src'){
      this.querySelector('figure.image img').src = newValue
    }
  }

  render(){

  }

  select(){
    this.querySelectorAll('.selection').forEach(div => {
      div.classList.remove('active-selection')
    })
    let div = document.createElement('div')
    div.classList.add('selection')
    div.style.top = `${this.y1}px`
    div.style.left = `${this.x1}px`
    div.style.width = `${this.width}px`
    div.style.height = `${this.height}px`
    div.classList.add('active-selection')
    this.querySelector('figure.image').appendChild(div)
  }

  addClip(){
    let canvas = document.createElement('canvas')
    let context = canvas.getContext('2d')
    canvas.width = this.width
    canvas.height = this.height
    
    context.drawImage(this.querySelector('figure.image img'), this.x1, this.y1, this.width, this.height, 0, 0, this.width, this.height)

    let input = document.createElement('input')
    
    let div = document.createElement('div')
    div.classList.add('annotation')

    div.appendChild(canvas)
    div.appendChild(input)

    this.querySelector('.annotations').appendChild(div)

    let rect = div.getBoundingClientRect()
    let { x,y } = rect
    input.value = `${x}, ${y}`
    
  }

  get width(){
    return this.x2 - this.x1
  }

  get height(){
    return this.y2 - this.y1
  }

  listen(){
    this.querySelector('input[type=file]').addEventListener('change', changeEvent => {
      let image = this.querySelector('figure img')
      image.src = URL.createObjectURL(changeEvent.target.files[0])
    })

    this.addEventListener('mousedown', mousedownEvent => {
      if(mousedownEvent.target.matches('figure.image img')){
        let rect = mousedownEvent.target.getBoundingClientRect();
        this.x1 = mousedownEvent.clientX - rect.left;
        this.y1 = mousedownEvent.clientY - rect.top;
      }
    })

    this.addEventListener('mouseup', mouseupEvent => {
      if(mouseupEvent.target.matches('figure.image img')){
        let rect = mouseupEvent.target.getBoundingClientRect();
        this.x2 = mouseupEvent.clientX - rect.left;
        this.y2 = mouseupEvent.clientY - rect.top;

        this.select()
        this.addClip()  
      }
    })

    this.addEventListener('dragstart', dragstartEvent => {
      if(dragstartEvent.target.matches('figure.image img')){
        dragstartEvent.preventDefault()
      }
    })
  }


  disconnectedCallback() {
    // Unbind all event handlers here to prevent memory leaks
  }
}

customElements.define('image-annotation-view', ImageAnnotationView);

export {ImageAnnotationView}