$(document).ready(function () {
    //alert('Hello');

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

    $('.addToCart').click(function () {
        // alert('hello');
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

        //console.log(shop_items);
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

        count();

    });


    getData();
    function getData() {
        let shopString = localStorage.getItem('shops');
        if (shopString) {
            let shopArray = JSON.parse(shopString);

            let data = '';
            let k = 1;
            let total = 0;
            $.each(shopArray, function (i, v) {

                data += `<tr align="center">
                            <td>${k++}</td>
                            <td>${v.name}</td>
                            <td>${v.price}</td>

                            <td align="center">
                                <button class="min" data-key="${i}" > - </button>
                                ${v.qty}
                                <button class="max" data-key="${i}"> + </button>
                            </td>
                            <td align="center">${v.price * v.qty}</td>               
                
                        </tr>`;
                total += v.price * v.qty;

            });
            data += `<tr align="center">
                        <td colspan="4" align="center">Total US dollar ($)</td>;
                        <td>${total}</td>;
            
                    </tr>`;
            console.log(data);

            $('#itemTbody').html(data);
        }
    }

    $('#itemTbody').on('click', '.min', function () {
        // alert('hello')
        let key = $(this).data('key');
        console.log(key);

        let shopString = localStorage.getItem('shops');
        if (shopString) {
            let shopArray = JSON.parse(shopString);

            $.each(shopArray, function (i, v) {
                if (key == i) {
                    v.qty--;
                    if (v.qty == 0 || v.qty < 0) {
                        shopArray.splice(key, 1);
                    }
                }
            });
            let shopData = JSON.stringify(shopArray);
            localStorage.setItem('shops', shopData);

            getData();
        }
    });

    $('#itemTbody').on('click', '.max', function () {
        // alert('hello')
        let key = $(this).data('key');
        console.log(key);

        let shopString = localStorage.getItem('shops');
        if (shopString) {
            let shopArray = JSON.parse(shopString);

            $.each(shopArray, function (i, v) {
                if (key == i) {
                    v.qty++;

                }
            });
            let shopData = JSON.stringify(shopArray);
            localStorage.setItem('shops', shopData);

            getData();
        }
    });

    $('#order_now').click(function () {
        let ans = confirm('Are you sure to order now');
        if (ans) {
            localStorage.removeItem('shops');
            window.location.href = '../correction-pages/index.html';
        }

    });




});