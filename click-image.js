export let loadImage = changeEvent => {
  let imageBlob = changeEvent.target.files[0]
  let url = URL.createObjectURL(imageBlob)

  let offlineImage = new Image()
  offlineImage.src = url
  let imageElement = document.querySelector('image')
  imageElement.setAttribute('href', url)
  
  offlineImage.onload = () => {
    let naturalWidth = offlineImage.naturalWidth
    let naturalHeight = offlineImage.naturalHeight
    imageElement.dataset.naturalWidth = naturalWidth
    imageElement.dataset.naturalHeight = naturalHeight
  
  }


}

document.querySelector('input[type=file]')
  .addEventListener('change', changeEvent => loadImage(changeEvent))

document.querySelector('div.info').innerHTML = ``

// logClick(document.querySelector('image'))
// logClick(document.querySelector('svg'))
// logClick(document.querySelector('body'))  

