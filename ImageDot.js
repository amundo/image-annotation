export class ImageDot extends HTMLElement {
  constructor(){
    super()
    
  }

  connectedCallback(){

  }

  static get observedAttributes(){
    return []
  }

  attributeChangedCallback(attribute, oldValue, newValue){

  }

  set width(width){
    this.width = width
  }

  set location({x,y}){
    this.x = x
    this.y = y
  }

  render(){

  }
  listen(){

  }
}

customElements.define('', ImageDot)