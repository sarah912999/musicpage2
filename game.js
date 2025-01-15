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
        this.girlImage.src = './mygirl.JPG';  // 使用相对路径
        this.imageLoaded = false;
        
        // 当图片加载完成时设置标志
        this.girlImage.onload = () => {
            this.imageLoaded = true;
            this.imageWidth = 150;   // 调整照片大小
            this.imageHeight = 150;  // 调整照片大小
        };
        
        // 添加音频对象
        this.audio = new Audio();
        this.audio.src = './audio.m4a';  // 使用您的音频文件
        this.audio.loop = true;  // 循环播放
        
        // 添加播放控制
        document.addEventListener('click', () => {
            if (this.audio.paused) {
                this.audio.play().catch(error => {
                    console.log('播放失败:', error);
                });
            } else {
                this.audio.pause();
            }
        });
        
        // 添加动画相关的属性
        this.originalY = canvas.height / 2;  // 保存原始Y坐标
        this.rotation = 0;  // 旋转角度
    }

    draw() {
        // 计算浮动效果
        const floatingY = this.originalY + Math.sin(this.frame * 0.05) * 10;  // 上下浮动10像素
        this.rotation = Math.sin(this.frame * 0.03) * 0.1;  // 左右轻微摆动

        // 如果图片已加载，绘制图片
        if (this.imageLoaded) {
            this.ctx.save();  // 保存当前状态
            
            // 移动到图片中心点
            this.ctx.translate(this.x, floatingY);
            
            // 添加旋转
            this.ctx.rotate(this.rotation);
            
            // 绘制图片（注意坐标现在是相对于中心点）
            this.ctx.drawImage(
                this.girlImage,
                -this.imageWidth / 2,
                -this.imageHeight / 2,
                this.imageWidth,
                this.imageHeight
            );
            
            this.ctx.restore();  // 恢复状态
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
