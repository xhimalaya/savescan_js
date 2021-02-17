var canvas3 = document.getElementById('canvas3');
var ctx3 = canvas3.getContext('2d');
var lightning = [];
var lightTimeCurrent = 0;
var lightTimeTotal = 0;

var w =  canvas3.width = window.innerWidth;
var h =  canvas3.height = window.innerHeight;
window.addEventListener('resize', function() {
  w = canvas3.width = window.innerWidth;
  h = canvas3.height = window.innerHeight;
});

function random(min, max) {
  return Math.random() * (max - min + 1) + min;
}

function clearCanvas3() {
  ctx3.globalCompositeOperation = 'destination-out';
  ctx3.fillStyle = 'rgba(0,0,0,' + random(1, 30) / 100 + ')';
  ctx3.fillRect(0, 0, w, h);
  ctx3.globalCompositeOperation = 'source-over';
};

function createLightning() {
  var x = random(100, w - 100);
  var y = random(0, h / 4);

  var createCount = random(1, 3);
  for (var i = 0; i < createCount; i++) {
    single = {
      x: x,
      y: y,
      xRange: random(5, 30),
      yRange: random(10, 25),
      path: [{
        x: x,
        y: y
      }],
      pathLimit: random(40, 55)
    };
    lightning.push(single);
  }
};

function drawLightning() {
  for (var i = 0; i < lightning.length; i++) {
    var light = lightning[i];

    light.path.push({
      x: light.path[light.path.length - 1].x + (random(0, light.xRange) - (light.xRange / 2)),
      y: light.path[light.path.length - 1].y + (random(0, light.yRange))
    });

    if (light.path.length > light.pathLimit) {
      lightning.splice(i, 1);
    }

    ctx3.strokeStyle = 'rgba(255, 255, 255, .1)';
    ctx3.lineWidth = 3;
    if (random(0, 15) === 0) {
      ctx3.lineWidth = 6;
    }
    if (random(0, 30) === 0) {
      ctx3.lineWidth = 8;
    }

    ctx3.beginPath();
    ctx3.moveTo(light.x, light.y);
    for (var pc = 0; pc < light.path.length; pc++) {
      ctx3.lineTo(light.path[pc].x, light.path[pc].y);
    }
    if (Math.floor(random(0, 30)) === 1) { //to fos apo piso
      ctx3.fillStyle = 'rgba(255, 255, 255, ' + random(1, 3) / 100 + ')';
      ctx3.fillRect(0, 0, w, h);
    }
    ctx3.lineJoin = 'miter';
    ctx3.stroke();
  }
};

function animateLightning() {
  clearCanvas3();
  lightTimeCurrent++;
  if (lightTimeCurrent >= lightTimeTotal) {
    createLightning();
    lightTimeCurrent = 0;
    lightTimeTotal = 200;  //rand(100, 200)
  }
  drawLightning();
}

function animloop() {
  animateLightning();
  requestAnimationFrame(animloop);
}
animloop();