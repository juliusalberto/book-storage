const myLibrary = [];

function Book(author, title, pages, read) {
    this.author = author;
    this.title = title;
    this.pages = Number(pages);
    this.read = read;
}

function addBook() {
    // get book details from input fields

    let title = document.getElementById('title').value;
    let author = document.getElementById('author').value;
    let page_count = document.getElementById('pages').value;
    let read = document.getElementById('read').checked;

    addedBook = new Book(author, title, page_count, read);

    myLibrary.push(addedBook);

    addBookToDOM(addedBook, myLibrary.length - 1);
}

function addBookToDOM(book, index) {
    const title = book.title;
    const author = book.author;
    const pages = book.pages;
    const read = book.read;
    const read_string = read? "read" : "not read";
    let buttonColor;

    if (read) {
        buttonColor = 'btn-light-green'
    } else {
        buttonColor = 'btn-red'
    }

    let bookElement = document.createElement('div');
    bookElement.innerHTML = `
    <div class="bold big-word">${title}</div>
    <div class="bold big-word">${author}</div>
    <div class="bold big-word">${pages}</div>
    <button type="button" class="btn ${buttonColor} read-btn" data-index="${index}">${read_string}</button>
    <button type="button" class="btn delete-btn" data-index="${index}">delete</button>
    `;

    bookElement.classList.add('card');

    
    document.getElementById('book-list').appendChild(bookElement);
}

function openForm() {
    document.getElementById("addBookModal").style.display = "block";
}

function closeForm() {
    document.getElementById("addBookModal").style.display = "none";
}

function removeBook(index) {
    myLibrary.splice(index, 1);
    displayBooks();
}

function displayBooks() {
    const bookList = document.getElementById('book-list');
    bookList.innerHTML = '';

    myLibrary.forEach((book, index) => {
        addBookToDOM(book, index);
    })
}

function changeReadStatus(index) {
    changedBook = myLibrary[index];
    changedBook.read = changedBook.read? false : true;

    displayBooks();
}

document.querySelector(".dark-button").addEventListener("click", openForm);
document.getElementById('bookForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevents the default form submission
    addBook();
    closeForm(); // Optionally close the form after adding the book
});

document.getElementById('book-list').addEventListener('click', function(event) {
    if (event.target.classList.contains('delete-btn')) {
        const index = event.target.getAttribute('data-index');
        removeBook(index);
    }

    if (event.target.classList.contains('read-btn')) {
        const index = event.target.getAttribute('data-index');
        changeReadStatus(index);
    }
})


