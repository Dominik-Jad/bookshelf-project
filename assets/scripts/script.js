$(document).ready(function () {

    // event listener for search button
   $("#search-btn").on("click", function(event){
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
    
    // display search results

  

   });      

   // function to display search results
    function displaySearchResults(bookResult) {
         // display search results
        //clear 
        $("#search-results").empty();

        console.log(bookResult);

        for (let i = 0; i < bookResult.length; i++) {

            var book = bookResult[i];
         
            var bookTitle = book.volumeInfo.title;
            var bookAuthor = book.volumeInfo.authors;
            var bookImage = book.volumeInfo.imageLinks.thumbnail;
            var bookLink = book.volumeInfo.previewLink;

            var bookDiv = $("<div>").addClass("col-md-3");
            var bookCard = $("<div>").addClass("card");
            var bookCardBody = $("<div>").addClass("card-body");
            var bookTitleEl = $("<h5>").addClass("card-title").text(bookTitle);
            var bookAuthorEl = $("<p>").addClass("card-text").text(bookAuthor);
            var bookImageEl = $("<img>").addClass("card-img-top").attr("src", bookImage);
            bookImageEl.height(200);
            bookImageEl.width(200);
            var bookLinkEl = $("<a>").addClass("btn btn-primary").attr("href", bookLink).text("View Book");

            bookCardBody.append(bookTitleEl, bookAuthorEl, bookImageEl, bookLinkEl);
            bookCard.append(bookCardBody);
            bookDiv.append(bookCard);
            $("#search-results").append(bookDiv);
        }
    }

    async function fetchSearchedBook(searchInput) {
        // get book based on search query
        var key = "AIzaSyAOh3C66B7oLTIfasJ7UZ0EoWtKXKW3SWs"
        var query = searchInput
        var url = "https://www.googleapis.com/books/v1/volumes?q="+ query +"&key=" + key

        try{
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

    async function fetchRandomBook(){
      
        const url = 'https://books-api7.p.rapidapi.com/books/get/random/';
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': 'c70b9bc838msh71e3b514fd38b89p19bf5fjsnef2fa3d7d207',
                'X-RapidAPI-Host': 'books-api7.p.rapidapi.com'
            }
        };
        // get 5 random books
        for(let i = 0; i < 5; i++){
        try {
            const response = await fetch(url, options);
            const result = await response.json();
            console.log(result);
        } catch (error) {
            console.error(error);
        }
    }
        
    }

    function fetchBestSellers() {
        // get best sellers list
        var key = "uApovvwLcJVuNdbyxAM28Mm64IfUeEmG"       
        var url = "https://api.nytimes.com/svc/books/v3/lists/best-sellers/history.json?api-key=" + key
    
        fetch(url)
        .then(response => response.json())
        .then(data => {
             
            var bestSeller = data.results;

            console.log(bestSeller);
        })
    }

    // fetchSearchedBook();

    // fetchBestSellers();

    // fetchRandomBook();
});