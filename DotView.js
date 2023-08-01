class DotView extends HTMLElement {
  constructor(){
    super();
    
    this.classList.add('dot-view');
    
    const x = this.getAttribute('x');
    const y = this.getAttribute('y');
    const i = this.getAttribute('i');
    const width = this.getAttribute('width') || 10;
    const backgroundColor = this.getAttribute('backgroundColor') || 'red';

    this.textContent = i;
    this.style.backgroundColor = backgroundColor;
    this.style.left = `${Math.floor(x - width/2)}px`;
    this.style.top = `${Math.floor(y - width/2)}px`;
    this.listen();
  }

  render(){
    return this;
  } 

  listen(){
    this.addEventListener('click', clickEvent => {
      if(clickEvent.shiftKey){
        this.dispatchEvent(new CustomEvent('destroy-dot-view', {
          bubbles: true,
          detail: this.annotation
        }));
      }
    });
  }

  connectedCallback() {
    this.listen();
  }

  disconnectedCallback() {
    // Unbind all event handlers here to prevent memory leaks
  }
}

customElements.define('dot-view', DotView);


export { DotView}