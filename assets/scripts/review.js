$(document).ready(function () {


    // Event listener for append button
    $(document).on("click", "#append-btn", function (event) {
        event.preventDefault();
        $("#review-modal").modal("show");

        var bookIndex = $(this).parent().parent().attr("id");
        // get review of the current book from local storage
        var bookReview = JSON.parse(localStorage.getItem("myBooks"))[bookIndex].review;
      
        // append the review to the review modal
        $("#review").val(bookReview);
        $("#save-review-btn").attr("data-id", bookIndex);
    });

    // event listener for delete button
    $(document).on("click", "#delete-btn", function (event) {
        event.preventDefault();
        var bookIndex = $(this).parent().parent().attr("id");
        // clear the review of the current book
        var savedBooks = JSON.parse(localStorage.getItem("myBooks"));
        savedBooks[bookIndex].review = "";
        localStorage.setItem("myBooks", JSON.stringify(savedBooks));

        // clear the book container
        $("#book-container").empty();
        displayBooks();

    });
    // event listener for add review button 
    $(document).on("click", "#add-review-btn", function (event) {
        event.preventDefault();
        var bookIndex = $(this).parent().parent().attr("id");
        //clear review 
        $("#review").val("");
        $("#review-modal").modal("show");
        $("#save-review-btn").attr("data-id", bookIndex);
    });

    // event listener for save review button
    $(document).on("click", "#save-review-btn", function (event) {
        event.preventDefault();
        var bookIndex = $(this).attr("data-id");
        var reviewInput = $("#review").val().trim();
        // clear review input
        $("#review").val("");

        if (reviewInput === "") {
            $("#empty-review-modal").modal("show");
            return;
        }

        // get the books from local storage
        var savedBooks = JSON.parse(localStorage.getItem("myBooks")) || [];

        // get the book at the index of the book index
        var book = savedBooks[bookIndex];
      
        // add the review to the book object
        book.review = reviewInput;

        // save the book back to local storage
        savedBooks[bookIndex] = book;
        localStorage.setItem("myBooks", JSON.stringify(savedBooks));

        // hide the review modal
        $("#review-modal").modal("hide");
        $("#review-added-modal").modal("show");
        // clear the book container
        $("#book-container").empty();

        // display the books
        displayBooks();
    });
    // display books title from local storage into the  books section
    function displayBooks() {
        var savedBooks = JSON.parse(localStorage.getItem("myBooks")) || [];
        for (var i = 0; i < savedBooks.length; i++) {
            // for each book add a new row to the book container and display the book title 
            // review and a button to add a review
            var book = savedBooks[i];
            var bookDiv = $("<div>").addClass("row text-center").attr("id", [i]);
            var bookTitleDiv = $("<div>").addClass("col-md-3").text(book.title);
            var bookReviewDiv = $("<div>").addClass("col-md-6").text(book.review);
            var buttondDiv = $("<div>").addClass("col-md-3");
            var reviewBtn = $("<button>").addClass("btn btn-primary btn-success").text("Add").attr("id", "add-review-btn");
            var appendBtn = $("<button>").addClass("btn btn-primary btn-warning").text("Append").attr("id", "append-btn");
            var deleteBtn = $("<button>").addClass("btn btn-primary btn-danger").text("Delete").attr("id", "delete-btn");

            if (book.review) {
                buttondDiv.append(deleteBtn);
                buttondDiv.append(appendBtn);
            } else {
                buttondDiv.append(reviewBtn);
            }
            bookDiv.append(bookTitleDiv, bookReviewDiv, buttondDiv);
            $("#book-container").append(bookDiv);

            console.log(book);
        }
    }
    displayBooks();
});