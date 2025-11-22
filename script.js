// Pulls JSON data and generates the content for the periodic table

let elements = []; // store globally for later modal use

fetch("elements.json")
  .then(res => res.json())
  .then(json => {
    elements = json;
    renderTable(json);
  });

function renderTable(data) {
  const table = document.getElementById("element-grid");
  table.innerHTML = ""; // clear before rendering

  data.forEach(element => {
    const cell = document.createElement("div");
    cell.classList.add("element-cell");

    // Display symbol + atomic number
    cell.innerHTML = `
      <div class="atomic-number">${element["Atomic Number"]}</div>
      <div class="symbol">${element["Symbol"]}</div>
    `;

    // Save the name of the element on the cell for modal lookup later
    cell.dataset.elementName = element["Name"];

    cell.addEventListener("click", () => openModal(element))

    table.appendChild(cell);
  });

  function openModal(element) {
    // Modal content
    document.getElementById("element-name").textContent = element["Name"];
    document.getElementById("element-symbol").textContent = element["Symbol"];
    document.getElementById("element-number").textContent = element["Atomic Number"];
    document.getElementById("element-mass").textContent = element["Atomic Weight"];
    document.getElementById("element-series").textContent = element["Series / Type"];
    document.getElementById("element-period").textContent = element["Period"];
    document.getElementById("element-block").textContent = element["Block"];
    document.getElementById("element-electron-layout").textContent = element["Electron Configuration"];
    document.getElementById("element-shell").textContent = element["Electrons per Shell"];
    document.getElementById("element-melting-point").textContent = element["Melting Point (K)"];
    document.getElementById("element-boiling-point").textContent = element["Boiling Point (K)"];
    document.getElementById("element-discovery-date").textContent = element["Date of Discovery"];

    const wikiLink = document.getElementById("element-link");
    wikiLink.href = element["Wikipedia"];
  }
}
