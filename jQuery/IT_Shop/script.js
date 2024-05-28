$(document).ready(function () {
    //alert('Hello');
    $('.addToCart').click(function () {

        count();

        function count() {
            let shopString = localStorage.getItem('shops');
            if (shopString) {
                let shopArray = JSON.parse(shopString);

                if (shopArray != null) {
                    $('#count_item').text(shopArray.length);
                }
            }

        }


        let id = $(this).data('id');
        let name = $(this).data('name');
        let price = $(this).data('price');
        //console.log(id, name, price);

        let shop_items = {
            id: id,
            name: name,
            price: price,
            qty: 1
        }
        console.log(shop_items);
        let shopString = localStorage.getItem('shops');
        let shopArray;
        if (shopString == null) {
            shopArray = [];
        } else {
            shopArray = JSON.parse(shopString);
        }

        let status = false;
        $.each(shopArray, function (i, v) {
            if (id == v.id) {
                status = true;
                v.qty++;
            }
        })

        if (status == false) {
            shopArray.push(shop_items);
        }

        let shopData = JSON.stringify(shopArray);
        localStorage.setItem('shops', shopData);

        count()

    })

});