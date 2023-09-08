class AnnotateImage extends HTMLElement {
  #annotations = []
  #selections = []

  #currentCommand = "move"
  #currentSelection = null
  #image = new Image()

  constructor(){
    super()
    this.innerHTML = `   
    <header>
      <h1>Annotate image</h1> 
      <input type=file> 
      <button class=export-data>export</button>
    </header>
    <nav>
      <label><input name=current-command type="radio" value="move" checked> pan and zoom</label>
      <label><input name=current-command type="radio" value="select"> select</label>
    </nav>
    <svg>
      <image></image>
    </svg>
    <section class=annotate>
      annotate here
    </section>
   `

    this.listen()
  }

  async fetch(url){
    let response = await fetch(url)
    let data = await response.json()
    this.data = data
  }

  connectedCallback(){

  }

  get zoomFactor(){

  }

  static get observedAttributes(){
    return ["src"]
  }

  attributeChangedCallback(attribute, oldValue, newValue){
    if(attribute == "src"){
      this.fetch(newValue)
    }
  }

  render(){
  }

  async load(imageFile){
    this.querySelector('image').setAttribute('href', URL.createObjectURL(imageFile))
  }

  listen(){
    this.addEventListener('change', changeEvent => {
      if(changeEvent.target.matches('input[type="file"]')){
        this.load(changeEvent.target.files[0])
      }
    })
  }
}

export {AnnotateImage}
customElements.define('annotate-image', AnnotateImage)
