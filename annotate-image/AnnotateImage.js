export class AnnotateImage extends HTMLElement {
  constructor() {
      super();
      this.innerHTML = `    <header>
      <input type="file" id="imageUpload">
      <button id="exportBtn">Export</button>
  </header>
  <div id="clipPane"></div>
  <figure id="imageFigure"></figure>`
      this.state = { metadata: null, clips: [] };
      this.currentSelection = null;
  }

  connectedCallback() {
      this.querySelector('#imageUpload').addEventListener('change', this.handleImageUpload.bind(this));
      this.querySelector('#exportBtn').addEventListener('click', this.handleExport.bind(this));
      this.querySelector('#imageFigure').addEventListener('mousedown', this.startSelection.bind(this));
      this.querySelector('#imageFigure').addEventListener('mousemove', this.updateSelection.bind(this));
      this.querySelector('#imageFigure').addEventListener('mouseup', this.endSelection.bind(this));
  }

  handleImageUpload(e) {
      // Load the image and update the metadata
  }

  handleExport() {
      // Download this.state as a JSON file
  }

  startSelection(e) {
      // Start a new selection
  }

  updateSelection(e) {
      // Update the current selection
  }

  endSelection(e) {
      // Create a new clip and reset the current selection
  }

  createClip(coordinates, annotation) {
      // Create a new clip with the given coordinates and annotation
  }
}

customElements.define('annotate-image', AnnotateImage);
