/* global Handlebars, utils, dataSource */ // eslint-disable-line no-unused-vars

{

  'use strict';

  const select = {
    books: {
      booksList: '.books-list',
      bookImage: '.book__image',
      dataId: 'data-id',
      filters: '.filters',
    },

    templateOf: {
      templateBook: '#template-book',
    },
  };

  const templates = {
    templateBook: Handlebars.compile(document.querySelector(select.templateOf.templateBook).innerHTML),
  };

  const allBooks = dataSource.books;
  const favoriteBooks = [];
  const filters = [];

  function getElemets(){

    const thisBook = this;

    thisBook.dom = {};

    thisBook.dom.booksList = document.querySelector(select.books.booksList);
    thisBook.dom.filters = document.querySelector(select.books.filters);
  }

  function render(){

    const thisBook = this;

    for(let book of allBooks){

      const ratingBgc = thisBook.determineRatingBgc(book.rating);
      book.ratingBgc = ratingBgc;

      const ratingWidth = book.rating * 10;
      book.ratingWidth = ratingWidth;

      const generatedHTML = templates.templateBook(book);
      const generatedDOM = utils.createDOMFromHTML(generatedHTML);
      const booksList = document.querySelector(select.books.booksList);

      booksList.appendChild(generatedDOM);
    }
  }

  function filterBooks(){
    for(let book of allBooks){
      let shouldBeHidden = false;
      const filterBook = document.querySelector('.book__image[data-id="' + book.id + '"]');

      for(let filter of filters){
        if(!book.details[filter]){
          shouldBeHidden = true;
          break;
        }
      }
      
      if(!shouldBeHidden){
        filterBook.classList.remove('hidden');
      } else{
        filterBook.classList.add('hidden');
      }
    }
  }

  function initActions(){
    const thisBook = this;

    thisBook.dom.booksList.addEventListener('dblclick', function(event){
      event.preventDefault();

      const clickedElement = event.target.offsetParent;
      const dataId = clickedElement.getAttribute(select.books.dataId);
      const bookIndex = favoriteBooks.indexOf(dataId);

      if (clickedElement.classList.contains('favorite')){
        clickedElement.classList.remove('favorite');
        favoriteBooks.splice(bookIndex,1);

      } else{
        clickedElement.classList.add('favorite');
        favoriteBooks.push(dataId);
      }
    });

    thisBook.dom.filters.addEventListener('click', function(event){

      const clickedElement = event.target;
      const clickedFilter = clickedElement.value;
      
      if(clickedElement.tagName == 'INPUT' && clickedElement.type == 'checkbox'&& clickedElement.name == 'filter'){
        const filterIndex = filters.indexOf(clickedFilter);

        if(clickedElement.checked){
          filters.push(clickedFilter);
        } else {
          filters.splice(filterIndex ,1);
        }
      }
      filterBooks();
    });
  }

  function determineRatingBgc(rating){

    let ratingStyle = '';

    if(rating < 6){
      ratingStyle = 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)';
    }else if(rating > 6 && rating <= 8){
      ratingStyle = 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)';
    }else if(rating > 8 && rating <= 9){
      ratingStyle = 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
    }else if(rating > 9){
      ratingStyle = 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)';
    }
    return ratingStyle;
  }
//   determineRatingBgc();
  render();
  getElemets();
  initActions();
}