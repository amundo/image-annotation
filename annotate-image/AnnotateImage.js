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
      <section class=controls>
        <label><input name=current-command type="radio" value="move" checked> pan and zoom</label>
        <label><input name=current-command type="radio" value="select"> select</label>
      </section>
      <section class=undo>
        <button class=undo-button>undo</button>
        <button class=redo-button>redo</button>
      </section>
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

  async loadImage(imageFile){
    let blobUrl = URL.createObjectURL(imageFile)
    this.querySelector('image').setAttribute('href', blobUrl)

    let imageElement = new Image()
    imageElement.src = blobUrl
    imageElement.addEventListener('load', () => {
      this.naturalWidth = imageElement.naturalWidth
      this.naturalHeight = imageElement.naturalHeight
    })
  }

  listen(){
    this.addEventListener('change', changeEvent => {
      if(changeEvent.target.matches('input[type="file"]')){
        this.loadImage(changeEvent.target.files[0])
      }
    })
  }
}

export {AnnotateImage}
customElements.define('annotate-image', AnnotateImage)
