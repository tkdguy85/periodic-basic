// Pulls JSON data and generates the content for the periodic table

let elements = [] // store globally for later modal use

fetch("elements.json")
  .then(res => res.json())
  .then(json => {
    elements = json
    renderTable(json)
    closeModal()
  })

// Builds out table grid
function renderTable(data) {
  const table = document.getElementById("element-grid")
  table.innerHTML = "" // clear before rendering

  
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
  })

  // Model functions
  function openModal(element) {
    // Modal content
    document.getElementById("element-name").textContent = element["Name"]
    document.getElementById("element-symbol").textContent = element["Symbol"]
    document.getElementById("element-number").textContent = element["Atomic Number"]
    document.getElementById("element-mass").textContent = element["Atomic Weight"]
    document.getElementById("element-series").textContent = element["Series / Type"]
    document.getElementById("element-period").textContent = element["Period"]
    document.getElementById("element-block").textContent = element["Block"]
    document.getElementById("element-electron-layout").textContent = element["Electron Configuration"]
    document.getElementById("element-shell").textContent = element["Electrons per Shell"]
    document.getElementById("element-melting-point").textContent = element["Melting Point (K)"]
    document.getElementById("element-boiling-point").textContent = element["Boiling Point (K)"]
    document.getElementById("element-discovery").textContent = element["Discovered By"]

    const wikiLink = document.getElementById("element-link")
    wikiLink.href = element["Wikipedia"]

    // Display modal
    document.getElementById("element-modal").classList.remove("hidden")
  }
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
