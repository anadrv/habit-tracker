const btnAny = document.getElementById("btn-any");
const btnReading = document.getElementById("reading");
const imageElement = document.getElementById("readingImage");
const inputFile = document.getElementById("imageInput");
const bookName = document.getElementById("bookName");
const fraseElement = document.getElementById("frase");

document.addEventListener("DOMContentLoaded", () => {
  const dadosSalvos = localStorage.getItem("livroAtual");

  if (dadosSalvos) {
    const objeto = JSON.parse(dadosSalvos);
    bookName.textContent = objeto.nome;
  }
});

function addBookName() {
  const nome = window.prompt("book name:");

  if (nome && nome.trim() !== "") {
    bookName.textContent = nome;

    const dados = { nome: nome };
    localStorage.setItem("livroAtual", JSON.stringify(dados));
  }
}

const container = document.getElementById("fraseContainer");

// 🔁 Carrega as frases ao abrir a página
document.addEventListener("DOMContentLoaded", () => {
  const dadosSalvos = localStorage.getItem("frases");
  if (dadosSalvos) {
    const lista = JSON.parse(dadosSalvos);
    lista.forEach((texto) => {
      const p = document.createElement("p");
      p.textContent = texto;
      container.appendChild(p);
    });
  }
});

function addMessage() {
  const dadosSalvos = localStorage.getItem("frases");
  const lista = dadosSalvos ? JSON.parse(dadosSalvos) : [];

  if (lista.length >= 3) {
    alert("Você só pode adicionar até 3 coisas.");
    return;
  }

  const novaFrase = window.prompt("Digite ai");

  if (novaFrase && novaFrase.trim() !== "") {
    // Cria e mostra o novo <p>
    const p = document.createElement("p");
    p.textContent = novaFrase;
    container.appendChild(p);

    // Salva no localStorage
    lista.push(novaFrase);
    localStorage.setItem("frases", JSON.stringify(lista));
  }
}

function resetarFrases() {
  const confirma = window.confirm("Tem certeza que quer remover tudo?");

  if (confirma) {
    localStorage.removeItem("frases");

    const container = document.getElementById("fraseContainer");
    container.innerHTML = "";

    alert("Todas as frases foram removidas!");
  } else {
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const checks = document.querySelectorAll(".habit__check");

  function carregarEstados() {
    const dados = localStorage.getItem("habitos");

    if (dados) {
      return JSON.parse(dados);
    } else {
      return {};
    }
  }

  function salvarEstados(estados) {
    localStorage.setItem("habitos", JSON.stringify(estados));
  }

  let estados = carregarEstados();

  //
  checks.forEach((check) => {
    const id = check.dataset.id;
    if (estados[id]) {
      check.classList.add("habit__check--done");
    }

    //CHECK
    check.addEventListener("click", () => {
      check.classList.toggle("habit__check--done");
      estados[id] = check.classList.contains("habit__check--done");
      salvarEstados(estados);
      atualizarProgresso();
    });
  });

  function atualizarProgresso() {
    const total = checks.length;
    const feitos = Object.values(estados).filter(Boolean).length;
    const percentual = Math.round((feitos / total) * 100);

    const progressoEl = document.getElementById("progresso");
    if (progressoEl) {
      progressoEl.textContent = `${percentual}%`;
    }
  }

  atualizarProgresso();
});

document.addEventListener("DOMContentLoaded", () => {
  const imagemSalva = localStorage.getItem("readingImage");

  if (imagemSalva) {
    imageElement.src = imagemSalva;
  }
});

imageElement.addEventListener("click", () => {
  inputFile.click();
});

//Ao escolher imagem, salvar e mostrar
inputFile.addEventListener("change", () => {
  const file = inputFile.files[0];

  if (file) {
    const reader = new FileReader();

    reader.onload = function (e) {
      const base64Image = e.target.result;

      imageElement.src = base64Image; // mostra
      localStorage.setItem("readingImage", base64Image); // salva
    };

    reader.readAsDataURL(file);
  }
});
