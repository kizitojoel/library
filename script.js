const fader = document.querySelector(".fader");
const libraryContainer = document.querySelector(".library");
const submitButton = document.getElementById('formSubmit');
const modalForm = document.querySelector(".modal");
const addNewBook = document.getElementById("addNewBook");

document.addEventListener('click', (e) => {
    if (modalForm.classList.contains("active") && !modalForm.contains(e.target) && e.target != addNewBook)
    {
        modalForm.classList.toggle("active");
        fader.classList.remove("fader-active");
    }
})
class Book {
    constructor(
        title = "Untitled", 
        author = "Unknown", 
        pages = 0, 
        read = "Not Read")
        {
        this.title = title
        this.author = author
        this.pages = pages
        this.read = read ? "Read" : "Not Read";
    }
    readTitle(){
        return(`The title of this book is ${this.title}`);
    }
    info(){
        return(`${title} by ${author}, ${pages} pages, ${read ? "Read" : "Not read yet"}`);
    }
}

class Library {
    constructor(){
        this.books = []
        this.bookCount = 0;
    }
    static addBookToLibrary(){
        let title = document.getElementById('formTitle').value;
        let author = document.getElementById('formAuthor').value;
        let pages = document.getElementById('formPages').value;
        let read = document.getElementById('formRead').checked;

        if (!title || !author || !pages)
        {
            alert("Please fill in all the required fields");
            return;
        }

        let newBook = new Book(title, author, pages, read);
        library.books.push(newBook);
        modalForm.classList.toggle("active");
        fader.classList.remove("fader-active");
    }
}

let library = new Library();

/**
 * This function creates a book section and adds it to the DOM
 * @param {Book} bookInstance The book instance to be created
 * @param {Number} bookIndex The index of the Book Index in the Library Array
 */
function createBookSection(bookInstance, bookIndex){
    let book = document.createElement("div");
    book.setAttribute("class", "book");

    let bookTitle = document.createElement("div");
    bookTitle.setAttribute('class', 'title');
    bookTitle.innerHTML = bookInstance.title;

    let bookAuthor = document.createElement("div");
    bookAuthor.setAttribute("class", "author");
    bookAuthor.innerHTML = bookInstance.author;

    let bookPages = document.createElement("div");
    bookPages.setAttribute("class", "pages");
    bookPages.innerHTML = `${bookInstance.pages} pages`;

    let bookRead = document.createElement("button");
    bookRead.setAttribute("class", "status");
    if (bookInstance.read === "Read")
    {
        bookRead.classList.add('read');
    }
    bookRead.textContent = bookInstance.read;
    bookRead.onclick = (e) => {
        let readBtn = e.target;
        if (readBtn.classList.contains("read"))
        {
            readBtn.textContent = "Not Read";
        }
        else
        {
            readBtn.textContent = "Read";
        }
        readBtn.classList.toggle("read");
        let index = parseInt(e.target.parentElement.getAttribute("book-number"));
        library.books[index].read = readBtn.textContent;
    }

    let button = document.createElement("button");
    button.classList.add("remove-book")
    button.textContent = "Delete Book";
    /**
     * button.onclick
     * @param {Event} e Gets the index of the book clicked and removes it from Library
     */
    button.onclick = (e) => {
        let index = parseInt(e.target.parentElement.getAttribute("book-number"));
        library.books.splice(index, 1);
        updateLibrary();
    }

    book.append(bookTitle, bookAuthor, bookPages, bookRead, button);
    book.setAttribute("book-number", `${bookIndex}`);
    libraryContainer.appendChild(book);

}

/**
 * This function checks the library array and updates the HTML page
 */
function updateLibrary(){
    libraryContainer.innerHTML = "";
    let index = 0;
    library.books.forEach((book) => {
        createBookSection(book, index);
        index += 1;
    })
}

submitButton.addEventListener('click', (e) => {
    Library.addBookToLibrary();
    updateLibrary();
    e.preventDefault();
})

function expandModalForm(){
    fader.classList.add("fader-active");
    modalForm.classList.add("active");
}

const bookOne = new Book("Harry Potter", "JK Rowling", 394, true);
const bookTwo = new Book("The Fundamentals of Drawing", "Barrington Barber", 208, false)

library.books.push(bookOne);
library.books.push(bookTwo);

updateLibrary();

