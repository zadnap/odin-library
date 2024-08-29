const bookList = [];

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

  addBook(title, author, pages, isRead);
  renderBooks();
});

const bookListArea = document.querySelector(".book-list ul");
bookListArea.addEventListener("click", (e) => {
  const removeBtns = Array.from(document.querySelectorAll(".remove"));

  if (removeBtns.includes(e.target)) {
    removeBook(Number(removeBtns.id));
    renderBooks();
  }
});

function addBook(title, author, pages, isRead) {
  bookList.push({ title, author, pages, isRead });
}

function removeBook(index) {
  bookList.splice(index, 1);
}

function renderBooks() {
  const list = document.querySelector(".book-list ul");
  list.innerHTML = "";
  bookList.forEach((book, index) => {
    const listItem = document.createElement("li");
    listItem.innerHTML = `
        <p>Title: ${book.title}</p>
        <p>Author: ${book.author}</p>
        <p>Pages: ${book.pages}</p>
        <p>Read: ${book.isRead ? "yes" : "not yet"}</p>
        <button class="remove" id="${index}">Remove</button>`;
    list.appendChild(listItem);
  });
}
