 "use strict";
    /*Сделать так, чтобы товары в каталоге выводились при помощи JS:
    Создать массив товаров (сущность Product);
    При загрузке страницы на базе данного массива генерировать вывод из него.
    HTML-код должен содержать только div id=”catalog” без вложенного кода. Весь вид каталога генерируется JS.
    */


 var cart = {
     productEl: document.getElementById('catalog'),
     productNameItem: ['Название продукта', 'цена'],
     productItem: [{
         productName: 'T-shirt',
         price: 500,
     },
         {
             productName: 'dress',
             price: 2500,
         },
         {
             productName: 'shoes',
             price: 5000,
         },
         {
             productName: 'bag',
             price: 3500,
         },
         {
             productName: 'socks',
             price: 100,
         }
     ],


     /**
      * Функция отображает каталог на странице
      */
     displayProduct: function () {

         if (this.productItem.length > 0) {
             // отрисовать каталог если длина массива больше 0
             var $div = document.createElement('div');
             $div.classList.add('cart-row');
             this.productEl.appendChild($div); // шапка корзины
             // добавить описание полей шапки корзины

             for (var i = 0; i < this.productNameItem.length; i++) {
                 var $div1 = document.createElement('div');
                 $div1.classList.add('sizeColumn');
                 $div1.textContent = this.productNameItem[i];
                 $div.appendChild($div1);

             }

             // далее вывод позиций каталога
             for (var i = 0; i < this.productItem.length; i++) {
                 var $div = document.createElement("div");
                 $div.classList.add('cart-row');
                 this.productEl.appendChild($div);

                     var $div1 = document.createElement('div');
                     $div1.classList.add('sizeColumn');
                     $div1.textContent = this.productItem[i].productName;
                     $div.appendChild($div1);

                     $div1 = document.createElement('div');
                     $div1.classList.add('sizeColumn');
                     $div1.textContent = this.productItem[i].price;
                     $div.appendChild($div1);
             }
         }
     }

 };

 cart.displayProduct();





