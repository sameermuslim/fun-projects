document.addEventListener("DOMContentLoaded", function () {
  const canvas = document.getElementById("snowCanvas");

  if (!canvas) {
    console.error("Canvas not found.");
    return;
  }

  const ctx = canvas.getContext("2d");

  if (!ctx) {
    console.error("Canvas context not supported.");
    return;
  }

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  let snowflakes = [];

  function createSnowflake() {
    return {
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 5 + 2,
      speed: Math.random() * 3 + 1,
      opacity: Math.random(),
      angle: Math.random() * 360,
    };
  }

  function drawSnowflakes() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#ffffff";

    for (let i = 0; i < snowflakes.length; i++) {
      const flake = snowflakes[i];
      const radians = flake.angle * (Math.PI / 180);

      ctx.beginPath();
      ctx.arc(
        flake.x + Math.sin(radians) * flake.size,
        flake.y + Math.cos(radians) * flake.size,
        flake.size,
        0,
        Math.PI * 2
      );
      ctx.closePath();

      ctx.globalAlpha = flake.opacity;
      ctx.fill();

      flake.y += flake.speed;

      // Reset snowflake position when it reaches the bottom
      if (flake.y > canvas.height) {
        flake.y = 0;
        flake.x = Math.random() * canvas.width;
      }
    }
  }

  function updateCanvasSize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function createInitialSnowfall() {
    for (let i = 0; i < 200; i++) {
      snowflakes.push(createSnowflake());
    }
  }

  function animateSnowfall() {
    drawSnowflakes();
    requestAnimationFrame(animateSnowfall);
  }

  window.addEventListener("resize", updateCanvasSize);

  createInitialSnowfall();
  animateSnowfall();
});
