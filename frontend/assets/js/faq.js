// Get all accordion items
const accordionItems = document.querySelectorAll('.accordion-item');

// Loop through each accordion item
accordionItems.forEach(item => {
  // Add click event listener to the header of each accordion item
  item.querySelector('.accordion-item-header').addEventListener('click', function() {
    // Toggle the active class to show/hide the content
    this.nextElementSibling.classList.toggle('active');
  });
});
