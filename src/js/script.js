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
    const booksList = document.querySelectorAll(select.books.bookImage);

    for(const clickedBook of booksList){
            
      clickedBook.addEventListener('dblclick', function(event){
        event.preventDefault();

        const dataId = clickedBook.getAttribute(select.books.dataId);

        if (clickedBook.classList.contains('favorite')){
          const bookIndex = favoriteBooks.indexOf(dataId);

          clickedBook.classList.remove('favorite');

          favoriteBooks.splice(bookIndex,1);
          
        } else {
          clickedBook.classList.add('favorite');

          favoriteBooks.push(dataId);
        }
        console.log(favoriteBooks);
      });
    }
  }

  render();
  initActions();
}