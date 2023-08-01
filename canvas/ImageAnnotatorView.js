export class ImageAnnotatorView {
  constructor({
    el=document.createElement("main")
  }){
    this.el = el
    this.el.classList.add("image-annotator-view")

    this.reset()
    this.listen()
  }

  reset(){
    this.el.innerHTML = `      
      <header>
        <input type="file">
      </header>

      <figure class=image>
        <img src=mystery.jpg draggable=false>
      </figure>

      <div class=annotations>
        
      </div>
    `
  }

  render(){

  }

  select(){
    this.el.querySelectorAll('.selection').forEach(div => {
      div.classList.remove('active-selection')
    })
    let div = document.createElement('div')
    div.classList.add('selection')
    div.style.top = `${this.y1}px`
    div.style.left = `${this.x1}px`
    div.style.width = `${this.width}px`
    div.style.height = `${this.height}px`
    div.classList.add('active-selection')
    this.el.querySelector('figure.image').appendChild(div)
  }

  addClip(){
    let canvas = document.createElement('canvas')
    let context = canvas.getContext('2d')
    canvas.width = this.width
    canvas.height = this.height
    
    // drawImage(image, sourceX1, sourceY1, sourceWidth, sourceHeight, destinationX1, destinationY1, destinationWidth, destinationHeight)
    context.drawImage(this.el.querySelector('figure.image img'), this.x1, this.y1, this.width, this.height, 0, 0, this.width, this.height)

    let input = document.createElement('input')
    
    
    let div = document.createElement('div')
    div.classList.add('annotation')

    div.appendChild(canvas)
    div.appendChild(input)

    this.el.querySelector('.annotations').appendChild(div)

    let rect = div.getBoundingClientRect()
    let { x,y} = rect
    input.value = `${x}, ${y}`
    
  }

  get width(){
    return this.x2 - this.x1
  }

  get height(){
    return this.y2 - this.y1
  }

  listen(){
    this.el.querySelector('input[type=file]').addEventListener('change', changeEvent => {
      let image = this.el.querySelector('figure img')
      image.src = URL.createObjectURL(changeEvent.target.files[0])
    })

    this.el.addEventListener('mousedown', mousedownEvent => {
      if(mousedownEvent.target.matches('figure.image img')){
        this.x1 = mousedownEvent.offsetX
        this.y1 = mousedownEvent.offsetY 
      }
    })

    this.el.addEventListener('mouseup', mouseupEvent => {
      if(mouseupEvent.target.matches('figure.image img')){
        this.x2 = mouseupEvent.offsetX
        this.y2 = mouseupEvent.offsetY 

        this.select()
        this.addClip()  
      }

    })

    this.el.addEventListener('dragstart', dragstartEvent => {
      if(dragstartEvent.target.matches('figure.image img')){
        dragstartEvent.preventDefault()
      }
    })
    
  }
}

/* 
let image = document.querySelector('img')

on keydown, get x1, y1
on keyup, get x2, y2

create a canvas of dimensions width: x2 - x1 height: y2 - y1

canvas.getContext('2d').drawImage(image, x1, x2, y1, y2)



*/