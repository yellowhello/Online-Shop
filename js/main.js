// main variables:
// main content array variable
host = window.location.hostname
uploadContent();
// initialize and upload content
function uploadContent() {
    $.ajax({
        //   // тут замість app/selectFrom.php напиши адресу до свого серверу 
        //   // (що буде повертати адресу картинки у форматі json)
        // url:"http://"+host+"/cloud-api/meals",
        url: "http://" + host + ":8080/meals",

        type: "GET",
        crossDomain: true,
        success: function(data) {

            var dataArray = []
            var names = [];

            content = data._embedded.meals;
            // for (i in dataArray) {
            //     names.push(dataArray[i].name);
            // }
            //     //  let's display content
            displayContent(content);
        }
    });
}

function displayContent(content) {
    // imagesHtml = "<b>meals:<ul>";
    // dataArray.forEach(function(item, index, dataArray) {
    //     imagesHtml += "<li>" + item + "</li>";
    // });
    // imagesHtml += "</ul></b>"
    //     // test-mages - is our class in index.html div 
    // $(".test-div").html(imagesHtml);


    // =============================
    if (content[0] != null) {
        var productHtml = " ";
        var productsCount = content.length;
        // var names = content[0];
        // var codes = content[1];
        // var images = content[2];
        // var prices = content[3];
        // var filters = content[4];
        // var characteristics = content[5];

        var counter = 0; //row counter
        var countInRow = 2;
        for (var i = 0; i < productsCount; i++) {

            if (counter % countInRow == 0)
                productHtml += "<div class=\"productRow\">";

            //   var filter = filters[i];
            productHtml += "<div class=\"product\">"; //+images[i];
            //   productHtml+=" <p class=\"code\">"+codes[i]+"</p>";
            productHtml += " <p class=\"name\">" + content[i].name + "</p>";
            productHtml += " <p class=\"amount\">" + content[i].amount + "</p>";
            productHtml += " <p class=\"expirationDate\">" + content[i].expirationDate + "</p>";
            productHtml += " <p class=\"meal_href hide\">" + content[i]._links.self.href + "</p>";

            //   productHtml+=" <p class=\"price\">"+prices[i]+"</p>";
            //   productHtml+=" <p class=\"characteristics\" hidden>"+characteristics[i]+"</p>"
            productHtml += " <button class=\"cart\">у кошик <i class=\"fas fa-shopping-basket\"></i></button>";
            productHtml += " </div>";

            if ((counter % countInRow) - 1 == 0) { //than end of new row
                productHtml += "</div>"; //close .productRow
            }
            counter++;
        }
        // defense from unclosed .productRow
        if ((counter - 1) % 2 == 0 && content.length != 0) productHtml += "</div>";

        // $(productHtml).appendTo(".products");
        $(".products").html(productHtml);
    }

}



// ===================================================
// collect product input data
function collectProductData() {
    // output array
    var productArray = [];

    var prodName = $(".addEditModal").find(".productName").val();
    var prodAmount = $(".addEditModal").find(".productAmount").val();

    productArray.push(prodName);
    productArray.push(prodAmount);
    // return output productArray data
    return productArray;
}

// when manager click on save button
$(".addEditModal").click(function(event) {
    // var myModal=this;
    var target = event.target;
    if ($(target).is(".save")) {
        // manager clicks eectly on save button
        var productDataArray = collectProductData();
        // call to addEditProduct.php
        $.ajax({
            // url:"http://"+host+"/cloud-api/meals",
            url: "http://" + host + ":8080/meals",
            headers: {
                'Content-Type': 'application/json'
            },
            data: JSON.stringify({
                "name": productDataArray[0],
                "amount": productDataArray[1],
                "expirationDate": null,
                "discount": null,
            }),
            type: "POST",
            crossDomain: true,
            success: function() {
                // refresh products
                uploadContent();
            }
        })
    }
})