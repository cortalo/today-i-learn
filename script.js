const CATEGORIES = [
  { name: "technology", color: "#3b82f6" },
  { name: "science", color: "#16a34a" },
  { name: "finance", color: "#ef4444" },
  { name: "society", color: "#eab308" },
  { name: "entertainment", color: "#db2777" },
  { name: "health", color: "#14b8a6" },
  { name: "history", color: "#f97316" },
  { name: "news", color: "#8b5cf6" },
];

// Selecting DOM elements
const btn = document.querySelector(".btn-open");
const form = document.querySelector(".fact-form");
const factsList = document.querySelector(".facts-list");

// Create DOM elements: Render facts in list
factsList.innerHTML = "";

// Load data from supabase
loadFacts();

async function loadFacts() {
  const res = await fetch(
    "https://zzbwfbvsjvlpgzounbit.supabase.co/rest/v1/facts",
    {
      headers: {
        apikey:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp6YndmYnZzanZscGd6b3VuYml0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE2OTA1NjEsImV4cCI6MjA3NzI2NjU2MX0.Sd57AL1rZetiKz2PGC11xxXI5wxt5rCNXPsnvE4FuJw",
        authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp6YndmYnZzanZscGd6b3VuYml0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE2OTA1NjEsImV4cCI6MjA3NzI2NjU2MX0.Sd57AL1rZetiKz2PGC11xxXI5wxt5rCNXPsnvE4FuJw",
      },
    }
  );
  const data = await res.json();
  //   const filteredData = data.filter((fact) => fact.category === "technology");
  createFactsList(data);
}

function createFactsList(dataArray) {
  const htmlArray = dataArray.map(
    (fact) => `<li class="fact">
    <p>
    ${fact.text}
    <a class="source" href="${fact.source}" target="_blank">
  (Source)</a>
    </p>
    <span class="tag" style="background-color: ${
      CATEGORIES.find((cat) => cat.name === fact.category).color
    }">
    ${fact.category}
    </span>
    </li>`
  );
  const html = htmlArray.join("");
  factsList.insertAdjacentHTML("afterbegin", html);
}

// Toggle form visibility
btn.addEventListener("click", function () {
  if (form.classList.contains("hidden")) {
    form.classList.remove("hidden");
    btn.textContent = "Close";
  } else {
    form.classList.add("hidden");
    btn.textContent = "Share a fact";
  }
});
