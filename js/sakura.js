// 樱花飘落特效 (5秒后自动停止并销毁)
(function () {
  var requestAnimationFrame = window.requestAnimationFrame || 
                              window.mozRequestAnimationFrame || 
                              window.webkitRequestAnimationFrame || 
                              window.msRequestAnimationFrame;
  var cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame;

  var canvas = document.createElement('canvas');
  canvas.id = 'sakura-canvas';
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100vw';
  canvas.style.height = '100vh';
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = '9999';
  canvas.style.transition = 'opacity 1s ease'; // 结束时淡出过渡 1 秒
  canvas.style.opacity = '1';
  document.body.appendChild(canvas);

  var ctx = canvas.getContext('2d');
  var width = (canvas.width = window.innerWidth);
  var height = (canvas.height = window.innerHeight);

  var resizeHandler = function () {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  };
  window.addEventListener('resize', resizeHandler);

  var Sakura = function () {
    this.x = Math.random() * width;
    this.y = Math.random() * height - height;
    this.size = Math.random() * 8 + 6;
    this.speedX = Math.random() * 2 - 1;
    this.speedY = Math.random() * 1.5 + 1;
    this.angle = Math.random() * 360;
    this.angularSpeed = (Math.random() - 0.5) * 2;
  };

  Sakura.prototype.update = function () {
    this.x += this.speedX;
    this.y += this.speedY;
    this.angle += this.angularSpeed;

    if (this.y > height) {
      this.y = -20;
      this.x = Math.random() * width;
    }
    if (this.x > width) this.x = 0;
    if (this.x < 0) this.x = width;
  };

  Sakura.prototype.draw = function (c) {
    c.save();
    c.translate(this.x, this.y);
    c.rotate((this.angle * Math.PI) / 180);
    c.fillStyle = 'rgba(255, 183, 197, 0.75)';
    c.beginPath();
    c.moveTo(0, 0);
    c.bezierCurveTo(-this.size / 2, -this.size / 2, -this.size, this.size / 3, 0, this.size);
    c.bezierCurveTo(this.size, this.size / 3, this.size / 2, -this.size / 2, 0, 0);
    c.closePath();
    c.fill();
    c.restore();
  };

  var sakuras = [];
  var SAKURA_COUNT = 30;
  for (var i = 0; i < SAKURA_COUNT; i++) {
    sakuras.push(new Sakura());
  }

  var animId = null;
  function loop() {
    ctx.clearRect(0, 0, width, height);
    for (var i = 0; i < sakuras.length; i++) {
      sakuras[i].update();
      sakuras[i].draw(ctx);
    }
    animId = requestAnimationFrame(loop);
  }
  loop();

  // 设定 5 秒后淡出并彻底清除
  setTimeout(function () {
    canvas.style.opacity = '0'; // 开启淡出
    setTimeout(function () {
      cancelAnimationFrame(animId); // 停止动画循环
      window.removeEventListener('resize', resizeHandler);
      if (canvas.parentNode) {
        canvas.parentNode.removeChild(canvas); // 彻底移除 Canvas DOM
      }
    }, 1000); // 等待淡出动画结束（1秒）后销毁
  }, 8000); // 飘落展示 8 秒
})();