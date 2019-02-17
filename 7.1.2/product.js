 "use strict";
    /*Сделать так, чтобы товары в каталоге выводились при помощи JS:
    Создать массив товаров (сущность Product);
    При загрузке страницы на базе данного массива генерировать вывод из него.
    HTML-код должен содержать только div id=”catalog” без вложенного кода. Весь вид каталога генерируется JS.
    */


 var product = {
     $productEl: document.getElementById('catalog'),
     $cartContainerEl: document.getElementById('cart'),
     cartNameItem: [ 'Название продукта', '', 'цена', 'количество', 'Сумма', ''],
     index: NaN,
     orderItem: 0,
     basketSumma: 0,
     quantityOrder: 1,
     /**
      * объект каталог
      */
     productItem: [{
         productCode: 1,
         img: 'img/tshirt.png',
         productName: 'Футболка',
         price: 500,
         quantity: 3,
     },
         {
             productCode: 2,
             img: 'img/dress.png',
             productName: 'Платье',
             price: 2500,
             quantity: 10,
         },
         {
             productCode: 3,
             img: 'img/shoes.png',
             productName: 'Туфли',
             price: 5000,
             quantity: 15,
         },
         {
             productCode: 4,
             img: 'img/bag.png',
             productName: 'Сумка',
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
             $div4.textContent = 'Добавить в корзину';
             $div.appendChild($div4);
             $div4.dataset.productCode = this.productItem[i].productCode;
             $div4.dataset.img = this.productItem[i].img;
             $div4.dataset.productName = this.productItem[i].productName;
             $div4.dataset.price = this.productItem[i].price;
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
             this.orderItem += 1;
             this.basketSumma += +event.target.dataset.price;
             this.basketSum();

             if (this.orderedItem.length > 0) {
                 if (this.isOrderedItemCart(event.target.dataset.productCode)) {
                     this.orderedItem[this.index].quantity ++;
                 } else {
                     this.orderedItem.push({
                         productCode: event.target.dataset.productCode,
                         img: event.target.dataset.img,
                         productName: event.target.dataset.productName,
                         price: event.target.dataset.price,
                         quantity: 1,
                     });
                 }
             } else {
                 this.orderedItem.push({
                     productCode: event.target.dataset.productCode,
                     img: event.target.dataset.img,
                     productName: event.target.dataset.productName,
                     price: event.target.dataset.price,
                     quantity: 1,
             });
             }
         });
     },
     /**
      * Функция проверяет есть ли товар уже в корзине
      *
      * Возвращает true и индекс товара в массиве, если в корзине уже есть такой товар.
      */
     isOrderedItemCart: function(OrderedProductCode) {
         for (var i = 0; i < this.orderedItem.length; i++) {
             if (this.orderedItem[i].productCode === OrderedProductCode){
                 this.index = i;
                 return true;
             }
         }
     },

     /**
      * Функция отображает корзину на странице
      */
     displayCart: function () {

         if (this.orderedItem.length > 0) {
             // отрисовать корзину если длина массива больше 0
             document.getElementById('cartContainer').classList.add('cartContainer');

             var $cartItemDiv = document.createElement('div');
             $cartItemDiv.classList.add('cartItemBlock');
             this.$cartContainerEl.appendChild($cartItemDiv);

             var $cartButton = document.createElement('button');
             $cartButton.classList.add('basket-button', 'checkoutBtn');
             $cartButton.id = 'checkoutBtn';
             $cartButton.textContent = 'Оформить заказ';
             $cartButton.addEventListener('click', event => {event.preventDefault()});
             this.$cartContainerEl.appendChild($cartButton);
             this.checkout();

             var $cartdiv = document.createElement('div');
             $cartdiv.classList.add('cart-row');
             $cartItemDiv.appendChild($cartdiv); // шапка корзины
             // добавить описание полей шапки корзины

             for (var i = 0; i < this.cartNameItem.length; i++) {
                 var $cartdiv1 = document.createElement('div');
                 $cartdiv1.classList.add('sizeColumn');
                 $cartdiv1.textContent = this.cartNameItem[i];
                 $cartdiv.appendChild($cartdiv1);
             }

             // далее вывод позиций заказанного товара
             for (var i = 0; i < this.orderedItem.length; i++) {
                 $cartdiv = document.createElement("div");
                 $cartdiv.classList.add('cart-row');

                 $cartItemDiv.appendChild($cartdiv);
                 //this.$cartContainerEl.appendChild($cartdiv);

                 $cartdiv1 = new Image();
                 $cartdiv1.classList.add('sizeColumn', 'cartImg');
                 $cartdiv1.src = this.orderedItem[i].img;
                 $cartdiv.appendChild($cartdiv1);

                 $cartdiv1 = document.createElement('div');
                 $cartdiv1.classList.add('sizeColumn');
                 $cartdiv1.textContent = this.orderedItem[i].productName;
                 $cartdiv.appendChild($cartdiv1);

                 $cartdiv1 = document.createElement('div');
                 $cartdiv1.classList.add('sizeColumn');
                 $cartdiv1.textContent = this.orderedItem[i].price + ' руб.';
                 $cartdiv.appendChild($cartdiv1);

                 $cartdiv1 = document.createElement('input');
                 $cartdiv1.classList.add('sizeColumn', 'quantity');
                 $cartdiv1.type = 'number';
                 $cartdiv1.size = '20';
                 $cartdiv1.dataset.indexCart = i;
                 $cartdiv1.min = 0;
                 $cartdiv1.value = this.orderedItem[i].quantity;
                 $cartdiv1.addEventListener('input', event => {event.preventDefault()});
                 $cartdiv.appendChild($cartdiv1);

                 $cartdiv1= document.createElement('div');
                 $cartdiv1.classList.add('sizeColumn', 'sum');
                 $cartdiv1.textContent = this.orderedItem[i].price * this.orderedItem[i].quantity + ' руб.';
                 $cartdiv.appendChild($cartdiv1);

                 $cartdiv1= document.createElement('a');
                 $cartdiv1.classList.add('sizeColumn', 'closeCart');
                 $cartdiv1.href = '#';
                 $cartdiv.appendChild($cartdiv1);
                 $cartdiv1.addEventListener('click', event => {event.preventDefault()});

                 var $cartTagI= document.createElement('i');
                 $cartTagI.classList.add('fa', 'fa-window-close');
                 $cartTagI.dataset.indexCart = i;
                 $cartdiv1.appendChild($cartTagI);

             }
         }else {
             // вывести сообщение - корзина пуста
             var $h2 = document.createElement('h2');
             $h2.classList.add('h2-cart');
             $h2.textContent = 'Корзина пуста.';
             this.$cartContainerEl.appendChild($h2);
         }
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
      * Функция считает количество и сумму заказанных товаров в корзине
      */
     basketSumCount: function () {
         this.orderItem = 0;
         this.basketSumma = 0;
         for (var i = 0; i < this.orderedItem.length; i++) {
             this.orderItem += this.orderedItem[i].quantity;
             this.basketSumma += this.orderedItem[i].price * this.orderedItem[i].quantity;
         }
     },

     /**
      * Функция очищяет корзину
      */
     basketClear: function () {
         document.getElementById('basket-clear').addEventListener('click', event => {
             this.orderItem = 0;
             this.basketSumma = 0;
             this.orderedItem.splice(0, this.orderedItem.length);
             this.cartremove();
             this.basketSum();
         });
     },
     /**
      * Функция удаляет заказанный товар из корзины и обновляет корзину
      */

     handleDeleteClick: function () {
         document.getElementById('cart').addEventListener('click', event => {
             if (event.target.tagName === 'I') {
                 this.orderItem -= (this.orderedItem[+event.target.dataset.indexCart].quantity);
                 this.basketSumma -= (this.orderedItem[+event.target.dataset.indexCart].quantity) *
                                      (this.orderedItem[+event.target.dataset.indexCart].price);

                 this.orderedItem.splice(+event.target.dataset.indexCart, 1);
                 this.cartremove();
                 this.displayCart();
                 this.basketSum();
             }
         });
     },

     /**
      * Функция изменяет количество заказаного товара в корзине
      * пересчитывает сумму товара и общую сумму корзины
      */

     handleChangeQuantity: function () {
         document.getElementById('cart').addEventListener('input', event => {
             if (event.target.tagName === 'INPUT') {
                 this.orderedItem[+event.target.dataset.indexCart].quantity = +event.target.value;
                 this.basketSumCount();
                 this.cartremove();
                 this.displayCart();
                 this.basketSum();
             }
         });
     },

     /**
      * Функция скрывает отображение позиций корзины на странице
      */
     cartremove: function (){
         while (this.$cartContainerEl.firstChild) {
             this.$cartContainerEl.removeChild(this.$cartContainerEl.firstChild);
         }
         document.getElementById('cartContainer').classList.remove('cartContainer');
         this.isAddressAction();

     },

     /**
      * Функция выводит позиции заказанных товаров в корзине
      */
     basketCheck: function () {
         document.getElementById('basket-check').addEventListener('click', event => {
             this.isAddressAction();
             this.$productEl.innerHTML = '';
             this.cartremove();
             this.displayCart();
             document.getElementById('basket-check').style.display = 'none';

         });
     },

     /**
      * Функция удаляет со страницы корзину и запускает продолжение покупок
      */
     continueShopping: function () {
         document.getElementById('continue-shopping').addEventListener('click', event => {
             this.cartremove();
             this.$productEl.innerHTML = '';
             this.isAddressAction();
             this.displayProduct();
             document.getElementById('basket-check').style.display = 'flex';
         });
     },

     /**
      * Функция оформления заказа
      */
     checkout: function () {
         document.getElementById('checkoutBtn').addEventListener('click', event => {
             this.cartremove();
             this.deliveryAddress();

         });
     },
     /**
      * Функция проверяет активна ли форма Алрес Доставки
      */
     isAddressAction: function () {
         if (document.getElementById('formAddress')) {
             document.getElementById('formAddress').classList.remove('address');
             document.getElementById('formAddress').innerHTML = '';
         }
     },

     /**
      * Функция вывода блока адреса доставки
      */
     deliveryAddress: function () {
         document.getElementById('basket-check').style.display = 'flex';
         var $cartContainer = document.getElementById('cartContainer');
         var $address = document.createElement('form');
         $address.id = 'formAddress';
         $address.classList.add('address');

         $cartContainer.insertBefore($address, $cartContainer.children[1]);

         var $addressItem = document.createElement('input');
         $addressItem.placeholder = 'Фамилия';
         $addressItem.classList.add('addressItem');
         $addressItem.type = 'text';
         $addressItem.size = '60';
         $address.appendChild($addressItem);

         $addressItem = document.createElement('input');
         $addressItem.placeholder = 'Имя';
         $addressItem.classList.add('addressItem');
         $addressItem.type = 'text';
         $addressItem.size = '60';
         $address.appendChild($addressItem);

         $addressItem = document.createElement('input');
         $addressItem.placeholder = 'Индекс';
         $addressItem.classList.add('addressItem');
         $addressItem.type = 'text';
         $addressItem.size = '60';
         $address.appendChild($addressItem);

         $addressItem = document.createElement('input');
         $addressItem.placeholder = 'Город';
         $addressItem.classList.add('addressItem');
         $addressItem.type = 'text';
         $addressItem.size = '60';
         $address.appendChild($addressItem);

         $addressItem = document.createElement('input');
         $addressItem.placeholder = 'Адрес доставки';
         $addressItem.classList.add('addressItem');
         $addressItem.type = 'text';
         $addressItem.size = '60';
         $address.appendChild($addressItem);

         $addressItem = document.createElement('input');
         $addressItem.placeholder = 'Телефон';
         $addressItem.classList.add('addressItem');
         $addressItem.type = 'tel';
         $addressItem.size = '60';
         $address.appendChild($addressItem);

         $addressItem = document.createElement('input');
         $addressItem.placeholder = 'Отправить';
         $addressItem.classList.add('basket-button', 'checkoutBtn');
         $addressItem.type = 'submit';
         $addressItem.size = '60';
         $address.appendChild($addressItem);

     },
     /**
      * Функция отображает страницу каталога
      */
     runProduct: function () {
         if (this.productItem.length > 0) { // вывести каталог если длина массива больше 0
         this.displayProduct();
         this.basketOrder();
         this.basketClear();
         this.basketCheck();
         this.continueShopping();
         this.handleDeleteClick();
         this.handleChangeQuantity();
         }
     },
 };

 product.runProduct();






