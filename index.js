const miCanvas = document.querySelector("#miCanvas");
const ctx = miCanvas.getContext("2d");

miCanvas.width = window.innerWidth;
miCanvas.height = window.innerHeight;

const particles = [];
const numParticles = 500;

for (let i = 0; i < numParticles; i++) {
  particles.push({
    x: Math.random() * miCanvas.width,
    y: Math.random() * miCanvas.height,
    radius: Math.random(),
    color: `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(
      Math.random() * 255
    )}, ${Math.floor(Math.random() * 255)})`,
    velocity: {
      x: (Math.random() - 0.5) * 20,
      y: (Math.random() - 0.5) * 20,
    },
  });
}

let mouse = { x: null, y: null };

window.addEventListener("mousemove", function (event) {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
});

function draw() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
  ctx.fillRect(0, 0, miCanvas.width, miCanvas.height);

  particles.forEach((particle) => {
    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.radius, 0, 2 * Math.PI);
    ctx.fillStyle = particle.color;
    ctx.fill();

    let distanceX = mouse.x - particle.x;
    let distanceY = mouse.y - particle.y;
    let distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

    if (distance < 100) {
      particle.x -= distanceX / 10;
      particle.y -= distanceY / 10;
    } else {
      particle.x += particle.velocity.x;
      particle.y += particle.velocity.y;
    }

    if (particle.x - particle.radius > miCanvas.width) {
      particle.x = 0 - particle.radius;
    }
    if (particle.x + particle.radius < 0) {
      particle.x = miCanvas.width + particle.radius;
    }
    if (particle.y - particle.radius > miCanvas.height) {
      particle.y = 0 - particle.radius;
    }
    if (particle.y + particle.radius < 0) {
      particle.y = miCanvas.height + particle.radius;
    }
  });

  requestAnimationFrame(draw);
}

window.onload = function() {
  draw();
};


