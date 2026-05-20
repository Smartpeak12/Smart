// Admin functionality
let properties = JSON.parse(localStorage.getItem('properties')) || [];

function initAdmin() {
    displayPropertiesAdmin();
}

function displayPropertiesAdmin() {
    const list = document.getElementById('properties-admin-list');
    if (!list) return;
    
    list.innerHTML = '';

    properties.forEach(property => {
        const div = document.createElement('div');
        div.className = 'property-item';
        div.innerHTML = `
            <div class="property-item-info">
                <h3>${property.title}</h3>
                <p>${property.location} • ${property.bedrooms} beds • ${property.type === 'sale' ? '$' + property.price : '$' + property.price + '/month'}</p>
            </div>
            <div class="property-item-actions">
                <button class="btn-edit" onclick="editProperty(${property.id})">Edit</button>
                <button class="btn-delete" onclick="deleteProperty(${property.id})">Delete</button>
            </div>
        `;
        list.appendChild(div);
    });
}

function handleAddProperty(event) {
    event.preventDefault();

    const newProperty = {
        id: Date.now(),
        title: document.getElementById('title').value,
        price: parseFloat(document.getElementById('price').value),
        type: document.getElementById('type').value,
        location: document.getElementById('location').value,
        bedrooms: parseInt(document.getElementById('bedrooms').value),
        bathrooms: parseInt(document.getElementById('bathrooms').value),
        sqft: parseInt(document.getElementById('sqft').value),
        image: '🏠'
    };

    properties.push(newProperty);
    localStorage.setItem('properties', JSON.stringify(properties));
    displayPropertiesAdmin();
    event.target.reset();
    alert('Property added successfully!');
}

function editProperty(id) {
    const property = properties.find(p => p.id === id);
    const title = prompt('Title:', property.title);
    if (title) {
        property.title = title;
        localStorage.setItem('properties', JSON.stringify(properties));
        displayPropertiesAdmin();
    }
}

function deleteProperty(id) {
    if (confirm('Are you sure you want to delete this property?')) {
        properties = properties.filter(p => p.id !== id);
        localStorage.setItem('properties', JSON.stringify(properties));
        displayPropertiesAdmin();
    }
}

function goHome() {
    window.location.href = 'index.html';
}
