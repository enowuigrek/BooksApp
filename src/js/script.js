/* global Handlebars, utils, dataSource */ // eslint-disable-line no-unused-vars

{

  'use strict';

  const select = {
    books: {
      booksList: '.books-list',
      bookImage: '.book__image',
      dataId: 'data-id'
    },

    templateOf: {
      templateBook: '#template-book',
    },
  };

  const templates = {
    templateBook: Handlebars.compile(document.querySelector(select.templateOf.templateBook).innerHTML),
  };

  function render(){
    const allBooks = dataSource.books;

    for(let book of allBooks){
      const generatedHTML = templates.templateBook(book);
      const generatedDOM = utils.createDOMFromHTML(generatedHTML);
      const booksList = document.querySelector(select.books.booksList);

      booksList.appendChild(generatedDOM);
    }
  }

  const favoriteBooks = [];

  function initActions(){
    const booksList = document.querySelector(select.books.booksList);

   
    booksList.addEventListener('dblclick', function(event){
      event.preventDefault();

      const clickedElement = event.target.offsetParent;
      const dataId = clickedElement.getAttribute(select.books.dataId);
      const bookIndex = favoriteBooks.indexOf(dataId);

      if (clickedElement.classList.contains('favorite')){
        clickedElement.classList.remove('favorite');
        favoriteBooks.splice(bookIndex,1);

      } else {
        clickedElement.classList.add('favorite');
        favoriteBooks.push(dataId);
      }

      console.log(clickedElement);
      console.log(booksList);
      console.log(favoriteBooks);
    });
  }

  render();
  initActions();
}