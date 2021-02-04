let myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
};

function addBooktoLibrary(title, author, pages, read) {
    let newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
}

addBooktoLibrary("To Kill a Mockingbird", "Harper Lee", 281, false)
addBooktoLibrary("Great Gatsby", "F. Scott Fitzgerald", 218, false)
addBooktoLibrary("1984", "George Orwell", 328, false)
addBooktoLibrary("Lord of the Flies", "William Golding", 224, false)
addBooktoLibrary("Anna Karenina", "Leo Tolstoy", 864, false)
addBooktoLibrary("Of Mice and Men", "John Steinbeck", 107, false)


function createBookInfoBox() {

    // Select main book container area 
    var bookContainer = document.querySelector(".book-container")


    myLibrary.forEach(
        function(book) {

            // Create box book-info element 
            var bookInfoBox = document.createElement("article")
            bookInfoBox.classList.add("box")
            bookInfoBox.classList.add("book-info")

            // Add title into box book-info 
            var h3 = document.createElement("h3")
            h3.classList.add("small-header")
            var title = document.createTextNode(book.title)
            h3.appendChild(title)
            bookInfoBox.appendChild(h3)

            // Add info to book info 

            for (var prop in book) {
                if (prop == "author" || prop == "pages") {
                    var textarea = document.createElement("p")
                    if (prop == "author") {
                        var p = document.createTextNode("by " + book[prop])
                    } else {
                        var p = document.createTextNode(book[prop] + " pages")
                    }
                    textarea.appendChild(p)
                    bookInfoBox.appendChild(textarea)
                } else if (prop == "read") {
                    var button = document.createElement("button")
                    if (book[prop] == true) {
                        var readbtn = document.createTextNode("Read")
                    } else {
                        var readbtn = document.createTextNode("Not Read")
                    }
                    button.appendChild(readbtn)
                    bookInfoBox.appendChild(button)
                }
            }
            bookContainer.appendChild(bookInfoBox)


        }
    )
}

createBookInfoBox()

var popUpForm = document.querySelector(".add-book-form")
console.log(popUpForm)

var exitBtn = document.querySelector(".exit-btn")
console.log(exitBtn)

var addBookBtn = document.querySelector(".add-book-btn")
console.log(addBookBtn)

addBookBtn.onclick = function() {
    popUpForm.style.display = "block";
}

exitBtn.onclick = function() {
    popUpForm.style.display = "none";
}

let form = document.querySelector(".form-content")
form.addEventListener('submit', e)