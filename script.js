const btnAny = document.getElementById("btn-any");
const btnReading = document.getElementById("reading");
const imageElement = document.getElementById("readingImage");
const inputFile = document.getElementById("imageInput");
const bookName = document.getElementById("bookName");
const fraseElement = document.getElementById("frase");
const container = document.getElementById("fraseContainer");

/*BOOK NAME*/

document.addEventListener("DOMContentLoaded", () => {
  const savedBook = localStorage.getItem("currentBook");

  if (savedBook) {
    const data = JSON.parse(savedBook);
    bookName.textContent = data.name;
  }
});

function addBookName() {
  const name = window.prompt("Book name:");

  if (name && name.trim() !== "") {
    bookName.textContent = name;

    const data = { name };
    localStorage.setItem("currentBook", JSON.stringify(data));
  }
}

/*REMINDERS / MESSAGES*/

document.addEventListener("DOMContentLoaded", () => {
  const savedMessages = localStorage.getItem("messages");

  if (savedMessages) {
    const list = JSON.parse(savedMessages);
    list.forEach((text) => {
      const p = document.createElement("p");
      p.textContent = text;
      container.appendChild(p);
    });
  }
});

function addMessage() {
  const savedMessages = localStorage.getItem("messages");
  const list = savedMessages ? JSON.parse(savedMessages) : [];

  if (list.length >= 3) {
    alert("You can only add up to 3 items.");
    return;
  }

  const newMessage = window.prompt("Type something:");

  if (newMessage && newMessage.trim() !== "") {
    const p = document.createElement("p");
    p.textContent = newMessage;
    container.appendChild(p);

    list.push(newMessage);
    localStorage.setItem("messages", JSON.stringify(list));
  }
}

function resetMessages() {
  const confirmReset = window.confirm("Are you sure you want to remove everything?");

  if (confirmReset) {
    localStorage.removeItem("messages");
    container.innerHTML = "";
    alert("All reminders were removed!");
  }
}

/*HABITS*/

document.addEventListener("DOMContentLoaded", () => {
  const checks = document.querySelectorAll(".habit__check");

  function loadHabitStates() {
    const data = localStorage.getItem("habits");
    return data ? JSON.parse(data) : {};
  }

  function saveHabitStates(states) {
    localStorage.setItem("habits", JSON.stringify(states));
  }

  let states = loadHabitStates();

  checks.forEach((check) => {
    const id = check.dataset.id;

    if (states[id]) {
      check.classList.add("habit__check--done");
    }

    check.addEventListener("click", () => {
      check.classList.toggle("habit__check--done");
      states[id] = check.classList.contains("habit__check--done");
      saveHabitStates(states);
      updateProgress();
    });
  });

  function updateProgress() {
    const total = checks.length;
    const done = Object.values(states).filter(Boolean).length;
    const percentage = Math.round((done / total) * 100);

    const progressEl = document.getElementById("progresso");
    if (progressEl) {
      progressEl.textContent = `${percentage}%`;
    }
  }

  updateProgress();
});

/*READING IMAGE*/

document.addEventListener("DOMContentLoaded", () => {
  const savedImage = localStorage.getItem("readingImage");

  if (savedImage) {
    imageElement.src = savedImage;
  }
});

imageElement.addEventListener("click", () => {
  inputFile.click();
});

inputFile.addEventListener("change", () => {
  const file = inputFile.files[0];

  if (file) {
    const reader = new FileReader();

    reader.onload = (e) => {
      const base64Image = e.target.result;
      imageElement.src = base64Image;
      localStorage.setItem("readingImage", base64Image);
    };

    reader.readAsDataURL(file);
  }
});
