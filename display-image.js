export let loadImage = changeEvent => {
  let image = changeEvent.target.files[0]
  let url = URL.createObjectURL(image)
  // let imageHTML = `<image id=svg-image href="${url}" width="100%"  />`
  let imageHTML = `<image id=svg-image href="${url}" />`
  document.querySelector('svg').insertAdjacentHTML('beforeend', imageHTML)
}

document.querySelector('input[type=file]')
  .addEventListener('change', changeEvent => loadImage(changeEvent))
