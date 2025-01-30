// Function to handle search
function searchFunction() {
    let query = document.getElementById("searchInput").value;
    alert("Searching for: " + query);
}

// Function to reset search input
function resetFunction() {
    document.getElementById("searchInput").value = "";
}
// Search function
function searchFunction() {
    let query = document.getElementById("searchInput").value;
    alert("Searching for: " + query);
}

// Reset function
function resetFunction() {
    document.getElementById("searchInput").value = "";
}
document.addEventListener("DOMContentLoaded", () => {
    fetch("travel_recommendation_api.json") // Fetch the JSON file
        .then(response => response.json())  // Convert response to JSON
        .then(data => {
            console.log(data);  // Check if data is being fetched correctly
            displayRecommendations(data);  // Call function to display recommendations
        })
        .catch(error => console.error("Error fetching recommendations:", error));
});

document.addEventListener("DOMContentLoaded", () => {
    fetch("travel_recommendation_api.json")
        .then(response => response.json())
        .then(data => {
            console.log(data); // Check data in console
            window.travelData = data; // Store data globally for searching
        })
        .catch(error => console.error("Error fetching data:", error));
});

function searchFunction() {
    const searchInput = document.getElementById("searchInput").value.toLowerCase();
    const resultsContainer = document.getElementById("recommendation-results");

    if (!window.travelData) {
        console.error("Travel data not loaded yet.");
        return;
    }

    resultsContainer.innerHTML = ""; // Clear previous results

    let results = [];

    // Search in countries' cities
    window.travelData.countries.forEach(country => {
        country.cities.forEach(city => {
            if (city.name.toLowerCase().includes(searchInput)) {
                results.push(city);
            }
        });
    });

    // Search in temples
    window.travelData.temples.forEach(temple => {
        if (temple.name.toLowerCase().includes(searchInput)) {
            results.push(temple);
        }
    });

    // Search in beaches
    window.travelData.beaches.forEach(beach => {
        if (beach.name.toLowerCase().includes(searchInput)) {
            results.push(beach);
        }
    });

    // Display results
    if (results.length > 0) {
        results.forEach(item => {
            const card = createCard(item);
            resultsContainer.appendChild(card);
        });
    } else {
        resultsContainer.innerHTML = "<p>No results found. Try another keyword.</p>";
    }
}

function resetFunction() {
    document.getElementById("searchInput").value = ""; // Clear input
    document.getElementById("recommendation-results").innerHTML = ""; // Clear results
}

function createCard(item) {
    const card = document.createElement("div");
    card.classList.add("recommendation-card");

    card.innerHTML = `
        <img src="${item.imageUrl}" alt="${item.name}" class="recommendation-image">
        <h3>${item.name}</h3>
        <p>${item.description}</p>
    `;

    return card;
}

