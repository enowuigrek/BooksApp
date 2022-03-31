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

  class BooksList {

    constructor(){
      const thisBooksList = this;

      thisBooksList.initData();
      thisBooksList.render();
      thisBooksList.getElemets();
      thisBooksList.initActions();
    }

    initData() {  
      const thisBooksList = this;

      thisBooksList.favoriteBooks = [];
      thisBooksList.filters = [];
    }

    getElemets(){
      const thisBooksList = this;

      thisBooksList.dom = {};

      thisBooksList.dom.booksList = document.querySelector(select.books.booksList);
      thisBooksList.dom.filters = document.querySelector(select.books.filters);
    }

    render(){
      const thisBooksList = this;

      for(let book of dataSource.books){
        const ratingBgc = thisBooksList.determineRatingBgc(book.rating);
        book.ratingBgc = ratingBgc;

        const ratingWidth = book.rating * 10;
        book.ratingWidth = ratingWidth;

        const generatedHTML = templates.templateBook(book);
        const generatedDOM = utils.createDOMFromHTML(generatedHTML);
        const booksList = document.querySelector(select.books.booksList);

        booksList.appendChild(generatedDOM);
      }
    }

    filterBooks(){
      const thisBooksList = this;

      for(let book of dataSource.books){
        let shouldBeHidden = false;
        const filterBook = document.querySelector('.book__image[data-id="' + book.id + '"]');

        for(let filter of thisBooksList.filters){
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

    initActions(){
      const thisBooksList = this;

      thisBooksList.dom.booksList.addEventListener('dblclick', function(event){
        event.preventDefault();

        const clickedElement = event.target.offsetParent;
        const dataId = clickedElement.getAttribute(select.books.dataId);
        const bookIndex = thisBooksList.favoriteBooks.indexOf(dataId);

        if (clickedElement.classList.contains('favorite')){
          clickedElement.classList.remove('favorite');
          thisBooksList.favoriteBooks.splice(bookIndex,1);

        } else{
          clickedElement.classList.add('favorite');
          thisBooksList.favoriteBooks.push(dataId);
        }
      });

      thisBooksList.dom.filters.addEventListener('click', function(event){
        const clickedElement = event.target;
        const clickedFilter = clickedElement.value;
        
        if(clickedElement.tagName == 'INPUT' && clickedElement.type == 'checkbox'&& clickedElement.name == 'filter'){
          const filterIndex = thisBooksList.filters.indexOf(clickedFilter);

          if(clickedElement.checked){
            thisBooksList.filters.push(clickedFilter);
          } else {
            thisBooksList.filters.splice(filterIndex ,1);
          }
        }
        thisBooksList.filterBooks();
      });
    }

    determineRatingBgc(rating){
      if(rating < 6){
        return 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)';
      }else if(rating > 6 && rating <= 8){
        return 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)';
      }else if(rating > 8 && rating <= 9){
        return 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
      }else if(rating > 9){
        return 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)';
      }
    }
  }
  new BooksList();

}