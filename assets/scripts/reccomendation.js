$(document).ready(function () {

console.log("reccomendation.js is connected");


// add event listener to the list of genres
$("a").on("click", function (event) {
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

    try{
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


});