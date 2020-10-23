
document.addEventListener('DOMContentLoaded', function() {
    var elems_dropdown = document.querySelectorAll('.dropdown-trigger');
    var instances_dropdown = M.Dropdown.init(elems_dropdown, {hover: true, coverTrigger: false});
    var elems_slider = document.querySelectorAll('.slider');
    var instances_slider = M.Slider.init(elems_slider, {});
    var elems_select = document.querySelectorAll('select');
    var instances_select = M.FormSelect.init(elems_select, {});    
    var elemsModal = document.querySelectorAll('.modal');
    var instancesModal = M.Modal.init(elemsModal, {});
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

const $catalog_items = document.querySelector("#catalog_items");
if ($catalog_items) {
    $catalog_items.addEventListener('click', event => {
        if (event.target.classList.contains('btn-remove-catalog-item')) {
            const idx = event.target.dataset.id;
            const group = event.target.dataset.group;
            fetch('/catalog/remove/' + idx, {
              method: "delete",
              headers: { 'Content-Type': 'application/json;charset=utf-8' }, 
              body: JSON.stringify({"group": group}),
            })
            .then(res => res.json())
            .then((catalog) => {
              console.log(catalog);
              if (catalog.length) {
                  const updateCatalog = catalog.map(c => {
                    return `
                    <div class="col s12 m4">
                    <div class="card">
                      <div class="card-image">
                        <img src="/${c.imgURL[0]}">
                      </div>
                      <div class="card-content">
                        <span class="card-title">${c.name}</span>
                        <p class="price big">${c.price}</p>
                      </div>
                      <div class="card-action">
                        <a href="/catalog/${c._id}" target="_blank"><button class="btn-floating waves-effect waves-light darkslategrey" type="submit"><i class="material-icons">open_in_new</i></button></a>
                        <form action="/cart/add" method="POST">
                          <input type="hidden" name="id" value="${c._id}" >
                          <button class="btn-floating waves-effect waves-light darkslategrey" type="submit"><i class="material-icons">add_shopping_cart</i></button>
                        </form>
                        <button class="btn-floating waves-effect waves-light darkslategrey btn-remove-catalog-item" data-id="${c._id}" data-group="${c.group}">
                            <i class="material-icons">delete_forever</i>
                          </button>
                      </div>
                      </div>
                    </div>
                    `
                  }).join('');
                  $catalog_items.innerHTML = updateCatalog;
                } else {
                  $catalog_items.innerHTML = '<p>В этой категории пока нет товаров =(</p>'
                }
            })
        }
    }) 

}