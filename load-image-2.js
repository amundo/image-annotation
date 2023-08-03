export let loadImage = changeEvent => {
  let image = changeEvent.target.files[0]
  let url = URL.createObjectURL(image)
  console.log(`${image}`)
  let imageHTML = `<image id=svg-image href="${url}" width="100%"  />`
  // let imageHTML = `<image id=svg-image href="${url}" x="0" y="0" width="100%" height="100%" preserveAspectRatio="xMidYMid meet"/>`
  document.querySelector('svg').insertAdjacentHTML('beforeend', imageHTML)
}

document.querySelector('input[type=file]')
  .addEventListener('change', changeEvent => loadImage(changeEvent))