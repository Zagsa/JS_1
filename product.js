 "use strict";
    /*Сделать так, чтобы товары в каталоге выводились при помощи JS:
    Создать массив товаров (сущность Product);
    При загрузке страницы на базе данного массива генерировать вывод из него.
    HTML-код должен содержать только div id=”catalog” без вложенного кода. Весь вид каталога генерируется JS.
    */


 var product = {
     $productEl: document.getElementById('catalog'),
     $cartContainerEl: document.getElementById('cart'),
     cartNameItem: ['Название продукта', 'цена', 'количество'],
     orderItem: 0,
     basketSumma: 0,
     quantityOrder: 1,
     /**
      * объект каталог
      */
     productItem: [{
         img: 'img/tshirt.png',
         productName: 'T-shirt',
         price: 500,
         quantity: 3,
     },
         {
             img: 'img/dress.png',
             productName: 'Dress',
             price: 2500,
             quantity: 10,
         },
         {
             img: 'img/shoes.png',
             productName: 'Shoes',
             price: 5000,
             quantity: 15,
         },
         {
             img: 'img/bag.png',
             productName: 'Bag',
             price: 3500,
             quantity: 5,
         },

     ],
     /**
      * объект корзина - заказанные позиции
      */
     orderedItem: [],

     /**
      * Функция отображает каталог на странице
      */
     displayProduct: function () {
         // далее вывод позиций каталога
         for (var i = 0; i < this.productItem.length; i++) {
             var $div = document.createElement('div');
             $div.classList.add('product');
             this.$productEl.appendChild($div);

             var $div1 = document.createElement('a');
             $div1.href = '#';
             $div.appendChild($div1);

             var $div11 = new Image();
             $div11.classList.add('img');
             $div11.src = this.productItem[i].img;
             $div1.appendChild($div11);

             var $div2 = document.createElement('p');
             $div2.classList.add('p-product');
             $div2.textContent = this.productItem[i].productName;
             $div.appendChild($div2);

             var $div3 = document.createElement('p');
             $div3.classList.add('p-product');
             $div3.textContent = 'Цена: ' + this.productItem[i].price + ' руб.';
             $div.appendChild($div3);

             var $div4 = document.createElement('button');
             $div4.classList.add('button');
             $div4.textContent = 'КУПИТЬ';
             $div.appendChild($div4);
             $div4.dataset.img = this.productItem[i].img;
             $div4.dataset.productName = this.productItem[i].productName;
             $div4.dataset.price = this.productItem[i].price;
             //$div4.dataset.quantity = this.quantityOrder;
         }
     },

     /**
      * Функция создает массив выбрвнных товаров и количество и сумму заказанных товаров
      */
     basketOrder: function () {
         document.querySelector('.wrap').addEventListener('click', event => {
             if (event.target.tagName !== 'BUTTON') {
                 return;
             }
             // console.log(event.target); // вывести ту кнопку которую нажали.
             this.orderItem += 1;
             this.basketSumma += +event.target.dataset.price;
             this.basketSum();

             this.orderedItem.push({productName: event.target.dataset.productName,
                 price : event.target.dataset.price,
                 quantity : 1}); // пока заглушка. если есть похожий товар то не добавлять позиции а только
                                 // увеличивать кол-во

              console.log(this.orderedItem);

         });
     },

     /**
      * Функция отображает корзину на странице
      */
     displayCart: function () {

         if (this.orderedItem.length > 0) {
             // отрисовать корзину если длина массива больше 0
             var $cartdiv = document.createElement('div');
             $cartdiv.classList.add('cart-row');
             this.$cartContainerEl.appendChild($cartdiv); // шапка корзины
             // добавить описание полей шапки корзины

             for (var i = 0; i < this.cartNameItem.length; i++) {
                 var $cartdiv1 = document.createElement('div');
                 $cartdiv1.classList.add('sizeColumn');
                 $cartdiv1.textContent = this.cartNameItem[i];
                 $cartdiv.appendChild($cartdiv1);

             }

             // далее вывод позиций заказанного товара
             for (var i = 0; i < this.orderedItem.length; i++) {
                 var $cartdiv = document.createElement("div");
                 $cartdiv.classList.add('cart-row');
                 this.$cartContainerEl.appendChild($cartdiv);

                 var $cartdiv1 = document.createElement('div');
                 $cartdiv1.classList.add('sizeColumn');
                 $cartdiv1.textContent = this.orderedItem[i].productName;
                 $cartdiv.appendChild($cartdiv1);

                 $cartdiv1 = document.createElement('div');
                 $cartdiv1.classList.add('sizeColumn');
                 $cartdiv1.textContent = this.orderedItem[i].quantity;
                 $cartdiv.appendChild($cartdiv1);

                 $cartdiv1 = document.createElement('div');
                 $cartdiv1.classList.add('sizeColumn');
                 $cartdiv1.textContent = this.orderedItem[i].price;
                 $cartdiv.appendChild($cartdiv1);

                 /*$cartdiv1= document.createElement('div');
                 $cartdiv1.classList.add('sizeColumn');
                 $cartdiv1.textContent = this.orderedItem[i].price * this.orderedItem[i].quantity;
                 $cartdiv.appendChild($div1);*/
             }
         }else {
             // вывести сообщение - корзина пуста
             var $h2 = document.createElement('h2');
             $h2.classList.add('h2-cart');
             $h2.textContent = 'Корзина пуста.';
             this.$cartContainerEl.appendChild($h2);
         };
     },


     /**
      * Функция отображает количество и сумму заказанных товаров
      */
     basketSum: function () {
         var $basketCount = document.getElementById('basket-count');
         $basketCount.textContent = this.orderItem;

         var $basketPrice = document.getElementById('basket-price');
         $basketPrice.textContent = this.basketSumma + ' руб.';
     },

     /**
      * Функция очищяет корзину
      */
     basketClear: function () {
         document.getElementById('basket-clear').addEventListener('click', event => {
             this.orderItem = 0;
             this.basketSumma = 0;
             var $basketCount = document.getElementById('basket-count');
             $basketCount.textContent = this.orderItem;
             var $basketPrice = document.getElementById('basket-price');
             $basketPrice.textContent = this.basketSumma + ' руб.';
             this.orderedItem.splice(0, this.orderedItem.length);
             // заглушка, не поняла как легко удалять элементы из DOM
             //var $cartClear = document.querySelectorAll('.cart-row');
             //console.log($cartClear);
             /*for (var i = 0; i < $cartClear.length; i++) {
                 cart.removeChild(cart.children[ i+1 ]);
             };*/

         });
     },

     /**
      * Функция выводит позиции заказанных товаров в корзине
      */
     basketCheck: function () {
         document.getElementById('basket-check').addEventListener('click', event => {
             this.displayCart();
         });
     },

     /**
      * Функция отображает страницу каталога
      */
     runProduct: function () {
         //this.basketInit();
         console.log(`2 количество товара: ${this.orderItem}`);
         console.log(`2 Стоимость товара: ${this.basketSumma}`);
         if (this.productItem.length > 0) { // вывести каталог если длина массива больше 0
         this.displayProduct();
         this.basketOrder();
         this.basketClear();
         this.basketCheck();


         };
     },

 };

 product.runProduct();

 //basket-count
 //basket-price





