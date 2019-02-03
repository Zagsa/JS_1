 "use strict";
    /*ССделать генерацию корзины динамической: верстка корзины не должна находиться в HTML-структуре.
    Там должен быть только div, в который будет вставляться корзина, сгенерированная на базе JS:
    - Пустая корзина должна выводить строку «Корзина пуста»;
    - Наполненная должна выводить «В корзине: n товаров на сумму m рублей».
    */


 var cart = {
     cartContainerEl: document.getElementById('cart'),
     sumTotal: 0,
     sumOrderItem: 0,
     cartNameItem: ['Название продукта', 'Количество', 'цена', 'стоимость'],
     orderedItem: [{
         productName: 'T-shirt',
         quantity: 3,
         price: 500,
     },
         {
             productName: 'dress',
             quantity: 2,
             price: 2500,
         },
         {
             productName: 'shoes',
             quantity: 1,
             price: 5000,
         },
         {
             productName: 'bag',
             quantity: 1,
             price: 3500,
         },
         {
             productName: 'socks',
             quantity: 5,
             price: 100,
         }
     ],

     /**
      * Функция считает стоимость корзины.
      * @param  [{object}] Массив, состоящий из позиций корзины, объект {наименование товара, количество, цена}.
      * @return (sumTotal){number} Вернет полную стоимость корзины.
      */
     countBasketPrice: function () {
         if (this.orderedItem.length > 0) {
             for (var i = 0; i < this.orderedItem.length; i++) {
                 this.sumTotal += this.orderedItem[i].quantity * this.orderedItem[i].price;
             }
         }
         return this.sumTotal;
     },
     /**
      * Функция отображает корзину на странице
      */
     displayCart: function () {

         if (this.orderedItem.length > 0) {
             // отрисовать корзину если длина массива больше 0, в конце вывести сообщения о стоимости корзины
             var $div = document.createElement('div');
             $div.classList.add('cart-row');
             this.cartContainerEl.appendChild($div); // шапка корзины
             // добавить описание полей шапки корзины

             for (var i = 0; i < this.cartNameItem.length; i++) {
                 var $div1 = document.createElement('div');
                 $div1.classList.add('sizeColumn');
                 $div1.textContent = this.cartNameItem[i];
                 $div.appendChild($div1);

             }

             // далее вывод позиций заказанного товара
             for (var i = 0; i < this.orderedItem.length; i++) {
                 var $div = document.createElement("div");
                 $div.classList.add('cart-row');
                 this.cartContainerEl.appendChild($div);

                     var $div1 = document.createElement('div');
                     $div1.classList.add('sizeColumn');
                     $div1.textContent = this.orderedItem[i].productName;
                     $div.appendChild($div1);

                     $div1 = document.createElement('div');
                     $div1.classList.add('sizeColumn');
                     $div1.textContent = this.orderedItem[i].quantity;
                     $div.appendChild($div1);

                     $div1 = document.createElement('div');
                     $div1.classList.add('sizeColumn');
                     $div1.textContent = this.orderedItem[i].price;
                     $div.appendChild($div1);

                     $div1= document.createElement('div');
                     $div1.classList.add('sizeColumn');
                     $div1.textContent = this.orderedItem[i].price * this.orderedItem[i].quantity;
                     $div.appendChild($div1);

             }

             this.countBasketPrice();

             var $h2 = document.createElement('h2');
             $h2.classList.add('h2-cart');
             $h2.textContent = 'Заказано: ' + this.orderedItem.length + ' позиций товара на общую сумму \n' +
                 + this.sumTotal +  'руб.';
             this.cartContainerEl.appendChild($h2);


         }else {
                 // вывести сообщение - корзина пуста
             var $h2 = document.createElement('h2');
             $h2.classList.add('h2-cart');
             $h2.textContent = 'Корзина пуста.';
             this.cartContainerEl.appendChild($h2);
         }
     }

 };

 cart.displayCart();





