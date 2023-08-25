export let loadImage = async changeEvent => {
  let image = changeEvent.target.files[0]
  let request = new Response(image)
  let blob = await request.blob()

  let imageHTML = `<image id=svg-image x="0" y="0" />`
  document.querySelector('svg').insertAdjacentHTML('beforeend', imageHTML)

  let imageObject = new Image()
  imageObject.src = URL.createObjectURL(blob)
  imageObject.onload = () => {
    let naturalWidth = imageObject.naturalWidth
    let naturalHeight = imageObject.naturalHeight
    document.querySelector('#svg-image').setAttribute('href', URL.createObjectURL(blob))
    document.querySelector('#svg-image').dataset.naturalWidth = naturalWidth
    document.querySelector('#svg-image').dataset.naturalHeight = naturalHeight
  }
}


document.querySelector('input[type=file]')
  .addEventListener('change', changeEvent => loadImage(changeEvent))