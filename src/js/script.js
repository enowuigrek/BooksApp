/* global Handlebars, utils, dataSource */ // eslint-disable-line no-unused-vars

{
'use strict';

    const select = {
        books: {
            booksList: '.books-list',
        },
        templateOf: {
            templateBook: '#template-book',
        },
    };

    const templates = {
        templateBook: Handlebars.compile(document.querySelector(select.templateOf.templateBook).innerHTML),
    };

    function render(){
        for(let book of dataSource.books){
            const generatedHTML = templates.templateBook(book);
            const generatedDOM = utils.createDOMFromHTML(generatedHTML);
            const booksList = document.querySelector(select.books.booksList);

            booksList.appendChild(generatedDOM);
        }
    }
    render()
}