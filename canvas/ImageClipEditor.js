export class ImageClipEditor extends HTMLElement {
  constructor(){
    super()
    this.innerHTML = `
      <img src draggable=false>
    `
  }

  connectedCallback(){

  }

  set data(clips=[]){
    this.clips = clips
  }

  get data(){
    return this.clips
  }

  static get observedAttributes(){
    return ['img-src']
  }

  attributeChangedCallback(attribute, oldValue, newValue){

  }

  render(){

  }

  listen(){

  }
}

customElements.define('image-clip-editor', ImageClipEditor)