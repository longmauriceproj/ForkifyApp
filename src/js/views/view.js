import icons from 'url:../../img/icons.svg';

export default class View {
  _data;
  /**
   * Render the recieved object to the DOM
   * @param {Object | Object[]} data The data to be rendered (e.g. recipe)
   * @param {boolean} [render=true] If false, create markup string instead of rendering to the DOM
   * @returns {undefined | string} A markup string is returned if render=false
   * @this {Object} View instance
   * @author Maurice Loading
   * @todo  Finish implementation
   */
  render(data, render = true) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();
    this._data = data;
    const markup = this._generateMarkup();

    if (!render) return markup;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  update(data) {
    //companion function to render() that will limit the elements that the DOM will reloaded to only those that have changed. More performant.
    this._data = data;
    const newMarkup = this._generateMarkup();
    //convert the text and tags in the newMarkup string to a document fragment (a lightweight version of the document that is not part of the active document tree struc)
    const newDOM = document.createRange().createContextualFragment(newMarkup);
    //creates a shallow copied array instance from the node list representing a list of the document fragment's elements
    const newElements = Array.from(newDOM.querySelectorAll('*'));
    //creates a shallow copied array instance from the node list representing a lits of the elements contained in the parent element.
    const curElements = Array.from(this._parentElement.querySelectorAll('*'));
    //compare the two array instances
    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];
      //updates changed TEXT
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ''
      ) {
        curEl.textContent = newEl.textContent;
      }
      //updates changed ATTRIBUTES
      if (!newEl.isEqualNode(curEl)) {
        Array.from(newEl.attributes).forEach(attr =>
          curEl.setAttribute(attr.name, attr.value)
        );
      }
    });
  }

  _clear() {
    this._parentElement.innerHTML = '';
  }

  renderSpinner() {
    const markup = `<div class="spinner">
    <svg>
      <use href="${icons}#icon-loader"></use>
    </svg>
  </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderError(message = this._errorMessage) {
    const markup = `
    <div class="error">
        <div>
            <svg>
            <use href="${icons}#icon-alert-triangle"></use>
            </svg>
        </div>
        <p>${message}</p>
    </div>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderMessage(message = this._message) {
    const markup = `
    <div class="message">
        <div>
        <svg>
            <use href="${icons}.svg#icon-smile"></use>
        </svg>
        </div>
        <p>${message}</p>
    </div>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
}
