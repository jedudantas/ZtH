function addDragnDropHandlers() {
    var deckImages = document.getElementsByClassName("deckArticleThumb");
    var wishlistDropZone = document.getElementById("wishlistZone");
    var wishlist = document.querySelectorAll("#wishlistZone ul") [0];
    var Cart = (function (){
        this.decks = new Array();
    });
    var Deck = (function (id, power){
        this.deckId = id;
        this.power = power;
    });

    var currentCart = null;
    currentCart = JSON.parse(localStorage.getItem('cart'));
    if (!currentCart){
        createEmptyCart();
    }


    UpdateWishlistUI();

    for(var i=0;i<deckImages.length;i++){
        deckImages[i].addEventListener("dragstart",function(ev){
            ev.dataTransfer.effectAllowed = 'copy';
            ev.dataTransfer.setData("Text", this.getAttribute("id"));
        }, false);
    }

    wishlistDropZone.addEventListener("dragover", function (ev){
        if(ev.preventDefault)
            ev.preventDefault();
            ev.dataTransfer.dropEffect = "copy";
            return false;
    }, false);

    wishlistDropZone.addEventListener("drop", function(ev){
        if(ev.stopPropagation)
            ev.stopPropagation();

            var deckId = ev.dataTransfer.getData("Text");
            var element = document.getElementById(deckId);

            addDecktoWishlist(element, deckId);
            ev.stopPropagation();

            return false;
    }, false);


    function addDecktoWishlist(item, id){
        var html = id+""+item.getAttribute("deckArticlePower");

        var liElement = document.createElement('li');
        liElement.innerHTML = html;
        wishlist.appendChild(liElement);
    }

    function createEmptyCart(){
        localStorage.clear;
        localStorage.setItem("cart",JSON.stringify(new Cart()));
        currentCart = JSON.parse(localStorage.getItem("cart"));
    }

    function UpdateWishlistUI(){
        wishlist.innerHTML = " ";
        for (var i=0; i <currentCart.decks.length;i++){
            var liElement = document.createElement('li');
            liElement.innerHTML = currentCart.decks[i].deckId+" "+currentCart.decks[i].power;
            wishlist.appendChild(liElement);
        }
    }

}