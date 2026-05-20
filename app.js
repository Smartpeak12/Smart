// Sample properties data
let properties = [
    {
        id: 1,
        title: "Modern Apartment",
        price: 250000,
        type: "sale",
        location: "Downtown",
        bedrooms: 2,
        bathrooms: 1,
        sqft: 1200,
        image: "🏢"
    },
    {
        id: 2,
        title: "Cozy Studio",
        price: 1200,
        type: "rent",
        location: "Midtown",
        bedrooms: 1,
        bathrooms: 1,
        sqft: 600,
        image: "🏠"
    },
    {
        id: 3,
        title: "Luxury Villa",
        price: 750000,
        type: "sale",
        location: "Suburbs",
        bedrooms: 4,
        bathrooms: 3,
        sqft: 3500,
        image: "🏡"
    },
    {
        id: 4,
        title: "Family Home",
        price: 1800,
        type: "rent",
        location: "Residential Area",
        bedrooms: 3,
        bathrooms: 2,
        sqft: 2000,
        image: "🏘️"
    }
];

let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

// Initialize app
function initApp() {
    displayProperties(properties);
    setupEventListeners();
}

// Display properties
function displayProperties(propertiesToDisplay) {
    const grid = document.getElementById('properties-grid');
    grid.innerHTML = '';

    if (propertiesToDisplay.length === 0) {
        grid.innerHTML = '<p>No properties found</p>';
        return;
    }

    propertiesToDisplay.forEach(property => {
        const card = createPropertyCard(property);
        grid.appendChild(card);
    });
}

// Create property card
function createPropertyCard(property) {
    const div = document.createElement('div');
    div.className = 'property-card';
    const isFavorite = favorites.includes(property.id);
    
    div.innerHTML = `
        <div class="property-image">${property.image}</div>
        <div class="property-info">
            <div class="property-type">${property.type === 'sale' ? 'For Sale' : 'For Rent'}</div>
            <h3>${property.title}</h3>
            <div class="property-price">${property.type === 'sale' ? '$' + property.price.toLocaleString() : '$' + property.price + '/month'}</div>
            <div class="property-details">
                <span>📍 ${property.location}</span>
                <span>🛏️ ${property.bedrooms} beds</span>
                <span>🚿 ${property.bathrooms} baths</span>
            </div>
            <p>${property.sqft} sq ft</p>
            <div class="property-actions">
                <button class="btn-primary" onclick="viewProperty(${property.id})">View Details</button>
                <button class="btn-secondary" onclick="toggleFavorite(${property.id})">${isFavorite ? '❤️ Saved' : '🤍 Save'}</button>
            </div>
        </div>
    `;
    return div;
}

// View property details
function viewProperty(id) {
    const property = properties.find(p => p.id === id);
    alert(`${property.title}\n${property.location}\nPrice: ${property.type === 'sale' ? '$' + property.price : '$' + property.price + '/month'}\nBedrooms: ${property.bedrooms}\nBathrooms: ${property.bathrooms}`);
}

// Toggle favorite
function toggleFavorite(id) {
    const index = favorites.indexOf(id);
    if (index > -1) {
        favorites.splice(index, 1);
    } else {
        favorites.push(id);
    }
    localStorage.setItem('favorites', JSON.stringify(favorites));
    displayProperties(filterProperties());
}

// Apply filters
function applyFilters() {
    const filtered = filterProperties();
    displayProperties(filtered);
}

// Filter properties
function filterProperties() {
    const typeFilter = document.getElementById('type-filter').value;
    const locationFilter = document.getElementById('location-filter').value.toLowerCase();
    const priceMin = parseFloat(document.getElementById('price-min').value) || 0;
    const priceMax = parseFloat(document.getElementById('price-max').value) || Infinity;
    const bedroomsFilter = document.getElementById('bedrooms-filter').value;

    return properties.filter(p => {
        const typeMatch = !typeFilter || p.type === typeFilter;
        const locationMatch = !locationFilter || p.location.toLowerCase().includes(locationFilter);
        const priceMatch = p.price >= priceMin && p.price <= priceMax;
        const bedroomsMatch = !bedroomsFilter || p.bedrooms >= parseInt(bedroomsFilter);
        return typeMatch && locationMatch && priceMatch && bedroomsMatch;
    });
}

// Search properties
function searchProperties() {
    const searchTerm = document.getElementById('search-input').value.toLowerCase();
    const filtered = properties.filter(p => 
        p.title.toLowerCase().includes(searchTerm) || 
        p.location.toLowerCase().includes(searchTerm)
    );
    displayProperties(filtered);
}

// Reset filters
function resetFilters() {
    document.getElementById('type-filter').value = '';
    document.getElementById('location-filter').value = '';
    document.getElementById('price-min').value = '';
    document.getElementById('price-max').value = '';
    document.getElementById('bedrooms-filter').value = '';
    document.getElementById('search-input').value = '';
    displayProperties(properties);
}

// Handle contact form
function handleContact(event) {
    event.preventDefault();
    alert('Thank you for your message! We will get back to you soon.');
    event.target.reset();
}

// Setup event listeners
function setupEventListeners() {
    document.getElementById('search-input').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') searchProperties();
    });
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', initApp);
