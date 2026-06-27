const profile = {
  name: "Aswin Sambhu",
  handle: "@aswinsambhu",
  birthday: "2008-12-01T00:00:00",
  about: "My name is Aswin Sambhu . I'm good at gaming you know ? . Kidding! I'm a student .",
  links: [
    { label: "Instagram", tag: "Find me !", url: "https://www.instagram.com/aswinsambhu?igsh=MXIyNmF3bmljYWZzeQ==" },
    { label: "YouTube", tag: "Videos", url: "https://youtube.com/" },
    { label: "Discord", tag: "Squad", url: "https://discord.com/" },
    { label: "GitHub", tag: "Code", url: "https://github.com/" },
    { label: "Steam", tag: "Games", url: "https://store.steampowered.com/" },
    { label: "Portfolio", tag: "Work", url: "#" },
    { label: "Contact", tag: "Ping", url: "mailto:aswin08bkm@gmail.com" },
    { label: "Playlist", tag: "Nothing !", url: "#" }
  ],
  missions: [
    "Cruise through a Vice City style sunset without touching the sidewalk.",
    "Escape the San Andreas back-road chase with a calm face.",
    "Find the movie poster line hidden in the secret shelf.",
    "Beat the reflex reel before the imaginary director yells cut.",
    "Unlock the classic code and raise the wanted level."
  ],
  movieQuotes: [
    "\"Roads? Where this profile goes, it still respects responsive design.\"",
    "\"Say hello to my little link section.\"",
    "\"I feel the need, the need for clean CSS.\"",
    "\"With great profile power comes great editability.\""
  ]
};

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];

const loader = $("#loader");
const loaderPercent = $("#loaderPercent");
const skipLoader = $("#skipLoader");
const toast = $("#toast");
const codeSequence = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];
let codeProgress = 0;

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove("show"), 3200);
}

function hideLoader() {
  loader.classList.add("is-hidden");
  document.body.classList.remove("loading");
}

function bootLoader() {
  let percent = 0;
  const tick = setInterval(() => {
    percent = Math.min(99, percent + Math.ceil(Math.random() * 8));
    loaderPercent.textContent = `${String(percent).padStart(2, "0")}%`;
  }, 170);

  const finish = () => {
    clearInterval(tick);
    loaderPercent.textContent = "100%";
    setTimeout(hideLoader, 450);
  };
setTimeout(finish, 2500);
  skipLoader.addEventListener("click", finish);

  setTimeout(() => {
    if (!loader.classList.contains("is-hidden")) finish();
  }, 5200);
}

function buildEditableContent() {
  $("#handleText").textContent = profile.handle;
  $("#aboutText").textContent = profile.about;

  const links = $("#linkGrid");
  links.innerHTML = profile.links.map((link, index) => `
    <a class="link-card reveal" href="${link.url}" target="${link.url.startsWith("http") ? "_blank" : "_self"}" rel="noreferrer" style="transition-delay:${index * 45}ms">
      <strong>${link.label}</strong>
      <span>${link.tag}</span>
    </a>
  `).join("");

  $("#missionList").innerHTML = profile.missions.map((mission) => `<li>${mission}</li>`).join("");
}

function updateAge() {
  const birth = new Date(profile.birthday);
  const now = new Date();
  const elapsed = now - birth;
  const totalSeconds = Math.floor(elapsed / 1000);
  const totalDays = Math.floor(totalSeconds / 86400);
  const years = now.getFullYear() - birth.getFullYear() - (now < new Date(now.getFullYear(), birth.getMonth(), birth.getDate()) ? 1 : 0);
  const daysAfterYears = Math.floor((now - new Date(birth.getFullYear() + years, birth.getMonth(), birth.getDate())) / 86400000);

  $("#years").textContent = years;
  $("#days").textContent = daysAfterYears;
  $("#hours").textContent = Math.floor((totalSeconds % 86400) / 3600);
  $("#minutes").textContent = Math.floor((totalSeconds % 3600) / 60);
  $("#seconds").textContent = totalSeconds % 60;
  $("#exactAgeText").textContent = `${totalDays.toLocaleString()} total days alive and counting since December 1, 2008.`;
}

function setupScrollReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("is-visible");
    });
  }, { threshold: 0.12 });
  $$(".reveal").forEach((el) => observer.observe(el));
}

function setupMenu() {
  $("#menuButton").addEventListener("click", () => document.body.classList.toggle("menu-open"));
  $$(".nav-links a").forEach((link) => link.addEventListener("click", () => document.body.classList.remove("menu-open")));
  $("#backTop").addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
}

function setupCursor() {
  const dot = $("#cursorDot");
  window.addEventListener("pointermove", (event) => {
    dot.style.opacity = "1";
    dot.style.left = `${event.clientX}px`;
    dot.style.top = `${event.clientY}px`;
  });
}

