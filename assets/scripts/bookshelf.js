$(document).ready(function () {

// add books from local storage to the to-read container
function displayBooks() {
    var savedBooks = JSON.parse(localStorage.getItem("myBooks")) || [];
    for (var i = 0; i < savedBooks.length; i++) {
        if (savedBooks[i].read) {
            continue;
        }
        var book = savedBooks[i];
        var container = $("<div>").addClass("col-lg-6 col-md-12 col-sm-12");
        var bookCard = $("<div>").addClass("card");
        var bookBody = $("<div>").addClass("card-body");
        var bookTitle = $("<h5>").addClass("card-title").text(book.title);
        var bookAuthor = $("<p>").addClass("card-text").text(book.author);
        var bookImage = $("<img>").addClass("card-img-top").attr("src", book.image);
        var bookLink = $("<a>").addClass("btn btn-primary").attr("href", book.link).text("View");
        var readBtn = $("<button>").addClass("btn btn-danger read-it-btn").text("Read it!").attr("data-id", i);
        bookBody.append(bookTitle, bookAuthor, bookImage);
        bookCard.append(bookBody,bookLink, readBtn);
        container.append(bookCard);
       $("#to-read").append(container);
    }
}

// display fave books from local storage into the fave section
function displayFaveBooks() {
    var savedBooks = JSON.parse(localStorage.getItem("myBooks")) || [];
    for (var i = 0; i < savedBooks.length; i++) {
        var book = savedBooks[i];
        if (book.fave) {
            var container = $("<div>").addClass("col-lg-6 col-md-12 col-sm-12");
            var bookCard = $("<div>").addClass("card");
            var bookBody = $("<div>").addClass("card-body");
            var bookTitle = $("<h5>").addClass("card-title").text(book.title);
            var bookAuthor = $("<p>").addClass("card-text").text(book.author);
            var bookImage = $("<img>").addClass("card-img-top").attr("src", book.image);
            var bookLink = $("<a>").addClass("btn btn-primary").attr("href", book.link).text("View");
            bookBody.append(bookTitle, bookAuthor, bookImage );
            bookCard.append(bookBody, bookLink);
            container.append(bookCard);
            $("#favourites").append(container);
        }
    }
}
// display books from local storage into the read section
function displayReadBooks() {
    var savedBooks = JSON.parse(localStorage.getItem("myBooks")) || [];
    for (var i = 0; i < savedBooks.length; i++) {
        var book = savedBooks[i];
        if(book.fave){
            continue;
        }
        if (book.read) {
            var container = $("<div>").addClass("col-lg-6 col-md-12 col-sm-12");
            var bookCard = $("<div>").addClass("card");
            var bookBody = $("<div>").addClass("card-body");
            var bookTitle = $("<h5>").addClass("card-title").text(book.title);
            var bookAuthor = $("<p>").addClass("card-text").text(book.author);
            var bookImage = $("<img>").addClass("card-img-top").attr("src", book.image);
            var bookLink = $("<a>").addClass("btn btn-primary").attr("href", book.link).text("View");
            var faveBtn = $("<button>").addClass("btn btn-warning fave-btn").text("Favorite").attr("data-id", i);
            bookBody.append(bookTitle, bookAuthor, bookImage);
            bookCard.append(bookBody, bookLink, faveBtn);
            container.append(bookCard);
            $("#have-read").append(container);
        }
    }
}
// event listener for read button
$(document).on("click", ".read-it-btn", function (event) {
    // add a new property to the book object to indicate that the book has been read
    event.preventDefault();
    var bookIndex = $(this).attr("data-id");
    var savedBooks = JSON.parse(localStorage.getItem("myBooks")) || [];
    savedBooks[bookIndex].read = true;
    localStorage.setItem("myBooks", JSON.stringify(savedBooks));
    console.log(savedBooks);
    // clear the to-read container
    $("#have-read").empty();
    displayReadBooks();
    $("#to-read").empty();
    displayBooks();
});

// add event listener for fave button
$(document).on("click", ".fave-btn", function (event) {
    event.preventDefault();
    var bookIndex = $(this).attr("data-id");
    var savedBooks = JSON.parse(localStorage.getItem("myBooks")) || [];
    savedBooks[bookIndex].fave = true;
    localStorage.setItem("myBooks", JSON.stringify(savedBooks));
    console.log(savedBooks);
    // clear the to-read container
    $("#favourites").empty();
    displayFaveBooks();
    $("#have-read").empty();
    displayReadBooks();
});


displayFaveBooks();
displayReadBooks();
displayBooks();
});