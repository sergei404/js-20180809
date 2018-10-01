import PhoneCatalog from './components/phone-catalog.js';
import PhoneViewer from './components/phone-viewer.js';
import PhoneFilter from './components/phone-filter.js';
import ShoppingCart from './components/shopping-cart.js';


import PhoneService from './services/phone-service.js';

export default class PhonesPage {
  constructor({element}) {
    this._element = element;

    this._render();

    this._initViewer();

    this._initCatalog();

    this._initShoppingCart();

    this._initFilter();
  }

  _initCatalog() {
    this._catalog = new PhoneCatalog({
      element: document.querySelector('[data-component="phone-catalog"]')
    });

    PhoneService.getPhones()
      .then((phones) => {
        this._catalog.showPhones(phones);
      });

    this._catalog.on('phoneSelected', (event) => {
      let phonePromise = PhoneService.getPhone(event.detail)
        .then((phone) => {
          this._catalog.hide();
          this._viewer.showPhone(phone);
        });
      // let clickPromise = new Promise((resolve) => {
      //   document.oncontextmenu = () => {
      //     resolve(123);
      //   }
      // })
      //
      // clickPromise
      //   .then(() => phonePromise)
      //   .then(phone => {
      //     console.log(phone)
      //   })

      // Promise.all([phonePromise, clickPromise])
      //   .then(([phone, clickResult]) => {
      //     console.log(clickResult);
      //     this._catalog.hide();
      //     this._viewer.showPhone(phone);
      //   });


    })

    this._catalog.on('addToShoppingCart', (event) => {
      let phoneId = event.detail;
      this._shoppingCart.addItem(phoneId);
    })
  }

  _initViewer() {
    this._viewer = new PhoneViewer({
      element: this._element.querySelector('[data-component="phone-viewer"]')
    })

    this._viewer.on('back', () => {
      this._catalog.show();
      this._viewer.hide();
    })

    this._viewer.on('addToShoppingCart', (event) => {
      let phoneId = event.detail;

      this._shoppingCart.addItem(phoneId);
    })
  }

  _initShoppingCart() {
    this._shoppingCart = new ShoppingCart({
      element: document.querySelector('[data-component="shopping-cart"]'),
    })
  }

  _initFilter() {
    this._filter = new PhoneFilter({
      element: this._element.querySelector('[data-component="phone-filter"]')
    })

    this._filter.on('sort', async (event) => {
      try {
        let phones = await PhoneService.getPhones({ orderField: event.detail });
        this._catalog.showPhones(phones);
      } catch (e) {
        console.error(e);
      }

    })

    this._filter.on('search', async (event) => {
      let phones = await PhoneService.getPhones({ query: event.detail })
        .catch(e => {
          console.error(e);
        })
      this._catalog.showPhones(phones);
    })
  }

  _render() {
    this._element.innerHTML = `
    <div class="row">

        <!--Sidebar-->
        <div class="col-md-2">
            <section>
               <div data-component="phone-filter"></div>
            </section>

            <section>
                <div data-component="shopping-cart"></div>
            </section>
        </div> 
        
        <!-- Main Catalog -->
        <div class="col-md-10" data-component="phone-catalog"></div>
        
        <!-- Phone Viewer -->
        <div data-component="phone-viewer" class="js-hidden"></div>

    </div>
    `;
  }
}
