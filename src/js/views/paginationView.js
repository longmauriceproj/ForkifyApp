import View from './view.js';
import icons from 'url:../../img/icons.svg';
//////////////////////
class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }

  _generateMarkupButton(btnType) {
    const pageNum =
      btnType === 'next' ? this._data.page + 1 : this._data.page - 1;
    const arrowDir = btnType === 'next' ? 'right' : 'left';
    return `
        <button data-goto="${pageNum}" 
            class="btn--inline pagination__btn--${btnType}">
            <span>Page ${pageNum}</span>
            <svg class="search__icon">
                <use href="${icons}#icon-arrow-${arrowDir}"></use>
            </svg>
        </button>
    `;
    //NOTE: still needs work: the prev button should swap the arrow and page number position on the button (span and svg element has to flip)
  }

  _generateMarkup() {
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    //Page 1, and there are other pages
    if (this._data.page === 1 && numPages > 1) {
      return this._generateMarkupButton('next');
    }
    //last page
    if (this._data.page === numPages && numPages > 1) {
      return this._generateMarkupButton('prev');
    }
    //other page
    if (this._data.page < numPages) {
      return `${this._generateMarkupButton('prev')}${this._generateMarkupButton(
        'next'
      )}
      `;
    }
    //Page 1, and no other pages
    return ``;
  }
}

export default new PaginationView();
