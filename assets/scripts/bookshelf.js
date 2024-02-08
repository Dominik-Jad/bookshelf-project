$(document).ready(function () {

    // Function to display books from local storage
    function displayBooks() {
        var savedBooks = JSON.parse(localStorage.getItem("myBooks")) || [];
        $("#to-read").empty();
        for (var i = 0; i < savedBooks.length; i++) {
            if (!savedBooks[i].read) {
                var container = $("<div>").addClass("col-lg-6 col-md-12 col-sm-12");
                var bookCard = $("<div>").addClass("card position-relative");
                var bookBody = $("<div>").addClass("card-body");
                var bookTitle = $("<h5>").addClass("card-title").text(savedBooks[i].title);
                var bookAuthor = $("<p>").addClass("card-text").text(savedBooks[i].author);
                var bookImage = $("<img>").addClass("card-img-top").attr("src", savedBooks[i].image);
                var bookLink = $("<a>").addClass("btn btn-primary").attr("href", savedBooks[i].link).text("View");
                var readBtn = $("<button>").addClass("btn btn-danger read-it-btn").text("Read it!").attr("data-id", i);
                var removeBtn = $("<button>").addClass("btn btn-outline-secondary remove-btn position-absolute top-0 start-0 mt-2 ms-2 p-0").html('<i class="fas fa-times"></i>').attr("data-id", i);
                bookBody.append(bookTitle, bookAuthor, bookImage, bookLink, readBtn);
                bookCard.append(bookBody, removeBtn);
                container.append(bookCard);
                $("#to-read").append(container);
            }
        }
    }

    // Function to display favorite books from local storage
    function displayFaveBooks() {
        var savedBooks = JSON.parse(localStorage.getItem("myBooks")) || [];
        $("#favourites").empty();
        for (var i = 0; i < savedBooks.length; i++) {
            if (savedBooks[i].fave) {
                var container = $("<div>").addClass("col-lg-6 col-md-12 col-sm-12");
                var bookCard = $("<div>").addClass("card position-relative");
                var bookBody = $("<div>").addClass("card-body");
                var bookTitle = $("<h5>").addClass("card-title").text(savedBooks[i].title);
                var bookAuthor = $("<p>").addClass("card-text").text(savedBooks[i].author);
                var bookImage = $("<img>").addClass("card-img-top").attr("src", savedBooks[i].image);
                var bookLink = $("<a>").addClass("btn btn-primary").attr("href", savedBooks[i].link).text("View");
                var removeBtn = $("<button>").addClass("btn btn-outline-secondary remove-btn position-absolute top-0 start-0 mt-2 ms-2 p-0").html('<i class="fas fa-times"></i>').attr("data-id", i);
                bookBody.append(bookTitle, bookAuthor, bookImage, bookLink);
                bookCard.append(bookBody, removeBtn);
                container.append(bookCard);
                $("#favourites").append(container);
            }
        }
    }

    // Function to display read books from local storage
    function displayReadBooks() {
        var savedBooks = JSON.parse(localStorage.getItem("myBooks")) || [];
        $("#have-read").empty();
        for (var i = 0; i < savedBooks.length; i++) {
            if (savedBooks[i].read && !savedBooks[i].fave) {
                var container = $("<div>").addClass("col-lg-6 col-md-12 col-sm-12");
                var bookCard = $("<div>").addClass("card position-relative");
                var bookBody = $("<div>").addClass("card-body");
                var bookTitle = $("<h5>").addClass("card-title").text(savedBooks[i].title);
                var bookAuthor = $("<p>").addClass("card-text").text(savedBooks[i].author);
                var bookImage = $("<img>").addClass("card-img-top").attr("src", savedBooks[i].image);
                var bookLink = $("<a>").addClass("btn btn-primary").attr("href", savedBooks[i].link).text("View");
                var favBtn = $("<button>").addClass("btn btn-warning fave-btn").text("Favorite").attr("data-id", i);
                var removeBtn = $("<button>").addClass("btn btn-outline-secondary remove-btn position-absolute top-0 start-0 mt-2 ms-2 p-0").html('<i class="fas fa-times"></i>').attr("data-id", i);
                bookBody.append(bookTitle, bookAuthor, bookImage, bookLink, favBtn);
                bookCard.append(bookBody, removeBtn);
                container.append(bookCard);
                $("#have-read").append(container);
            }
        }
    }

    // Event listener for read button
    $(document).on("click", ".read-it-btn", function (event) {
        event.preventDefault();
        var bookIndex = $(this).attr("data-id");
        var savedBooks = JSON.parse(localStorage.getItem("myBooks")) || [];
        savedBooks[bookIndex].read = true;
        localStorage.setItem("myBooks", JSON.stringify(savedBooks));
        displayReadBooks();
        displayBooks();
    });

    // Event listener for favorite button
    $(document).on("click", ".fave-btn", function (event) {
        event.preventDefault();
        var bookIndex = $(this).attr("data-id");
        var savedBooks = JSON.parse(localStorage.getItem("myBooks")) || [];
        savedBooks[bookIndex].fave = true;
        localStorage.setItem("myBooks", JSON.stringify(savedBooks));
        displayFaveBooks();
        displayReadBooks();
    });

    // Event listener for remove button
    $(document).on("click", ".remove-btn", function (event) {
        event.preventDefault();
        var bookIndex = $(this).attr("data-id");
        var savedBooks = JSON.parse(localStorage.getItem("myBooks")) || [];
        savedBooks.splice(bookIndex, 1);
        localStorage.setItem("myBooks", JSON.stringify(savedBooks));
        displayFaveBooks();
        displayReadBooks();
        displayBooks();
    });

    // Initial display of books
    displayBooks();
    displayFaveBooks();
    displayReadBooks();
});
