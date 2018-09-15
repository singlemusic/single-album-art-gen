var sketch = function (p) {
  var textFont;

  p.setup = function () {
    p.createCanvas(1600, 1600);
    p.noLoop(); // don't draw until generate is clicked.

    textFont = p.loadFont('fonts/Montserrat-Medium.ttf');

      // generate click handler
      p.select("#generate").mousePressed(function () {
      // start the draw() loop.
      p.loop();
    });

    // download click handler
    p.select("#download").mousePressed(function () {
      var canvas = document.getElementById("defaultCanvas0");
      var download = document.getElementById("download");
      download.download = new Date().getUTCMilliseconds + ".png";
      var image = canvas.toDataURL("image/png")
        .replace("image/png", "image/octet-stream");
      window.location.href = image;
    });
  }

  var rotation = 0;
  p.draw = function () {
    // grab all our colors
    var color1 = p.select("#color_1").value();
    var color2 = p.select("#color_2").value();
    var color3 = p.select("#color_3").value();
    var textColor = p.select("#color_4").value();
    var background = p.select("#color_5").value();

    p.background(background);
    var name = p.select('#band_name').value();
    if (name) {
      for (var i = 0; i < 5; i++) {
        p.drawPolygon([color1, color2, color3]);
      }

      p.fill(textColor);
      p.noStroke();
      p.textFont(textFont);
      p.textSize(p.random(100, 500));
      p.text(name, p.random(p.width / 3), p.random(p.height / 4, p.height * 3 / 4));
    }
    p.noLoop();
  }

  p.drawPolygon = function (colors) {
    let color = p.randColor(colors);
    if (p.random() < 0.3) {
      p.fill(color);
      p.noStroke();
    } else {
      p.stroke(color);
      p.strokeWeight(p.random(10, 30));
      p.noFill();
    }
    var sides = p.random(3, 6);
    p.beginShape();
    for (var i = 0; i < sides; i++) {
      p.vertex(p.random(p.width), p.random(p.height));
    }
    p.endShape(p.CLOSE);
  }

  p.randColor = function (colors) {
    return colors[Math.floor(p.random(0, colors.length))]
  }
};

new p5(sketch, window.document.getElementById('sketch'));