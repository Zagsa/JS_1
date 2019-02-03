 "use strict";
    /*Создать функцию, генерирующую шахматную доску. Можно использовать любые html-теги.
    Доска должна быть верно разлинована на черные и белые ячейки.
    Строки должны нумероваться числами от 1 до 8,
    столбцы — латинскими буквами A, B, C, D, E, F, G, H.
    */

var chess = {
    gameContainerEl: document.getElementById('chessMap'),
    /**
     * функция отображает шахматную доску.
     */
    renderMap: function() {
        for (var row = 0; row < 10; row++) {
            var tr = document.createElement("tr");
            this.gameContainerEl.appendChild(tr);
            for (var col = 0; col < 10; col++) {
                var td = document.createElement("td");
                tr.appendChild(td);
                // Если строка нулевая (первая по счету) или 9-я (последняя), значит выводим буквы в ней.
                if (row === 0 && col !== 0 && col !== 9 || row === 9 && col !== 0 && col !== 9) {
                    td.textContent = String.fromCharCode(64 + col);
                }
                if (row > 0 && row < 9 && col === 0 || row > 0 && row < 9 && col === 9) {
                    td.textContent = 9 - row;
                }
                if (row > 0 && row < 9 && col > 0 && col < 9) {
                    if (this.isCellIsBlack(row, col)) {
                        td.style.backgroundColor = "black";
                    }
                }
            }
            }
        },

    /**
     * функция опеределяет, является ли ячейка черной, нужно ли ее покрасить.
     * @param  {rowNum, colNum} {number} номер строки и колонки, ячейка которую проверяем.
     * @return {boolean} Вернет false если и номер колонки и номер строки четный или
     *                   и номер колонки и номер строки нечетный, иначе - true.
     */
    isCellIsBlack: function(rowNum, colNum) {
        var rowChek = rowNum % 2;
        var colChek = colNum % 2;
        if (rowChek === 0 && colChek === 0 || rowChek !== 0 && colChek !== 0) {
            return false;
            } else {
            return true;
        }
        }
        };

    chess.renderMap();