function setupEasterEggs() {
  $(".brand").addEventListener("click", () => {
    document.body.classList.add("tilt");
    showToast("Title tap: classic cartridge wobble unlocked.");
    setTimeout(() => document.body.classList.remove("tilt"), 850);
  });

  $(".profile-img").addEventListener("click", () => {
    const level = $("#wantedLevel");
    level.textContent = level.textContent === "1 star" ? "5 stars" : "1 star";
    showToast("Profile emblem pressed. Wanted level changed.");
  });

  $$(".secret-tile").forEach((tile) => {
    tile.addEventListener("click", () => {
      const messages = {
        poster: "Poster reads: Tonight only, Aswin Sambhu and the Temple of Clean CSS.",
        taxi: "Taxi meter says: fare paid in style points.",
        radio: "Silent radio tuned to channel 0. No sound, only vibes.",
        clap: "Scene 7, take 1: profile page becomes legendary."
      };
      showToast(messages[tile.dataset.secret]);
    });
  });

  document.addEventListener("keydown", (event) => {
    const key = event.key.length === 1 ? event.key.toLowerCase() : event.key;
    if (key === codeSequence[codeProgress]) {
      codeProgress += 1;
      if (codeProgress === codeSequence.length) {
        $("#codeStatus").textContent = "Unlocked";
        $("#codeLed").classList.add("unlocked");
        $("#wantedLevel").textContent = "6 stars";
        showToast("Classic code accepted. Hidden arcade mood unlocked.");
        codeProgress = 0;
      }
    } else {
      codeProgress = 0;
    }
  });
}

function setupQuoteRotation() {
  let index = 0;
  setInterval(() => {
    index = (index + 1) % profile.movieQuotes.length;
    $("#movieQuote").textContent = profile.movieQuotes[index];
  }, 4500);
}

function drawRoad(ctx, width, height) {
  ctx.fillStyle = "#252018";
  ctx.fillRect(0, 0, width, height);
  ctx.fillStyle = "#4c4637";
  ctx.fillRect(width * 0.2, 0, width * 0.6, height);
  ctx.strokeStyle = "#ead7ad";
  ctx.lineWidth = 4;
  ctx.setLineDash([22, 18]);
  ctx.beginPath();
  ctx.moveTo(width / 2, 0);
  ctx.lineTo(width / 2, height);
  ctx.stroke();
  ctx.setLineDash([]);
  ctx.fillStyle = "#1c7b83";
  for (let i = 0; i < 7; i += 1) ctx.fillRect((i * 90 + Date.now() / 24) % width, height - 24, 38, 8);
}

function setupCarGame() {
  const canvas = $("#carGame");
  const ctx = canvas.getContext("2d");
  const car = { lane: 1 };
  let running = false;
  let score = 0;
  let obstacle = { lane: 0, y: -80 };

  function render() {
    drawRoad(ctx, canvas.width, canvas.height);
    const lanes = [canvas.width * 0.3, canvas.width * 0.5, canvas.width * 0.7];
    ctx.fillStyle = "#9b321e";
    ctx.fillRect(lanes[obstacle.lane] - 22, obstacle.y, 44, 64);
    ctx.fillStyle = "#c97b24";
    ctx.fillRect(lanes[car.lane] - 26, canvas.height - 78, 52, 66);
    ctx.fillStyle = "#191713";
    ctx.fillRect(lanes[car.lane] - 18, canvas.height - 68, 36, 16);
  }

  function loop() {
    if (!running) return;
    score += 1;
    obstacle.y += 5 + Math.floor(score / 220);
    if (obstacle.y > canvas.height) {
      obstacle = { lane: Math.floor(Math.random() * 3), y: -70 };
    }
    if (obstacle.lane === car.lane && obstacle.y > canvas.height - 132 && obstacle.y < canvas.height - 28) {
      running = false;
      showToast(`Car runner crash. Final score ${score}.`);
    }
    $("#carScore").textContent = `Score ${score}`;
    render();
    requestAnimationFrame(loop);
  }

  function start() {
    running = true;
    score = 0;
    obstacle = { lane: Math.floor(Math.random() * 3), y: -70 };
    loop();
  }

  function move(delta) {
    car.lane = Math.max(0, Math.min(2, car.lane + delta));
    render();
  }

  $("#carStart").addEventListener("click", start);
  $("#carLeft").addEventListener("click", () => move(-1));
  $("#carRight").addEventListener("click", () => move(1));
  document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") move(-1);
    if (event.key === "ArrowRight") move(1);
  });
  render();
}

