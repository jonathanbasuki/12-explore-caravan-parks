const places = new Map([
    ["Alabama", "AL"],
    ["Alaska", "AK"],
    ["Arizona", "AZ"],
    ["Arkansas", "AR"],
    ["California", "CA"],
    ["Colorado", "CO"],
    ["Connecticut", "CT"],
    ["Delaware", "DE"],
    ["District of Columbia", "DC"],
    ["British Columbia", "BC"]
]);

const input = document.getElementById("searchInput");
const suggestionsBox = document.getElementById("suggestions");
const form = document.querySelector("form");

let selectedCode = ""; // Ini yang akan dikirim sebagai query
let highlightedIndex = -1; // Track the highlighted suggestion index

input.addEventListener("input", () => {
    const value = input.value.toLowerCase();
    suggestionsBox.innerHTML = "";
    selectedCode = ""; // reset jika user ketik manual
    highlightedIndex = -1; // reset highlighted index

    if (value === "") {
        suggestionsBox.classList.add("hidden");
        return;
    }

    const filtered = Array.from(places.keys()).filter(place =>
        place.toLowerCase().includes(value)
    );

    if (filtered.length > 0) {
        filtered.forEach((place, index) => {
            const li = document.createElement("li");
            li.textContent = place;
            li.className = "px-4 py-2 hover:bg-gray-100 cursor-pointer";
            li.addEventListener("click", () => {
                input.value = place;
                selectedCode = places.get(place); // simpan kode seperti "AL"
                suggestionsBox.classList.add("hidden");
            });

            // Add keyboard navigation highlight
            li.addEventListener("mouseover", () => {
                highlightedIndex = index;
                updateHighlighted();
            });

            suggestionsBox.appendChild(li);
        });
        suggestionsBox.classList.remove("hidden");
    } else {
        suggestionsBox.classList.add("hidden");
    }
});

// Keyboard navigation
input.addEventListener("keydown", (e) => {
    const suggestionItems = suggestionsBox.querySelectorAll("li");

    if (e.key === "ArrowDown") {
        if (highlightedIndex < suggestionItems.length - 1) {
            highlightedIndex++;
        } else {
            highlightedIndex = 0;
        }
        updateHighlighted();
    } else if (e.key === "ArrowUp") {
        if (highlightedIndex > 0) {
            highlightedIndex--;
        } else {
            highlightedIndex = suggestionItems.length - 1;
        }
        updateHighlighted();
    } else if (e.key === "Enter") {
        if (highlightedIndex !== -1) {
            const selectedItem = suggestionItems[highlightedIndex];
            input.value = selectedItem.textContent;
            selectedCode = places.get(selectedItem.textContent); // save the code like "AL"
            suggestionsBox.classList.add("hidden");
        }
    }
});

// Function to update the highlighted suggestion
function updateHighlighted() {
    const suggestionItems = suggestionsBox.querySelectorAll("li");
    suggestionItems.forEach((item, index) => {
        if (index === highlightedIndex) {
            item.classList.add("bg-gray-100"); // Highlight selected item
        } else {
            item.classList.remove("bg-gray-100");
        }
    });
}

// Hide suggestions when clicking outside
document.addEventListener("click", (e) => {
    if (!e.target.closest("#searchInput") && !e.target.closest("#suggestions")) {
        suggestionsBox.classList.add("hidden");
    }
});

// Saat submit, ubah input value menjadi kode yang dipilih
form.addEventListener("submit", (e) => {
    if (selectedCode) {
        input.value = selectedCode;
    }
});
