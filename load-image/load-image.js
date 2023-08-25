let handleClickEvent = (svgWidth, svgHeight, imageWidth, imageHeight, event) => {
  let imageAspect = imageWidth / imageHeight
  let svgAspect = svgWidth / svgHeight

  let imageIsPortrait   = imageWidth < imageHeight
  let imageIsLandscape  = imageWidth > imageHeight
  let svgIsPortrait     = svgWidth < svgHeight
  let svgIsLandscape    = svgWidth > svgHeight

  let xOffset = 0
  let yOffset = 0
  let scaledImageWidth = svgWidth
  let scaledImageHeight = svgHeight

  if (imageIsLandscape && svgIsPortrait) {
    scaledImageWidth = svgHeight * imageAspect
    xOffset = (svgWidth - scaledImageWidth) / 2
  } else if (imageIsPortrait && svgIsLandscape) {
    scaledImageHeight = svgWidth / imageAspect
    yOffset = (svgHeight - scaledImageHeight) / 2
  } else if (imageIsLandscape && svgIsLandscape && imageAspect > svgAspect) {
    scaledImageHeight = svgWidth / imageAspect
    yOffset = (svgHeight - scaledImageHeight) / 2
  } else {
    scaledImageWidth = svgHeight * imageAspect
    xOffset = (svgWidth - scaledImageWidth) / 2
  }

  let x = event.clientX - event.currentTarget.getBoundingClientRect().left
  let y = event.clientY - event.currentTarget.getBoundingClientRect().top

  let clickableImageBox = {
    left: xOffset,
    top: yOffset,
    right: xOffset + scaledImageWidth,
    bottom: yOffset + scaledImageHeight
  }

  let inClickableArea = x >= clickableImageBox.left &&
    x <= clickableImageBox.right &&
    y >= clickableImageBox.top &&
    y <= clickableImageBox.bottom

  if (inClickableArea) {
    // Translate the click coordinates relative to the rendered image content
    let translatedX = x - xOffset
    let translatedY = y - yOffset

    // Scale the translated coordinates to the original image dimensions
    let scaledX = (translatedX / scaledImageWidth) * imageWidth
    let scaledY = (translatedY / scaledImageHeight) * imageHeight

    return {x:scaledX, y:scaledY}
    // Handle the click as needed
  }
}

let svg = document.querySelector('svg')
let imageWidth = 2000 // Actual image width
let imageHeight = 1500 // Actual image height
let svgWidth = svg.clientWidth
let svgHeight = svg.clientHeight

svg.addEventListener('click', (event) => {
  console.log(handleClickEvent(svgWidth, svgHeight, imageWidth, imageHeight, event))
})