function setupBikeGame() {
  const canvas = $("#bikeGame");
  const ctx = canvas.getContext("2d");
  const bike = { y: 130 };
  let running = false;
  let escape = 0;
  let cars = [{ x: 560, y: 70 }, { x: 760, y: 180 }];

  function render() {
    ctx.fillStyle = "#221f19";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#51452f";
    for (let y = 44; y < canvas.height; y += 52) ctx.fillRect(0, y, canvas.width, 4);
    ctx.fillStyle = "#1c7b83";
    ctx.fillRect(70, bike.y, 62, 26);
    ctx.fillStyle = "#ead7ad";
    ctx.fillRect(92, bike.y - 12, 18, 16);
    ctx.fillStyle = "#9b321e";
    cars.forEach((car) => ctx.fillRect(car.x, car.y, 74, 34));
  }

  function loop() {
    if (!running) return;
    escape = Math.min(100, escape + 0.18);
    cars.forEach((car) => {
      car.x -= 4.5;
      if (car.x < -90) {
        car.x = canvas.width + Math.random() * 260;
        car.y = 40 + Math.random() * 170;
      }
      if (car.x < 132 && car.x > 36 && Math.abs(car.y - bike.y) < 34) {
        running = false;
        showToast(`Bike chase caught at ${Math.floor(escape)}%.`);
      }
    });
    if (escape >= 100) {
      running = false;
      showToast("Bike chase escaped. Classic hero moment.");
    }
    $("#bikeScore").textContent = `Escape ${Math.floor(escape)}%`;
    render();
    requestAnimationFrame(loop);
  }

  function start() {
    running = true;
    escape = 0;
    cars = [{ x: 560, y: 70 }, { x: 760, y: 180 }];
    loop();
  }

  function move(delta) {
    bike.y = Math.max(28, Math.min(canvas.height - 42, bike.y + delta));
    render();
  }

  $("#bikeStart").addEventListener("click", start);
  $("#bikeUp").addEventListener("click", () => move(-24));
  $("#bikeDown").addEventListener("click", () => move(24));
  document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowUp") move(-18);
    if (event.key === "ArrowDown") move(18);
  });
  render();
}

function setupReflexGame() {
  const pad = $("#reflexPad");
  let ready = false;
  let startedAt = 0;
  let timeout;

  $("#reflexStart").addEventListener("click", () => {
    ready = false;
    pad.classList.remove("ready");
    pad.textContent = "Wait for roll...";
    $("#reflexNote").textContent = "Hands steady.";
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      ready = true;
      startedAt = performance.now();
      pad.classList.add("ready");
      pad.textContent = "Hit now";
    }, 800 + Math.random() * 2600);
  });

  pad.addEventListener("click", () => {
    if (!ready) {
      clearTimeout(timeout);
      $("#reflexNote").textContent = "Too early. The director noticed.";
      return;
    }
    const score = Math.round(performance.now() - startedAt);
    ready = false;
    pad.classList.remove("ready");
    pad.textContent = `${score} ms`;
    $("#reflexBest").textContent = `Best ${score}ms`;
    $("#reflexNote").textContent = score < 260 ? "Sharp classic reflex." : "Good, but the reel can go faster.";
  });
}

function setupMemoryGame() {
  const icons = ["CAR", "VHS", "BIKE", "STAR", "CAR", "VHS", "BIKE", "STAR"];
  const grid = $("#memoryGrid");
  let open = [];
  let moves = 0;

  function shuffle() {
    open = [];
    moves = 0;
    $("#memoryMoves").textContent = "0 moves";
    const deck = icons.sort(() => Math.random() - 0.5);
    grid.innerHTML = deck.map((value) => `<button class="memory-card" type="button" data-value="${value}">${value}</button>`).join("");
    $$(".memory-card").forEach((card) => card.addEventListener("click", () => flip(card)));
  }

  function flip(card) {
    if (card.classList.contains("is-open") || card.classList.contains("is-done") || open.length === 2) return;
    card.classList.add("is-open");
    open.push(card);
    if (open.length === 2) {
      moves += 1;
      $("#memoryMoves").textContent = `${moves} moves`;
      if (open[0].dataset.value === open[1].dataset.value) {
        open.forEach((item) => item.classList.add("is-done"));
        open = [];
        if ($$(".memory-card.is-done").length === icons.length) showToast(`Memory cleared in ${moves} moves.`);
      } else {
        setTimeout(() => {
          open.forEach((item) => item.classList.remove("is-open"));
          open = [];
        }, 650);
      }
    }
  }

  $("#memoryReset").addEventListener("click", shuffle);
  shuffle();
}

function setupSlots() {
  const values = ["CAR", "VHS", "BIKE", "STAR", "FILM", "TAXI"];
  $("#slotSpin").addEventListener("click", () => {
    const roll = [0, 1, 2].map(() => values[Math.floor(Math.random() * values.length)]);
    $("#slot1").textContent = roll[0];
    $("#slot2").textContent = roll[1];
    $("#slot3").textContent = roll[2];
    const win = roll.every((item) => item === roll[0]);
    $("#slotResult").textContent = win ? "Jackpot" : "Try again";
    showToast(win ? "Slot jackpot. Frame this moment." : "Slots spun. The machine remains dramatic.");
  });
}

document.addEventListener("DOMContentLoaded", () => {
  document.body.classList.add("loading");
  bootLoader();
  buildEditableContent();
  updateAge();
  setInterval(updateAge, 1000);
  setupScrollReveal();
  setupMenu();
  setupCursor();
  setupEasterEggs();
  setupQuoteRotation();
  setupCarGame();
  setupBikeGame();
  setupReflexGame();
  setupMemoryGame();
  setupSlots();
});
