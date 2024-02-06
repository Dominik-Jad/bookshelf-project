$(document).ready(function () {

    // event listener for search button
    $("#search-btn").on("click", function (event) {
        event.preventDefault();

        var searchInput = $("#search-input").val().trim();

        // clear serach input
        $("#search-input").val("");
        // console.log(searchInput);


        if (searchInput === "") {
            // add code to modulus here to display error message saying "Please enter a search term"
            console.log("Please enter a search term");
            return;
        }

        // run fetchSearchedBook function
        fetchSearchedBook(searchInput);

    });

    // function to display search results
    function displaySearchResults(bookResult) {
        // display search results
        //clear 
        $("#search-results").empty();

        console.log(bookResult);


        for (let i = 0; i < bookResult.length; i++) {
            var saveBtn = $("<button>").addClass("btn btn-primary").text("Save Book").attr("id", "save-btn");
            var book = bookResult[i];

            var bookTitle = book.volumeInfo.title;
            var bookAuthor = book.volumeInfo.authors;
            var bookImage = book.volumeInfo.imageLinks.thumbnail;
            var bookLink = book.volumeInfo.previewLink;

            var bookDiv = $("<div>").addClass("col-md-4");
            var bookCard = $("<div>").addClass("card");
            var bookCardBody = $("<div>").addClass("card-body");
            var bookTitleEl = $("<h5>").addClass("card-title").text(bookTitle);
            var bookAuthorEl = $("<p>").addClass("card-text").text(bookAuthor);
            var bookImageEl = $("<img>").addClass("card-img-top").attr("src", bookImage);
            bookImageEl.height(200);
            bookImageEl.width(200);
            var bookLinkEl = $("<a>").addClass("btn btn-primary").attr("href", bookLink).text("View Book");

            bookCardBody.append(bookTitleEl, bookAuthorEl, bookImageEl, bookLinkEl, saveBtn);
            bookCard.append(bookCardBody);
            bookDiv.append(bookCard);
            $("#search-results").append(bookDiv);
        }
    }

    $(document).on("click", "#save-btn", function (event) {
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

    async function fetchSearchedBook(searchInput) {
        // get book based on search query
        var key = "AIzaSyAOh3C66B7oLTIfasJ7UZ0EoWtKXKW3SWs"
        var query = searchInput
        var url = "https://www.googleapis.com/books/v1/volumes?q=" + query + "&key=" + key

        try {
            const response = await fetch(url);
            const result = await response.json();

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            // console.log(result);
            var books = result.items;

            displaySearchResults(books);

        } catch (error) {
            console.error('Fetch error:', error.message);
        }
    }

    function displayRandomBooks(randomBooks) {
        // display search results
        //clear 
        $("#search-results").empty();

        for (let i = 0; i < randomBooks.length; i++) {
            var saveBtn = $("<button>").addClass("btn btn-primary").text("Save Book").attr("id", "save-btn");
            var book = randomBooks[i];

            var bookTitle = book.title;
            var bookAuthor = book.author.first_name + " " + book.author.last_name;
            var bookImage = book.cover;
            var bookLink = book.url;

            var bookDiv = $("<div>").addClass("col-md-4");
            var bookCard = $("<div>").addClass("card");
            var bookCardBody = $("<div>").addClass("card-body");
            var bookTitleEl = $("<h5>").addClass("card-title").text(bookTitle);
            var bookAuthorEl = $("<p>").addClass("card-text").text(bookAuthor);
            var bookImageEl = $("<img>").addClass("card-img-top").attr("src", bookImage);
            bookImageEl.height(200);
            bookImageEl.width(200);
            var bookLinkEl = $("<a>").addClass("btn btn-primary").attr("href", bookLink).text("View Book");

            bookCardBody.append(bookTitleEl, bookAuthorEl, bookImageEl, bookLinkEl, saveBtn);
            bookCard.append(bookCardBody);
            bookDiv.append(bookCard);
            $("#search-results").append(bookDiv);
        }
    }

    async function fetchRandomBook() {

        const url = 'https://books-api7.p.rapidapi.com/books/get/random/';
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': 'c70b9bc838msh71e3b514fd38b89p19bf5fjsnef2fa3d7d207',
                'X-RapidAPI-Host': 'books-api7.p.rapidapi.com'
            }
        };
        // get 6 random books
        var randomBooks = [];
        try {
            for (let i = 0; i < 6; i++) {
                const response = await fetch(url, options);
                const result = await response.json();
                randomBooks.push(result);
                console.log(randomBooks);
            }

            displayRandomBooks(randomBooks);
        } catch (error) {
            console.error(error);

        }
    }

    function displayBestSellers(bestSellers) {
        //clear
        $("#best-sellers").empty();
        // display random 5 from best sellers list
        for (var i = 0; i < 5; i++) {

            var randomIndex = Math.floor(Math.random() * bestSellers.length);

            var bestSeller = bestSellers[randomIndex];

            if (bestSeller.isbns[0] === undefined) {
                var isbn = 0;
            }else {
                var isbn = bestSeller.isbns[0].isbn10;
            }
           
            var bookTitle = bestSeller.title;
            var bookAuthor = bestSeller.author;
            var bookLink = bestSeller.amazon_product_url;

            var bookDiv = $("<div>").addClass("col-12 text-center");
            var bookCard = $("<div>").addClass("card");
            var bookCardBody = $("<div>").addClass("card-body");
            var bookTitleEl = $("<h5>").addClass("card-title").text(bookTitle);
            var bookAuthorEl = $("<p>").addClass("card-text").text(bookAuthor);
            var bookImageEl = $("<img>").addClass("card-img-top").attr("src", "https://s3-us-west-2.amazonaws.com/s.cdpn.io/387928/book%20placeholder.png").attr("id", "isbn-" + isbn);
            bookImageEl.height(200);
            bookImageEl.width(200);
            var bookLinkEl = $("<a>").addClass("btn btn-primary").attr("href", bookLink).text("View Book").attr("id", "btn-isbn-" + isbn);

            bookCardBody.append(bookTitleEl, bookAuthorEl, bookImageEl, bookLinkEl);
            bookCard.append(bookCardBody);
            bookDiv.append(bookCard);
            $("#best-sellers").append(bookDiv);

            if (isbn){
              updateCover(isbn);
            }
           
        }
    }
    function updateCover(isbn) {
        fetch('https://www.googleapis.com/books/v1/volumes?q=isbn:' + isbn + "&key=AIzaSyAyINR2SYnt4K-0x6zh6S3x6NVUY15pY7Q", {
            method: 'get'
        })
            .then(response => { return response.json(); })
            .then(data => {
                console.log(data);
                var img = data.items[0].volumeInfo.imageLinks.thumbnail;
                img = img.replace("http://", "https://");
                $('#isbn-' + isbn).attr('src', img);
                $('#btn-isbn-' + isbn).attr('href', data.items[0].volumeInfo.previewLink);
            })
            .catch(error => {
                console.log(error);
            });
    }
    function fetchBestSellers() {
        // get best sellers list
        var key = "uApovvwLcJVuNdbyxAM28Mm64IfUeEmG"
        var url = "https://api.nytimes.com/svc/books/v3/lists/best-sellers/history.json?api-key=" + key

        fetch(url)
            .then(response => response.json())
            .then(data => {

                var bestSellers = data.results;

                console.log(bestSellers);

                displayBestSellers(bestSellers);
            })
    }

    // fetchSearchedBook();

    fetchBestSellers();

    fetchRandomBook();
});