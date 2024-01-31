$(document).ready(function () {

    
   
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

    function fetchSearchedBook() {
       // get book based on search query
       var key = "AIzaSyAOh3C66B7oLTIfasJ7UZ0EoWtKXKW3SWs"
       var query = "the lord of the rings"
       var url = "https://www.googleapis.com/books/v1/volumes?q="+ query +"&key=" + key
       fetch(url)
       .then(response => response.json())
       .then(data => {
          
           var book = data.items;

           console.log(book);

       })
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

    fetchSearchedBook();

    fetchBestSellers();

    fetchRandomBook();
});