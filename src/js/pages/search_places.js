/**
 * A map of place names to their respective codes.
 * @type {Map<string, string>}
 */
const places = new Map([
    ['Alabama', 'AL'],
    ['Alaska', 'AK'],
    ['American Samoa', 'AS'],
    ['Arizona', 'AZ'],
    ['Arkansas', 'AR'],
    ['California', 'CA'],
    ['Colorado', 'CO'],
    ['Connecticut', 'CT'],
    ['Delaware', 'DE'],
    ['District of Columbia', 'DC'],
    ['Federated States of Micronesia', 'FM'],
    ['Florida', 'FL'],
    ['Georgia', 'GA'],
    ['Guam', 'GU'],
    ['Hawaii', 'HI'],
    ['Idaho', 'ID'],
    ['Illinois', 'IL'],
    ['Indiana', 'IN'],
    ['Iowa', 'IA'],
    ['Kansas', 'KS'],
    ['Kentucky', 'KY'],
    ['Louisiana', 'LA'],
    ['Maine', 'ME'],
    ['Marshall Islands', 'MH'],
    ['Maryland', 'MD'],
    ['Massachusetts', 'MA'],
    ['Michigan', 'MI'],
    ['Minnesota', 'MN'],
    ['Mississippi', 'MS'],
    ['Missouri', 'MO'],
    ['Montana', 'MT'],
    ['Nebraska', 'NE'],
    ['Nevada', 'NV'],
    ['New Hampshire', 'NH'],
    ['New Jersey', 'NJ'],
    ['New Mexico', 'NM'],
    ['New York', 'NY'],
    ['North Carolina', 'NC'],
    ['North Dakota', 'ND'],
    ['Northern Mariana Islands', 'MP'],
    ['Ohio', 'OH'],
    ['Oklahoma', 'OK'],
    ['Oregon', 'OR'],
    ['Palau', 'PW'],
    ['Pennsylvania', 'PA'],
    ['Puerto Rico', 'PR'],
    ['Rhode Island', 'RI'],
    ['South Carolina', 'SC'],
    ['South Dakota', 'SD'],
    ['Tennessee', 'TN'],
    ['Texas', 'TX'],
    ['Utah', 'UT'],
    ['Vermont', 'VT'],
    ['Virgin Islands', 'VI'],
    ['Virginia', 'VA'],
    ['Washington', 'WA'],
    ['West Virginia', 'WV'],
    ['Wisconsin', 'WI'],
    ['Wyoming', 'WY'],
    ['Alberta', 'AB'],
    ['British Columbia', 'BC'],
    ['Manitoba', 'MB'],
    ['New Brunswick', 'NB'],
    ['Newfoundland and Labrador', 'NL'],
    ['Northwest Territories', 'NT'],
    ['Nova Scotia', 'NS'],
    ['Nunavut', 'NU'],
    ['Ontario', 'ON'],
    ['Prince Edward Island', 'PE'],
    ['Quebec', 'QC'],
    ['Saskatchewan', 'SK'],
    ['Yukon', 'YT']
]);

// DOM Elements
/** @type {HTMLInputElement} */
const input = document.getElementById("searchInput");
/** @type {HTMLElement} */
const suggestionsBox = document.getElementById("suggestions");
/** @type {HTMLFormElement} */
const form = document.querySelector("form");

let selectedCode = ""; // The selected state's code, e.g., "CA"
let highlightedIndex = -1; // Track index of highlighted suggestion

/**
 * Handles user input in the search box and renders matching suggestions.
 * Also resets selection and highlight index.
 */
input.addEventListener("input", () => {
    const value = input.value.toLowerCase();
    suggestionsBox.innerHTML = "";
    selectedCode = "";
    highlightedIndex = -1;

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

            // Click to select suggestion
            li.addEventListener("click", () => {
                input.value = place;
                selectedCode = places.get(place);
                suggestionsBox.classList.add("hidden");
            });

            // Hover to highlight suggestion
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

/**
 * Handles keyboard navigation (up/down arrows and enter key) for suggestion list.
 * Highlights suggestions and selects with Enter.
 *
 * @param {KeyboardEvent} e
 */
input.addEventListener("keydown", (e) => {
    const suggestionItems = suggestionsBox.querySelectorAll("li");

    if (e.key === "ArrowDown") {
        highlightedIndex = (highlightedIndex + 1) % suggestionItems.length;
        updateHighlighted();
    } else if (e.key === "ArrowUp") {
        highlightedIndex = (highlightedIndex - 1 + suggestionItems.length) % suggestionItems.length;
        updateHighlighted();
    } else if (e.key === "Enter") {
        if (highlightedIndex !== -1) {
            const selectedItem = suggestionItems[highlightedIndex];
            input.value = selectedItem.textContent;
            selectedCode = places.get(selectedItem.textContent);
            suggestionsBox.classList.add("hidden");
        }
    }
});

/**
 * Updates which suggestion is currently highlighted in the suggestion box.
 */
function updateHighlighted() {
    const suggestionItems = suggestionsBox.querySelectorAll("li");
    suggestionItems.forEach((item, index) => {
        item.classList.toggle("bg-gray-100", index === highlightedIndex);
    });
}

/**
 * Hides the suggestion box if user clicks outside of the input or suggestion list.
 */
document.addEventListener("click", (e) => {
    if (!e.target.closest("#searchInput") && !e.target.closest("#suggestions")) {
        suggestionsBox.classList.add("hidden");
    }
});

/**
 * On form submission, replaces the input value with the selected place code (e.g., "CA").
 *
 * @param {SubmitEvent} e
 */
form.addEventListener("submit", (e) => {
    if (selectedCode) {
        input.value = selectedCode;
    }
});
