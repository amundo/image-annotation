export let loadImage = changeEvent => {
  let image = changeEvent.target.files[0]
  let url = URL.createObjectURL(image)

  document.querySelector('#width-and-height image')
    .setAttribute('href', url)
}

document.querySelector('input[type=file]')
  .addEventListener('change', changeEvent => loadImage(changeEvent))