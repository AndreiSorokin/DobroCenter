$(document).ready(function() {
   $.getScript('./app.js')
})

const images = document.querySelectorAll('.images')
images.forEach(function(element) {
   element.addEventListener('click', () => {
      element.classList.toggle("active")
   })
})