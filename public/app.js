
document.addEventListener('DOMContentLoaded', function() {
    var elems_dropdown = document.querySelectorAll('.dropdown-trigger');
    var instances_dropdown = M.Dropdown.init(elems_dropdown, {hover: true, coverTrigger: false});
    var elems_slider = document.querySelectorAll('.slider');
    var instances_slider = M.Slider.init(elems_slider, {});
    var elems_select = document.querySelectorAll('select');
    var instances_select = M.FormSelect.init(elems_select, {});    
  });

//ajax
const $cart = document.querySelector('#cart');
if ($cart) {
  $cart.addEventListener('click', event => {
    if (event.target.classList.contains('js-remove')) {
      const idx = event.target.dataset.id;
      fetch('cart/substr/' + idx, {
        method: "delete"
      })
      .then(res => res.json())
      .then((cart) => {
          if (cart.length) {
            const updateCart = cart.map(c => {
              return `
                  '<tr>
                      <td>1</td>
                      <td>${c.name}</td>
                      <td>${c.count}</td>
                      <td><button class="btn js-remove" data-id="${c.id}">Delete</button></td>
                  </tr>
              `
            }).join('');
            document.querySelector('tbody').innerHTML = updateCart;
          } else {
            $cart.innerHTML = '<p> There are nothing. </p>'
          }
      })
    }
  } )
}