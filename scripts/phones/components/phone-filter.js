import Component from '../../common/component.js';

export default class PhoneFilter extends Component {
  constructor({element}) {
    super({element});
    this._element = element;

    this._render();

    window.handlePhonesSort = (event) => {
      this._trigger('sort', event.target.value);
    }

    window.handlePhonesSearch = (event) => {
      this._trigger('search', event.target.value);
    }
  }

  _render() {
    this._element.innerHTML = `
<p>
    Search:
    <input
        type="text"
        oninput="window.handlePhonesSearch(event)"
    >
</p>

<p>
    Sort by:
    <select onchange="window.handlePhonesSort(event)">
        <option value="name">Alphabetical</option> 
        <option value="age">Newest</option>
    </select> 
</p>
    `
  }
}
