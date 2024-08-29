let currentId = 0;
let bookList = [];

function Book(id, title, author, pages, isRead) {
  this.id = id;
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
}
Book.prototype.removeBook = function () {
  bookList = bookList.filter((book) => book.id !== this.id);
};

const addBtn = document.querySelector(".add-btn");
const addBookModal = document.querySelector(".add-dialog");
addBtn.addEventListener("click", () => {
  addBookModal.showModal();
});

const addForm = addBookModal.querySelector("form");
addForm.addEventListener("submit", () => {
  const title = document.querySelector("#title").value;
  const author = document.querySelector("#author").value;
  const pages = document.querySelector("#pages").value;
  const checkedRadio = document.querySelector('input[type="radio"]:checked');
  const isRead = checkedRadio.value === "not-yet" ? false : true;

  const book = new Book(currentId, title, author, pages, isRead);
  currentId++;

  addBook(book);
  renderBooks();
});

const bookListArea = document.querySelector(".book-list ul");
bookListArea.addEventListener("click", (e) => {
  const removeBtns = Array.from(document.querySelectorAll(".remove"));

  if (removeBtns.includes(e.target)) {
    const book = bookList.find((book) => book.id == e.target.parentElement.id);
    book.removeBook();
    renderBooks();
  }
});

function addBook(book) {
  bookList.push(book);
}

function renderBooks() {
  const list = document.querySelector(".book-list ul");
  list.innerHTML = "";
  bookList.forEach((book) => {
    const listItem = document.createElement("li");
    listItem.id = book.id;

    listItem.innerHTML = `
        <p>Title: ${book.title}</p>
        <p>Author: ${book.author}</p>
        <p>Pages: ${book.pages}</p>
        <p>Read: ${book.isRead ? "yes" : "not yet"}</p>
        <button class="remove">Remove</button>`;
    list.appendChild(listItem);
  });
}
