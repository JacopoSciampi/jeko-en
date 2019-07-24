var w = c.width = window.innerWidth,
    h = c.height = window.innerHeight,
    ctx = c.getContext('2d'),

    opts = {

        lineCount: 200,
        starCount: 0,

        lineBaseVel: 1,
        lineAddedVel: .1,
        lineVelTilt: Math.PI / 2,
        lineBaseLife: 400,
        lineAddedLife: 20,
        lineAttenuator: 15000,

        starBaseLife: 10,
        starAddedLife: 10,

        ellipseTilt: -.3,
        ellipseBaseRadius: 150,
        ellipseAddedRadius: 40,
        ellipseAxisMultiplierX: 2,
        ellipseAxisMultiplierY: 1,
        ellipseCX: w / 2,
        ellipseCY: h / 2,

        repaintAlpha: .02
    },

    lines = [],
    stars = [],
    tick = 0,
    first = true;

function init() {

    lines.length = stars.length = 0;

    ctx.globalCompositeOperation = 'source-over';
    ctx.fillStyle = '#222';
    ctx.fillRect(0, 0, w, h);

    ctx.shadowBlur = 0;
    ctx.globalCompositeOperation = 'source-over';
    ctx.save();

    if (first) {

        loop();
        first = false;
    }
}

function loop() {

    window.requestAnimationFrame(loop);
    step();
    draw();
}

function step() {

    tick += .1;

    if (lines.length < opts.lineCount && Math.random() < .1)
        lines.push(new Line);

    if (stars.length < opts.starCount)
        stars.push(new Star);

    lines.map(function (line) { line.step(); });
    stars.map(function (star) { star.step(); });
}

function draw() {

    ctx.globalCompositeOperation = 'source-over'
    ctx.fillStyle = 'rgba(0,0,0,alp)'.replace('alp', opts.repaintAlpha);
    ctx.fillRect(0, 0, w, h);

    ctx.globalCompositeOperation = 'lighter';

    ctx.translate(opts.ellipseCX, opts.ellipseCY);
    //ctx.rotate( opts.ellipseTilt );
    //ctx.scale( opts.ellipseAxisMultiplierX, opts.ellipseAxisMultiplierY );

    lines.map(function (line) { line.draw(); });
    stars.map(function (star) { star.draw(); });

    //ctx.scale( 1/opts.ellipseAxisMultiplierX, 1/opts.ellipseAxisMultiplierY );
    //ctx.rotate( -opts.ellipseTilt );
    ctx.translate(-opts.ellipseCX, -opts.ellipseCY);
}

function Line() {

    this.reset();
}
Line.prototype.reset = function () {

    var rad = this.rad = Math.random() * Math.PI * 2,
        len = this.len = opts.ellipseBaseRadius + Math.random() * opts.ellipseAddedRadius;

    this.x = this.px = Math.cos(rad) * len;
    this.y = this.py = Math.sin(rad) * len;

    this.life = this.originalLife = opts.lineBaseLife + Math.random() * opts.lineAddedLife;

    this.alpha = Math.random() * .8;
}
Line.prototype.step = function () {

    --this.life;

    var ratio = 1 - .1 * this.life / this.originalLife;

    this.px = this.x;
    this.py = this.y;

    this.rad += .01;
    this.len -= 1;

    this.x = Math.cos(this.rad) * this.len;
    this.y = Math.sin(this.rad) * this.len;

    if (this.life <= 0)
        this.reset();
}
Line.prototype.draw = function () {

    var ratio = this.life / this.originalLife;

    ctx.strokeStyle = 'hsla(hue, 80%, light%, alp)'
        .replace('hue', tick + this.x / w * 360)
        .replace('light', 75 - Math.abs(ratio - 1 / 2) * 100)
        .replace('alp', this.alpha);
    ctx.beginPath();
    ctx.moveTo(this.px, this.py);
    ctx.lineTo(this.x, this.y);

    ctx.stroke();
}

function Star() { }; Star.prototype.step = Star.prototype.draw = function () { };

init();