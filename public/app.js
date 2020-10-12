document.addEventListener('DOMContentLoaded', function() {
    var elems_dropdown = document.querySelectorAll('.dropdown-trigger');
    var instances_dropdown = M.Dropdown.init(elems_dropdown, {});
    var elems_slider = document.querySelectorAll('.slider');
    var instances_slider = M.Slider.init(elems_slider, {});
  });