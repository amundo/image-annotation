
const fileInput = document.querySelector('input[type=file]')
fileInput.addEventListener('change', async function() {
  const file = fileInput.files[0];
  const url = URL.createObjectURL(file);

  try {
    const response = await fetch(url);
    const svgString = await response.text();

    const div = document.querySelector('div')
    div.innerHTML = svgString; // Render the SVG into the page

    const svgElement = div.querySelector('svg');

    // Remove any existing viewBox attribute
    svgElement.removeAttribute('viewBox');

    const bbox = svgElement.getBBox(); // Get the bounding box

    // Create and set the viewBox attribute based on the bounding box
    const viewBox = `${bbox.x} ${bbox.y} ${bbox.width} ${bbox.height}`;
    svgElement.setAttribute('viewBox', viewBox);

    // Optional: Set the width and height of the SVG to fit the div
    svgElement.setAttribute('width', '100%');
    svgElement.setAttribute('height', '100%');
  } catch (error) {
    console.error('An error occurred while reading the SVG file:', error);
  } finally {
    URL.revokeObjectURL(url); // Clean up the object URL
  }
});
