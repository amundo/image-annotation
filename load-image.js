export let loadImage = changeEvent => {
  console.log(changeEvent.target)
  let image = changeEvent.target.files[0]
  alert(image.name)
}

document.querySelector('input[type=file]')
  .addEventListener('change', changeEvent => loadImage(changeEvent))