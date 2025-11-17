// Smooth requestAnimationFrame
window.requestAnimFrame = (function () {
    return window.requestAnimationFrame || function (callback) {
        window.setTimeout(callback, 1000 / 60);
    };
})();

function init(elemId) {
    const canvas = document.getElementById(elemId);
    const c = canvas.getContext("2d");
    let w = canvas.width = window.innerWidth;
    let h = canvas.height = window.innerHeight;
    c.fillStyle = "rgba(10,10,10,1)";
    c.fillRect(0, 0, w, h);
    return { c, canvas, w, h };
}

window.onload = function () {
    const { c, canvas, w: initialW, h: initialH } = init("canvas");
    let w = initialW, h = initialH;
    let mouse = { x: false, y: false };
    let last_mouse = {};
    let target = { x: w / 2, y: h / 2 };
    let last_target = { x: w / 2, y: h / 2 };
    let t = 0;

    // Distance helper
    function dist(p1x, p1y, p2x, p2y) {
        return Math.sqrt(Math.pow(p2x - p1x, 2) + Math.pow(p2y - p1y, 2));
    }

    // Segment class
    class Segment {
        constructor(parent, length, angle, isFirst) {
            this.length = length;
            this.angle = angle;
            this.pos = isFirst 
                ? { x: parent.x, y: parent.y }
                : { x: parent.nextPos.x, y: parent.nextPos.y };
            this.updateNextPos();
        }

        updateNextPos() {
            this.nextPos = {
                x: this.pos.x + this.length * Math.cos(this.angle),
                y: this.pos.y + this.length * Math.sin(this.angle)
            };
        }

        update(target) {
            this.angle = Math.atan2(target.y - this.pos.y, target.x - this.pos.x);
            this.pos.x = target.x + this.length * Math.cos(this.angle - Math.PI);
            this.pos.y = target.y + this.length * Math.sin(this.angle - Math.PI);
            this.updateNextPos();
        }

        fallback(target) {
            this.pos.x = target.x;
            this.pos.y = target.y;
            this.updateNextPos();
        }

        draw() {
            c.lineTo(this.nextPos.x, this.nextPos.y);
        }
    }

    // Tentacle class
    class Tentacle {
        constructor(x, y, totalLength, segmentsCount) {
            this.x = x;
            this.y = = y;
            this.totalLength = totalLength;
            this.segmentsCount = segmentsCount;
            this.rand = Math.random();
            this.segments = [];
            const segLength = totalLength / segmentsCount;

            let prev = { x, y };
            for (let i = 0; i < segmentsCount; i++) {
                const isFirst = i === 0;
                const seg = new Segment(prev, segLength, 0, isFirst);
                this.segments.push(seg);
                prev = seg;
            }
        }

        move(lastTarget, currentTarget) {
            const angle = Math.atan2(currentTarget.y - this.y, currentTarget.x - this.x);
            const distance = dist(lastTarget.x, lastTarget.y, currentTarget.x, currentTarget.y) + 5;
            const targetPoint = {
                x: currentTarget.x - 0.8 * distance * Math.cos(angle),
                y: currentTarget.y - 0.8 * distance * Math.sin(angle)
            };

            // Update from tip to base
            this.segments[this.segmentsCount - 1].update(targetPoint);
            for (let i = this.segmentsCount - 2; i >= 0; i--) {
                this.segments[i].update(this.segments[i + 1].pos);
            }

            // Fallback if too far
            if (dist(this.x, this.y, currentTarget.x, currentTarget.y) <= this.totalLength + distance) {
                this.segments[0].fallback({ x: this.x, y: this.y });
                for (let i = 1; i < this.segmentsCount; i++) {
                    this.segments[i].fallback(this.segments[i - 1].nextPos);
                }
            }
        }

        draw(target) {
            if (dist(this.x, this.y, target.x, target.y) > this.totalLength) return;

            c.globalCompositeOperation = "lighter";
            c.beginPath();
            c.moveTo(this.x, this.y);
            this.segments.forEach(seg => seg.draw());
            c.strokeStyle = `hsl(${this.rand * 60 + 180}, 100%, ${this.rand * 60 + 25}%)`;
            c.lineWidth = this.rand * 3 + 1;
            c.lineCap = c.lineJoin = "round";
            c.stroke();
            c.globalCompositeOperation = "source-over";
        }

        drawBase(target) {
            c.beginPath();
            const inRange = dist(this.x, this.y, target.x, target.y) <= this.totalLength;
            c.arc(this.x, this.y, inRange ? 3 + this.rand * 2 : this.rand * 2, 0, Math.PI * 2);
            c.fillStyle = inRange ? "white" : "#006666";
            c.fill();
        }
    }

    // Create tentacles
    const maxLength = 300, minLength = 50, segments = 30, count = 500;
    const tentacles = [];

    for (let i = 0; i < count; i++) {
        tentacles.push(new Tentacle(
            Math.random() * w,
            Math.random() * h,
            Math.random() * (maxLength - minLength) + minLength,
            segments
        ));
    }

    // Mouse tracking
    canvas.addEventListener("mousemove", e => {
        last_mouse.x = mouse.x;
        last_mouse.y = mouse.y;
        mouse.x = e.pageX;
        mouse.y = e.pageY;
    });

    canvas.addEventListener("mouseleave", () => {
        mouse.x = mouse.y = false;
    });

    // Animation loop
    function draw() {
        // Update target
        if (mouse.x !== false) {
            target.x += (mouse.x - target.x) * 0.1;
            target.y += (mouse.y - target.y) * 0.1;
        } else {
            t += 0.01;
            target.x = w / 2 + ((h / 2 - 100) * Math.sqrt(2) * Math.cos(t)) / (Math.pow(Math.sin(t), 2) + 1);
            target.y = h / 2 + ((h / 2 - 100) * Math.sqrt(2) * Math.cos(t) * Math.sin(t)) / (Math.pow(Math.sin(t), 2) + 1);
        }

        // Draw target glow
        c.beginPath();
        c.arc(target.x, target.y, dist(last_target.x, last_target.y, target.x, target.y) + 8, 0, Math.PI * 2);
        c.fillStyle = "rgba(100, 200, 255, 0.3)";
        c.fill();

        // Draw tentacles
        tentacles.forEach(tent => {
            tent.move(last_target, target);
            tent.drawBase(target);
        });
        tentacles.forEach(tent => tent.draw(target));

        last_target.x = target.x;
        last_target.y = target.y;
    }

    function loop() {
        requestAnimFrame(loop);
        c.fillStyle = "rgba(10, 10, 10, 0.1)";
        c.fillRect(0, 0, w, h);
        draw();
    }

    // Resize handler
    window.addEventListener("resize", () => {
        w = canvas.width = window.innerWidth;
        h = canvas.height = window.innerHeight;
    });

    loop();
};