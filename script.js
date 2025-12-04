// Pulls JSON data and generates the content for the periodic table

let elements = [] // Array holding all element data

// Color mapping for element types
const seriesColors = {
  "diatomic nonmetal": "var(--primary-nonmetal)",
  "polyatomic nonmetal": "var(--primary-nonmetal)",
  "noble gas": "var(--primary-noble-gas)",
  "halogen": "var(--primary-halogen)",
  "alkali metal": "var(--primary-alkali-metal)",
  "alkaline earth metal": "var(--primary-alkaline-earth-metal)",
  "metalloid": "var(--primary-metalloid)",
  "metal": "var(--primary-metal)",
  "transition metal": "var(--primary-transition-metal)",
  "lanthanide": "var(--primary-lanthanide)",
  "actinide": "var(--primary-actinide)",
  "post-transition metal": "var(--primary-post-transition-metal)",
  "unknown series": "var(--primary-other)"
}

fetch("elements.json")
  .then(res => res.json())
  .then(json => {
    elements = json
    renderTable(json)
    closeModal()
  })

// Set background color based on series/type
function getBackgroundColor(element) {
  const series = element["Series / Type"]
  return seriesColors[series] || "var(--primary-other)"
}

// Builds out table grid
function renderTable(data) {
  const table = document.getElementById("element-grid")

  data.forEach(element => {
    const cell = document.createElement("div")
    cell.classList.add("element-cell")
    
    // Grid Layout to mimic current periodic table structure
    cell.style.gridColumn = element.X
    cell.style.gridRow = element.Y

    // Display symbol + atomic number
    cell.innerHTML = `
      <div class="atomic-number">${element["Atomic Number"]}</div>
      <div class="symbol">${element["Symbol"]}</div>
    `
    
    // Modal Dataset
    cell.dataset.elementName = element["Name"]

    cell.addEventListener("click", () => openModal(element))

    table.appendChild(cell)

    cell.style.backgroundColor = getBackgroundColor(element)
  })
}

// Builds legend based on seriesColors
function renderLegend(seriesColors) {
  const legend = document.getElementById("legend");

  Object.entries(seriesColors).forEach(([label, color]) => {
    const item = document.createElement("div");
    item.className = "legend-item";

    const box = document.createElement("span");
    box.className = "legend-color";
    box.style.backgroundColor = color;

    const text = document.createElement("span");
    text.className = "legend-label";
    text.textContent = label;

    item.appendChild(box);
    item.appendChild(text);

    legend.appendChild(item);
  });
}

renderLegend(seriesColors);

// Model functions
function openModal(element) {
  // Modal content (refactored: mapping + guards)
  const modalContent = document.getElementById("element-modal-content")
  if (modalContent) modalContent.style.backgroundColor = getBackgroundColor(element)

  const fields = {
    "element-name": "Name",
    "element-symbol": "Symbol",
    "element-number": "Atomic Number",
    "element-mass": "Atomic Weight",
    "element-series": "Series / Type",
    "element-period": "Period",
    "element-block": "Block",
    "element-electron-layout": "Electron Configuration",
    "element-shell": "Electrons per Shell",
    "element-melting-point": "Melting Point (K)",
    "element-boiling-point": "Boiling Point (K)",
    "element-discovery": "Discovered By"
  }

  Object.entries(fields).forEach(([id, key]) => {
    const target = document.getElementById(id)
    if (target) target.textContent = element[key] ?? ""
  })

  const wikiLink = document.getElementById("element-link")
  if (wikiLink) wikiLink.href = element["Wikipedia"] || "#"

  // Display modal
  const modal = document.getElementById("element-modal")
  if (modal) modal.classList.remove("hidden")
}

// Closes modal
function closeModal() {
  const modal = document.getElementById("element-modal")
  const closeButton = document.getElementById("close-modal")

  // Close when clicking the button
  closeButton.addEventListener("click", () => {
    modal.classList.add("hidden")
  })

  // Close when clicking outside modal area
  modal.addEventListener("click", (e) => {
    if (event.target === modal) {
      modal.classList.add("hidden")
    }
  })

  // Close when pressing esc
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      modal.classList.add("hidden")
    }
  })
}
