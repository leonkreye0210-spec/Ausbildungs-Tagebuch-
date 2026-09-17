let entries = JSON.parse(localStorage.getItem("ausbildungsEintraege")) || [];

const manualButton = document.getElementById("manualButton");
const voiceButton = document.getElementById("voiceButton");
const entryModal = document.getElementById("entryModal");
const closeModal = document.getElementById("closeModal");
const saveButton = document.getElementById("saveButton");
const entryTitle = document.getElementById("entryTitle");
const entryDescription = document.getElementById("entryDescription");
const entryLearned = document.getElementById("entryLearned");
const entryCategory = document.getElementById("entryCategory");
const entriesList = document.getElementById("entriesList");
const emptyState = document.getElementById("emptyState");
const entryCount = document.getElementById("entryCount");

function openModal() {
    entryModal.classList.remove("hidden");
    entryTitle.focus();
}

function closeEntryModal() {
    entryModal.classList.add("hidden");
}

manualButton.addEventListener("click", openModal);

voiceButton.addEventListener("click", function () {
    alert("Die Spracheingabe bauen wir als Nächstes ein. 🎤");
});

closeModal.addEventListener("click", closeEntryModal);

saveButton.addEventListener("click", function () {
    const title = entryTitle.value.trim();
    const description = entryDescription.value.trim();
    const learned = entryLearned.value.trim();
    const category = entryCategory.value;

    if (title === "") {
        alert("Bitte gib eine Tätigkeit ein.");
        return;
    }

    const newEntry = {
        id: Date.now(),
        title,
        description,
        learned,
        category,
        date: new Date().toLocaleString("de-DE")
    };

    entries.unshift(newEntry);

    localStorage.setItem(
        "ausbildungsEintraege",
        JSON.stringify(entries)
    );

    entryTitle.value = "";
    entryDescription.value = "";
    entryLearned.value = "";
    entryCategory.value = "Praxis";

    closeEntryModal();
    renderEntries();
});

function renderEntries() {
    entriesList.innerHTML = "";

    entryCount.textContent =
        entries.length === 1
            ? "1 Eintrag"
            : `${entries.length} Einträge`;

    if (entries.length === 0) {
        entriesList.appendChild(emptyState);
        return;
    }

    entries.forEach(function (entry) {
        const card = document.createElement("div");
        card.className = "entry-card";

        card.innerHTML = `
            <button
                class="delete-button"
                onclick="deleteEntry(${entry.id})"
            >🗑️</button>

            <h3>${escapeHtml(entry.title)}</h3>

            <div class="entry-date">
                ${escapeHtml(entry.date)}
            </div>

            <div class="entry-description">
                ${escapeHtml(entry.description)}
            </div>

            ${
                entry.learned
                    ? `
                    <div class="entry-learned">
                        💡 <strong>Gelernt:</strong><br>
                        ${escapeHtml(entry.learned)}
                    </div>
                    `
                    : ""
            }

            <span class="category">
                ${escapeHtml(entry.category)}
            </span>
        `;

        entriesList.appendChild(card);
    });
}

function deleteEntry(id) {
    if (!confirm("Möchtest du diesen Eintrag wirklich löschen?")) {
        return;
    }

    entries = entries.filter(function (entry) {
        return entry.id !== id;
    });

    localStorage.setItem(
        "ausbildungsEintraege",
        JSON.stringify(entries)
    );

    renderEntries();
}

function escapeHtml(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
}

renderEntries();
