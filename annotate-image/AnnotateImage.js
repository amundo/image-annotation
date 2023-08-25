class AnnotateImage extends HTMLElement {
  constructor() {
    super()
    this.innerHTML = `
      <header>annotate image</header
      <aside>
        <div class="toolset">
          <button title="add rectangle" class="active tool" data-tool="rect">
            <svg width="1em" height="1em">
              <rect width="100%" height="100%" fill="none" stroke="black" stroke-width="1" />
            </svg>
          </button>

          <button title="add circle" class="tool" data-tool="circle">
            <svg width="1em" height="1em">
              <circle width="100%" height="100%" fill="none" stroke="black" stroke-width="1" cy="50%" r="45%" cx="50%"/>
            </svg>
          </button>

          <button title="add polygon" class="tool" data-tool="polygon">
            <svg width="1em" height="1em">
              <polygon  width="100%" height="100%" points="128,62 102,140 198,89 128,62" />
            </svg>
          </button>

        </div>
      </aside>
      <main class="draw">
        <svg width="100%" height="100%">
        </svg>  
      </main>
    `

    this.tools = this.querySelectorAll(".toolset .tool")
    this.svg = this.querySelector("main svg")
    this.selectedTool = "rect" // Default selected tool

    this.tools.forEach((tool) => {
      tool.addEventListener("click", (clickEvent) => {
        this.tools.forEach((t) => t.classList.remove("active"))
        clickEvent.currentTarget.classList.add("active")
        this.selectedTool = clickEvent.currentTarget.getAttribute("data-tool")
      })
    })

    this.isDrawing = false

    this.currentPolygonPoints = []

    this.svg.addEventListener("mousedown", (mousedownEvent) => {
      if (this.selectedTool === "polygon") {
        this.handlePolygonClick(mousedownEvent)
      } else {
        this.isDrawing = true
        const shape = this.createShape(
          mousedownEvent.offsetX,
          mousedownEvent.offsetY,
        )
        if (shape) {
          this.currentShape = shape
          this.svg.appendChild(shape)
        }
      }
    })

    this.svg.addEventListener("mousemove", (mousemoveEvent) => {
      if (this.isDrawing && this.currentShape) {
        this.updateShape(mousemoveEvent)
      }
    })

    this.svg.addEventListener("mouseup", () => {
      this.isDrawing = false
      this.currentShape = null
    })
  }

  createShape(x, y) {
    const shape = document.createElementNS(
      "http://www.w3.org/2000/svg",
      this.selectedTool,
    )
    shape.setAttribute("x", x)
    shape.setAttribute("y", y)

    if (this.selectedTool === "rect") {
      shape.setAttribute("width", "0")
      shape.setAttribute("height", "0")
    } else if (this.selectedTool === "circle") {
      shape.setAttribute("r", "0")
      shape.setAttribute("cx", x)
      shape.setAttribute("cy", y)
    }

    return shape
  }

  updateShape(mousemoveEvent) {
    const x = this.currentShape.getAttribute("x")
    const y = this.currentShape.getAttribute("y")

    if (this.selectedTool === "rect") {
      this.currentShape.setAttribute("width", mousemoveEvent.offsetX - x)
      this.currentShape.setAttribute("height", mousemoveEvent.offsetY - y)
    } else if (this.selectedTool === "circle") {
      const radius = Math.sqrt(
        (mousemoveEvent.offsetX - x) ** 2 + (mousemoveEvent.offsetY - y) ** 2,
      )
      this.currentShape.setAttribute("r", radius)
    }
  }

  handlePolygonClick(mousedownEvent) {
    const x = mousedownEvent.offsetX
    const y = mousedownEvent.offsetY

    // Check if the click is close to the first point to complete the polygon
    if (this.currentPolygonPoints.length > 2) {
      const firstPoint = this.currentPolygonPoints[0]
      const distance = Math.sqrt(
        (x - firstPoint.x) ** 2 + (y - firstPoint.y) ** 2,
      )
      if (distance < 10) { // 10 is a threshold, you can adjust it
        this.currentPolygonPoints.push(this.currentPolygonPoints[0]) // Add the first point to close the shape
        const polygon = this.createPolygon()
        if (polygon) {
          this.svg.appendChild(polygon)
          this.currentPolygonPoints = []
          return
        }
      }
    }

    // Add a new point to the polygon points
    this.currentPolygonPoints.push({ x, y })
  }

  createPolygon() {
    if (this.currentPolygonPoints.length < 3) return null

    const polygon = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "polygon",
    )
    const points = this.currentPolygonPoints.map((point) =>
      `${point.x},${point.y}`
    ).join(" ")
    polygon.setAttribute("points", points)

    return polygon
  }
}

customElements.define("annotate-image", AnnotateImage)

export { AnnotateImage }
