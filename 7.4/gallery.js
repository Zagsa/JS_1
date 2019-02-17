"use strict";

var productGallery = {
    productItem: [{
        productCode: 1,
        img: {
            minImg: ['img/min/min1.jpg', 'img/min/min2.jpg', 'img/min/min3.jpg'],
            maxImg: ['img/max/max1.jpg', 'img/max/max2.jpg', 'img/max/max3.jpg']},
        productName: 'Туфли',
        price: 500,
        quantity: 3,
    },
    ],
    $openedImageEl: null,
    $fullImgUrl: null,
    $max: document.getElementById('max'),

    /**
     *  Отрисовать галерею продукта из маленьких картинок.
     *  по умолчанию в модальном окне открыть первую маленькую картинку
     *  @param {number} openProduct - индекс продукта в массиве
     * */
    showProductGallery: function (openProduct) {
        var minImgLength = this.productItem[openProduct].img.minImg.length;
        if (minImgLength > 0) {
            for (var i = 0; i < minImgLength; i++) {
                var $wrapMin = document.getElementById('wrapMin');
                var $min = document.createElement('div');
                $min.classList.add('min');
                $wrapMin.appendChild($min);

                var $imgMin = new Image();
                $imgMin.src = this.productItem[openProduct].img.minImg[i];
                $imgMin.dataset.full_image_url = this.productItem[openProduct].img.maxImg[i];
                $imgMin.width = '100';
                $min.appendChild($imgMin);
            }
            this.$fullImgUrl = this.productItem[openProduct].img.maxImg[0];
            this.$openedImageEl = document.getElementById('wrapMin').firstElementChild;
            this.openImage(this.$fullImgUrl);
        }
    },

    /**
     * Открывает большую картинку в модальном окне.
     * @param {string} src Ссылка на картинку, которую надо открыть.
     */
    openImage(src) {
        this.$max.innerHTML = '';
        var $imgMax = new Image();
        $imgMax.src = src;
        console.log('ссылка большой картинки' + $imgMax.src);
        $imgMax.width = '380';
        this.$max.appendChild($imgMax);
    },

    /**
     * Обработчик события клика для открытия картинки. Определяет src большой картинки и открывает в модальном окне.
     * @param {MouseEvent} event Событие клики мышью.
     * @param {HTMLElement} event.target Событие клики мышью.
     */
    openedImageEl: function () {
        document.getElementById('wrapMin').addEventListener('click', event => {
            if (event.target.tagName !== 'IMG') {
                return;
            }
            this.$openedImageEl = event.target;
            this.$openedImageEl = this.$openedImageEl.parentNode;

            this.$fullImgUrl = event.target.dataset.full_image_url;
            this.openImage(this.$fullImgUrl);
        })
    },
    /**
     * Находит предыдущий элемент относительно текущей картинки.
     * @returns {HTMLElement}
     */
    getPrevImage: function () {
        var prevSibling = this.$openedImageEl.previousElementSibling;
        return prevSibling ? prevSibling : this.$openedImageEl.parentNode.lastElementChild;
    },

    /**
     * Находит следующий элемент относительно текущей картинки.
     * @returns {HTMLElement}
     */
    getNextImage: function () {
        var nextSibling = this.$openedImageEl.nextElementSibling;
        return nextSibling ? nextSibling : this.$openedImageEl.parentNode.firstElementChild;
    },

    /**
     * Показывает предыдущую и следующую картинку при нажатии мыши
     */
    prevNextClickOpenImage: function () {
        // Кнопка вправо. Добавляем обработчик события при клике, ставим новую открытую картинку и открываем ее.
        var $slideAfter = document.getElementById('slideAfter');
        $slideAfter.addEventListener('click', () => {
            this.$openedImageEl = this.getNextImage();
            this.$fullImgUrl = this.$openedImageEl.firstElementChild.dataset.full_image_url;
            this.openImage(this.$fullImgUrl);
        });

        // Кнопка влево. Добавляем обработчик события при клике, ставим новую открытую картинку и открываем ее.
        var $slideBefore = document.getElementById('slideBefore');
        $slideBefore.addEventListener('click', () => {
            this.$openedImageEl = this.getPrevImage();
            this.$fullImgUrl = this.$openedImageEl.firstElementChild.dataset.full_image_url;
            this.openImage(this.$fullImgUrl);
        });
    },

    leftRightkeydownOpenImage: function () {
        window.addEventListener('keydown', () => {
            // нажата кнопка "стрелка вправо" . Добавляем обработчик события при нажатии кнопки
            // ставим новую открытую картинку и открываем ее.
            if (event.keyCode === 39) {
                this.$openedImageEl = this.getNextImage();
                this.$fullImgUrl = this.$openedImageEl.firstElementChild.dataset.full_image_url;
                this.openImage(this.$fullImgUrl);
            } else {
                if (event.keyCode === 37) { // нажата кнопка "стрелка влево" . Добавляем обработчик события при нажатии кнопки
                    // ставим новую открытую картинку и открываем ее.
                    this.$openedImageEl = this.getPrevImage();
                    this.$fullImgUrl = this.$openedImageEl.firstElementChild.dataset.full_image_url;
                    this.openImage(this.$fullImgUrl);
                }
            }
        })
    },

    runGallery : function () {
        this.showProductGallery(0);
        this.prevNextClickOpenImage();
        this.leftRightkeydownOpenImage();
        this.openedImageEl();

    }

};

productGallery.runGallery();
