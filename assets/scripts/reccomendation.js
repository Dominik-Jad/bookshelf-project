$(document).ready(function () {

    console.log("reccomendation.js is connected");


    // add event listener to the list of genres
    $(".genres").on("click", 'a', function (event) {
        event.preventDefault();
        var genre = $(this).text();
        getRecommendation(genre);
    });


    function displayRecommendation(books) {
        // display search results
        //clear 
        $("#recommended-books").empty();

        console.log(books);

        //display 9 random books from the list of books
        for (let i = 0; i < 9; i++) {
            var saveBtn = $("<button>").addClass("btn btn-primary").text("Save Book").attr("id", "save-btn");

            var randomIndex = Math.floor(Math.random() * books.length);
            var book = books[randomIndex];

            var bookTitle = book.volumeInfo.title;
            var bookAuthor = book.volumeInfo.authors;
            var bookImage = book.volumeInfo.imageLinks.thumbnail;
            var bookLink = book.volumeInfo.previewLink;

            var bookDiv = $("<div>").addClass("col-md-4");
            var bookCard = $("<div>").addClass("card");
            var bookCardBody = $("<div>").addClass("card-body");
            var bookTitleEl = $("<h5>").addClass("card-title title").text(bookTitle);
            var bookAuthorEl = $("<p>").addClass("card-text author").text(bookAuthor);
            var bookImageEl = $("<img>").addClass("card-img-top").attr("src", bookImage);
            bookImageEl.height(200);
            bookImageEl.width(200);
            var bookLinkEl = $("<a>").addClass("btn btn-primary").attr("href", bookLink).text("View Book");

            bookCardBody.append(bookTitleEl, bookAuthorEl, bookImageEl, bookLinkEl, saveBtn);
            bookCard.append(bookCardBody);
            bookDiv.append(bookCard);
            $("#recommended-books").append(bookDiv);
        }


    }

    function getRecommendation(genre) {
        var key = "AIzaSyAOh3C66B7oLTIfasJ7UZ0EoWtKXKW3SWs"
        var url = "https://www.googleapis.com/books/v1/volumes?q=subject:" + genre + "&maxResults=20&key=" + key;

        try {
            fetch(url)
                .then(response => response.json())
                .then(result => {
                    var books = result.items;
                    displayRecommendation(books);
                });
        }
        catch (error) {
            console.error('Fetch error:', error.message);
        }
    }

    //function to save book to local storage

    $("#recommended-books").on("click", "#save-btn", function () {
        event.preventDefault();
        var bookTitle = $(this).siblings(".card-title").text();
        var bookAuthor = $(this).siblings(".card-text").text();
        var bookImage = $(this).siblings(".card-img-top").attr("src");
        var bookLink = $(this).siblings(".btn-primary").attr("href");

        var book = {
            title: bookTitle,
            author: bookAuthor,
            image: bookImage,
            link: bookLink,
            fave : false,
        }

        // Check if book is already saved
        var savedBooks = JSON.parse(localStorage.getItem("myBooks")) || [];
        for (var i = 0; i < savedBooks.length; i++) {
            if (savedBooks[i].title === book.title) {
                $("#book-already-added-modal").modal("show");
                return;
            }
        }
        //save book to local storage array
        var savedBooks = JSON.parse(localStorage.getItem("myBooks")) || [];
        savedBooks.push(book);
        localStorage.setItem("myBooks", JSON.stringify(savedBooks));
        $("#book-added-modal").modal("show");
    });
});

