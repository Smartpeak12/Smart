// Analytics functionality
const Analytics = {
    events: [],
    
    trackEvent(eventName, eventData = {}) {
        const event = {
            name: eventName,
            timestamp: new Date(),
            data: eventData
        };
        this.events.push(event);
        localStorage.setItem('analytics', JSON.stringify(this.events));
        console.log('Event tracked:', event);
    },
    
    trackPageView(page) {
        this.trackEvent('pageView', { page });
    },
    
    trackPropertyView(propertyId) {
        this.trackEvent('propertyView', { propertyId });
    },
    
    trackSearch(searchTerm) {
        this.trackEvent('search', { searchTerm });
    },
    
    trackAddToFavorites(propertyId) {
        this.trackEvent('addToFavorites', { propertyId });
    },
    
    getAnalytics() {
        return JSON.parse(localStorage.getItem('analytics')) || [];
    },
    
    getSummary() {
        const events = this.getAnalytics();
        return {
            totalEvents: events.length,
            pageViews: events.filter(e => e.name === 'pageView').length,
            propertyViews: events.filter(e => e.name === 'propertyView').length,
            searches: events.filter(e => e.name === 'search').length,
            favorites: events.filter(e => e.name === 'addToFavorites').length
        };
    }
};

// Initialize analytics
function initAnalytics() {
    Analytics.trackPageView(window.location.pathname);
}

// Track when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAnalytics);
} else {
    initAnalytics();
}
