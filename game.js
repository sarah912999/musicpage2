class SingingGirl {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.x = canvas.width / 2;
        this.y = canvas.height / 2;
        this.musicNotes = [];
        this.frame = 0;
        
        // 创建图片对象
        this.girlImage = new Image();
        this.girlImage.src = './mygirl.JPG';  // 使用你刚才的照片
        this.imageLoaded = false;
        
        // 当图片加载完成时设置标志
        this.girlImage.onload = () => {
            this.imageLoaded = true;
            this.imageWidth = 150;   // 调整照片大小
            this.imageHeight = 150;  // 调整照片大小
        };
    }

    draw() {
        // 如果图片已加载，绘制图片
        if (this.imageLoaded) {
            this.ctx.drawImage(
                this.girlImage,
                this.x - this.imageWidth / 2,
                this.y - this.imageHeight / 2,
                this.imageWidth,
                this.imageHeight
            );
        }

        // 绘制音符
        this.musicNotes.forEach((note, index) => {
            this.ctx.fillStyle = note.color || '#FF69B4';
            this.ctx.font = '20px Arial';
            this.ctx.fillText(note.symbol, note.x, note.y);
            note.y -= 2;
            note.x += Math.sin(this.frame * 0.05 + index) * 0.5;
        });

        // 每隔一定帧数添加新音符
        if (this.frame % 20 === 0) {
            const symbols = ['♪', '♫', '♬'];
            const colors = ['#FF69B4', '#9370DB', '#87CEEB'];
            this.musicNotes.push({
                x: this.x + 40,
                y: this.y,
                symbol: symbols[Math.floor(Math.random() * symbols.length)],
                color: colors[Math.floor(Math.random() * colors.length)]
            });
        }

        // 移除飘出画面的音符
        this.musicNotes = this.musicNotes.filter(note => note.y > 0);
        
        this.frame++;
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.draw();
        requestAnimationFrame(() => this.animate());
    }
} 
