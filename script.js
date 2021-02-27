// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
    apiKey: "AIzaSyCH5DPwNZrxjWTgy8TDgTaHAvvAeqBa1NE",
    authDomain: "library-bf905.firebaseapp.com",
    databaseURL: "https://library-bf905-default-rtdb.firebaseio.com",
    projectId: "library-bf905",
    storageBucket: "library-bf905.appspot.com",
    messagingSenderId: "198379404749",
    appId: "1:198379404749:web:275b366531d62406645884",
    measurementId: "G-CE266N4MGM"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);


// Create Book Object 
function Book(id, title, author, pages, read) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
};

// Get existing books inside Firebase and display on webpage
function getLibrary() {
    firebase.database().ref("library/").once('value', function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            var existingBook = childSnapshot.val()
            createBookBox(existingBook)
        })
    })
}

getLibrary()


// Display Book
function createBookBox(book) {
    // Select main book container area 
    var bookContainer = document.querySelector(".book-container")

    // Create box book-info element 
    var bookInfoBox = document.createElement("article")
    bookInfoBox.classList.add("box")
    bookInfoBox.classList.add("book-info")
    bookInfoBox.id = book.id

    // Add delete button to box 
    var icon = document.createElement("i")
    icon.classList.add("far", "fa-times-circle", "fa-2x", "delete-btn")
    bookInfoBox.appendChild(icon)

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


// Pop up form to add New Book, hidden when exited or clicked outside 
var popUpForm = document.querySelector(".add-book-form")

var exitBtn = document.querySelector(".exit-btn")

var addBookBtn = document.querySelector(".add-book-btn")

addBookBtn.onclick = function() {
    popUpForm.style.display = "block";
}

exitBtn.onclick = function() {
    popUpForm.style.display = "none";
}



// Add a Book 
var form = document.querySelector(".form-content")
let submitInput = form.querySelector('input[type="submit"]');
document.addEventListener('DOMContentLoaded', function() {
    submitInput.addEventListener('click', createBook);
}, false)

let createBook = (ev) => {
    let titleField = document.getElementById('titleField').value
    let authorField = document.getElementById('authorField').value
    let pagesField = document.getElementById('pagesField').value
        // Block the form from being sent to server 
    ev.preventDefault();

    // Check if form is fully filled 
    if (titleField == '' || titleField == null || authorField == '' || authorField == null || pagesField == '' || pagesField == null) {
        alert('Missing inputs, please retry!')
        return
    }

    // Create Book Object from form fields 
    var addedBook = new Book(Date.now(), titleField, authorField, pagesField, document.getElementById('readstatusField').checked)
    console.log(addedBook)
        // Add Book to Firebase 
    var firebaseRef = firebase.database().ref("library/" + addedBook.id)
    firebaseRef.set(addedBook)

    // Create div for Book and add to HTML 
    createBookBox(addedBook)

    // Close the Pop Up Form 
    popUpForm.style.display = "none";

    // Clear the inputs for next input 
    document.forms[0].reset();
}


// Delete a Book 

document.getElementById("books-section").addEventListener("click", function(e) {
    if (e.target && e.target.classList.contains('delete-btn')) {
        var bookid = e.target.parentNode.id
        e.target.parentNode.remove();
        firebase.database().ref('library/' + bookid).remove();
    }
})


// Toggle Read Status 

document.getElementById("books-section").addEventListener("click", function(e) {
    if (e.target && e.target.type == "submit") {
        var bookid = e.target.parentNode.id
        console.log(e.target.parentNode.id)
        var refPoint = firebase.database().ref('library/' + bookid)

        // Change in Browser 
        if (e.target.firstChild.nodeValue == "Read") {
            e.target.firstChild.nodeValue = "Not Read"
            refPoint.update({
                read: false
            })
        } else {
            e.target.firstChild.nodeValue = "Read"
            refPoint.update({
                read: true
            })
        }

        // // Change in Firebase 
        // var refPoint = firebase.database().ref('library/' + bookid)
        // refPoint.on('value', function(snapshot) {
        //     let newstatus = !snapshot.val().read
        // })





    }
})