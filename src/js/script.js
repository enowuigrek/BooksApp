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
  console.log(templates);


  

  const favoriteBooks = [];
  const filters = [];

  function getElemets(){

    const thisBook = this;

    thisBook.dom = {};

    thisBook.dom.booksList = document.querySelector(select.books.booksList);
    thisBook.dom.filters = document.querySelector(select.books.filters);
  }

  function render(){
    const allBooks = dataSource.books;

    for(let book of allBooks){
      const generatedHTML = templates.templateBook(book);
      const generatedDOM = utils.createDOMFromHTML(generatedHTML);
      const booksList = document.querySelector(select.books.booksList);

      booksList.appendChild(generatedDOM);
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
      
      console.log(filters);
    });
  }

  render();
  getElemets();
  initActions();
}