
document.addEventListener('DOMContentLoaded', function() {
    var elems_dropdown = document.querySelectorAll('.dropdown-trigger');
    var instances_dropdown = M.Dropdown.init(elems_dropdown, {hover: true, coverTrigger: false});
    var elems_slider = document.querySelectorAll('.slider');
    var instances_slider = M.Slider.init(elems_slider, {});
    var elems_select = document.querySelectorAll('select');
    var instances_select = M.FormSelect.init(elems_select, {});    
    var elemsModal = document.querySelectorAll('.modal');
    var instancesModal = M.Modal.init(elemsModal, {});
    var elemsInput = document.querySelector('#input_text');
    var instancesInput = M.CharacterCounter.init(elemsInput, {});
  });


//ajax
const $cart = document.querySelector('#cart');
if ($cart) {
  $cart.addEventListener('click', event => {
    if (event.target.classList.contains('js-remove')) {
      const idx = event.target.dataset.id;
      const csrf = event.target.dataset.csrf;
      fetch('cart/substr/' + idx, {
        method: "delete",
        headers: {  'x-csrf-token': csrf, },
      })
      .then(res => res.json())
      .then(({cart, csrf}) => {
          if (cart.length) {
            const updateCart = cart.map(c => {
              return `
                  '<tr>
                      <td>1</td>
                      <td>${c.name}</td>
                      <td>${c.count}</td>
                      <td><button class="btn js-remove" data-id="${c.id}" data-csrf="${csrf}">Delete</button></td>
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
            const csrf = event.target.dataset.csrf;
            fetch('/catalog/remove/' + idx, {
              method: "delete",
              headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'x-csrf-token': csrf,
              }, 
              body: JSON.stringify({"group": group}),
            })
            .then(res => res.json())
            .then(({catalog, csrf}) => {
              if (catalog.length) {
                  const updateCatalog = catalog.map(c => {
                    if (c.visible) {
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
                          <button class="btn-floating waves-effect waves-light darkslategrey">
                            <i class="material-icons btn-remove-catalog-item" data-id="${c._id}" data-group="${c.group}" data-csrf="${csrf}">delete_forever</i>
                          </button>
                      </div>
                      </div>
                    </div>
                    `
                    } else return;
                  }).join('');
                  $catalog_items.innerHTML = updateCatalog;
                } else {
                  $catalog_items.innerHTML = '<p>В этой категории пока нет товаров =(</p>'
                }
            })
        }
    }) 

}

//order search
const $order_search = document.querySelector('#order_search');
if ($order_search) {
  $order_search.addEventListener('click', event => {
    if (event.target.classList.contains('btn-order-search')) {
      const orderNumber = document.querySelector('#input_text');
      var csrf = document.querySelector('meta[name="csrf-token"]').getAttribute('content');4
      fetch('/orders/search/',{
        method: "POST",
        headers: {
           'Content-Type': 'application/json;charset=utf-8',
           'x-csrf-token': csrf, 
          }, 
        body: JSON.stringify({"number": orderNumber.value}),
      })
      .then(res => res.json())
      .then(({search_order, csrf}) => {
        const $order_search_result = document.querySelector('#order_search_result');
        if (search_order) {
        const order_cart = search_order.cart.map(c => {
          return `
          <ol>
            <li>
              ${c.id.name} (x<strong>${c.count}</strong>)
            </li>
        </ol>
        `
        })
        $order_search_result.innerHTML = `
        <meta name="csrf-token" content="${csrf}">
        <div class="row">
        <div class="col s6 offset-s3">
          <div class="card">
            <div class="card-content">
              <span class="card-title">
                Заказ № <small>${search_order.number}</small>
              </span>
              <p class="date">${search_order.date}</p>
              <p><em>{{buyerName}}</em> (${search_order.buyerPhone})</p>
              ${order_cart}
              <hr>
              <p>Цена: <span class="price">${search_order.price}</span></p>
            </div>
          </div>
        </div>
      </div>
        `;
      } else {
        $order_search_result.innerHTML = `
        <meta name="csrf-token" content="${csrf}">
        <p>Заказ не найден</p>
        `
      }
      })
    }
  })
}