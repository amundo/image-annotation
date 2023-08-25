
function logClick() {
  let svg = document.querySelector('svg')
  let image = document.querySelector('image')
  
  let naturalWidth, naturalHeight
  
  let image2 = new Image()
  image2.addEventListener('load', loadEvent => { naturalWidth = image2.naturalWidth; naturalHeight = image2.naturalHeight })
  image2.src = 'mereri.jpg'
  
  image.addEventListener('click', function (e) {
    var pt = svg.createSVGPoint()
    pt.x = e.clientX
    pt.y = e.clientY
    
    var globalPoint = pt.matrixTransform(svg.getScreenCTM().inverse())
    var imagePoint = globalPoint.matrixTransform(image.getCTM().inverse())
    
    // If the image is scaled, apply the scaling factor
    var scaledX = imagePoint.x * (naturalWidth / image.width.baseVal.value)
    var scaledY = imagePoint.y * (naturalHeight / image.height.baseVal.value)
    
    console.log("Actual coordinates within image’s natural size:", scaledX, scaledY)
  })
}

export {logClick}