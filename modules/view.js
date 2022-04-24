import { SIZE_BLOCK, COLUMNS, ROWS } from "../index.js";

export class View {
    constructor(container) {
        this.container = container;

        this.preview();
    }

    colors = {
        J: 'FireBrick',
        I: 'Green',
        O: 'Gold',
        L: 'SlateBlue',
        2: 'Orange',
        T: 'Indigo',
        S: 'MediumSeaGreen',
    };
    
    canvas = document.createElement('canvas');
    context = this.canvas.getContext('2d');
    

    preview() {
        const enter = document.createElement('div');
        enter.className = 'start';
        enter.innerHTML = `Нажмите <span style="font-weight:800">enter</span> для запуска игры`;
        enter.style.fontSize = '30px';
        this.container.append(enter);
    }

    removePreview() {
        document.querySelector('.start').remove();
    }

    init() {
        this.canvas.classList.add('game-area');
        this.canvas.style.gridArea = 'game';
        this.container.append(this.canvas);
        this.canvas.width = SIZE_BLOCK * COLUMNS;
        this.canvas.height = SIZE_BLOCK * ROWS;
    }

    createBlockScore() {
        const scoreBlock = document.createElement('div');
        scoreBlock.className = 'score block';
        const linesElem = document.createElement('p');
        const scoreElem = document.createElement('p')
        const levelElem = document.createElement('p')
        const recordElem = document.createElement('p')

        scoreBlock.append(linesElem, scoreElem, levelElem, recordElem);

        this.container.append(scoreBlock);

        return (lines, score, level, record) => {
            linesElem.textContent = `lines: ${lines}`;
            scoreElem.textContent = `score: ${score}`;
            levelElem.textContent = `level: ${level}`;
            recordElem.textContent = `record: ${record}`;
        }
    }

    createBlockNextTetromino() {
        const tetrominoBlock = document.createElement('div');
        tetrominoBlock.className = 'score next';
        tetrominoBlock.style.cssText = `
        width: ${SIZE_BLOCK * 4}px;
        height: ${SIZE_BLOCK * 4}px;`;

        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');

        tetrominoBlock.append(canvas);
        this.container.append(tetrominoBlock);

        return (tetromino) => {
            canvas.width = SIZE_BLOCK * tetromino.length;
            canvas.height = SIZE_BLOCK * tetromino.length;
            context.clearRect(0, 0, canvas.width, canvas.height);
    
            for(let y = 0; y < tetromino.length; y++) {
                let line = tetromino[y];
                for(let x = 0; x < line.length; x++) {
                    let block = line[x];
                    if(block !== 'o') {
                        context.fillStyle = this.colors[block];
                        context.strokeStyle = 'white';
                        context.fillRect(x * SIZE_BLOCK, y * SIZE_BLOCK, SIZE_BLOCK, SIZE_BLOCK);
                        context.strokeRect(x * SIZE_BLOCK, y * SIZE_BLOCK, SIZE_BLOCK, SIZE_BLOCK);
                    }
                }
            }
        }
    }
    
    showArea(area) {  
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
        for(let y = 0; y < area.length; y++) {
            let line = area[y];
            for(let x = 0; x < line.length; x++) {
                let block = line[x];
                if(block !== 'o') {
                    this.context.fillStyle = this.colors[block];
                    this.context.strokeStyle = 'white';
                    this.context.fillRect(x * SIZE_BLOCK, y * SIZE_BLOCK, SIZE_BLOCK, SIZE_BLOCK);
                    this.context.strokeRect(x * SIZE_BLOCK, y * SIZE_BLOCK, SIZE_BLOCK, SIZE_BLOCK);
                }
            }
        }
        
    };
}