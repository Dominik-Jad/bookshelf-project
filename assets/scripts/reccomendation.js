$(document).ready(function () {

    console.log("reccomendation.js is connected");


    // add event listener to the list of genres
    $(".genres").on("click", 'a', function (event) {
        event.preventDefault();
        var genre = $(this).text();
        $(this).addClass("active").siblings().removeClass("active");
        getRecommendation(genre);
    });


    function displayRecommendation(books) {
        // Clear previous recommendations
        $("#recommended-books").empty();
    
        // Copy the array of books to avoid modifying the original array
        let remainingBooks = books.slice();
    
        // Display 9 unique random books from the list of books
        for (let i = 0; i < 9 && remainingBooks.length > 0; i++) {
            // Select a random index from the remaining books
            var randomIndex = Math.floor(Math.random() * remainingBooks.length);
            
            // Get the book at the random index
            var book = remainingBooks[randomIndex];
    
            // Remove the selected book from the remaining books array
            remainingBooks.splice(randomIndex, 1);
    
            // Extract book details
            var bookTitle = book.volumeInfo.title;
            var bookAuthor = book.volumeInfo.authors;
            var bookImage = book.volumeInfo.imageLinks.thumbnail;
            var bookLink = book.volumeInfo.previewLink;
    
            // Create elements for the book card
            var bookDiv = $("<div>").addClass("col-lg-4 col-md-6 col-sm-12 text-center");
            var bookCard = $("<div>").addClass("card");
            var bookCardBody = $("<div>").addClass("card-body");
            var bookTitleEl = $("<h5>").addClass("card-title title").text(bookTitle);
            var bookAuthorEl = $("<p>").addClass("card-text author").text(bookAuthor);
            var bookImageEl = $("<img>").addClass("card-img-top").attr("src", bookImage);
            var bookLinkEl = $("<a>").addClass("btn btn-primary").attr("href", bookLink).text("View Book");
            var saveBtn = $("<button>").addClass("btn btn-primary").text("Save Book").attr("id", "save-btn");

            // Append elements to the card body
            bookCardBody.append(bookTitleEl, bookAuthorEl, bookImageEl);
            bookCard.append(bookCardBody, bookLinkEl, saveBtn);
            bookDiv.append(bookCard);
    
            // Append the card to the recommended-books container
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
        var bookTitle = $(this).siblings(".card-body").find(".title").text();
        var bookAuthor = $(this).siblings(".card-body").find(".author").text();
        var bookImage = $(this).siblings(".card-body").find(".card-img-top").attr("src");
        var bookLink = $(this).siblings(".btn-primary").attr("href");

        var book = {
            title: bookTitle,
            author: bookAuthor,
            image: bookImage,
            link: bookLink,
            fave : false,
        }
        
        console.log(book);
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

