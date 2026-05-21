// Digital Clock Application

const TIMEZONES = [
    { name: 'UTC', offset: 0, country: 'Global' },
    { name: 'GMT', offset: 0, country: 'London' },
    { name: 'CET', offset: 1, country: 'Paris, Berlin' },
    { name: 'EET', offset: 2, country: 'Cairo, Athens' },
    { name: 'MSK', offset: 3, country: 'Moscow' },
    { name: 'GST', offset: 4, country: 'Dubai' },
    { name: 'PKT', offset: 5, country: 'Karachi' },
    { name: 'IST', offset: 5.5, country: 'India' },
    { name: 'BDT', offset: 6, country: 'Bangladesh' },
    { name: 'ICT', offset: 7, country: 'Bangkok, Ho Chi Minh' },
    { name: 'CST', offset: 8, country: 'Beijing, Shanghai' },
    { name: 'SGT', offset: 8, country: 'Singapore' },
    { name: 'HKT', offset: 8, country: 'Hong Kong' },
    { name: 'JST', offset: 9, country: 'Tokyo, Seoul' },
    { name: 'AEST', offset: 10, country: 'Sydney' },
    { name: 'NZST', offset: 12, country: 'Auckland' },
    { name: 'HST', offset: -10, country: 'Hawaii' },
    { name: 'PST', offset: -8, country: 'Los Angeles' },
    { name: 'MST', offset: -7, country: 'Denver' },
    { name: 'CST', offset: -6, country: 'Chicago' },
    { name: 'EST', offset: -5, country: 'New York' },
    { name: 'BRT', offset: -3, country: 'Brasília' },
    { name: 'ART', offset: -3, country: 'Buenos Aires' },
    { name: 'WET', offset: 0, country: 'Lisbon' },
    { name: 'WEST', offset: 1, country: 'Lisbon (Summer)' },
    { name: 'AKST', offset: -9, country: 'Anchorage' }
];

class DigitalClock {
    constructor() {
        this.activeTimeZones = ['UTC', 'IST', 'JST'];
        this.timeFormat = '12'; // 12 or 24
        this.init();
    }

    init() {
        this.loadPreferences();
        this.setupEventListeners();
        this.populateModal();
        this.updateAllClocks();
        this.startClock();
        this.applyTheme();
    }

    setupEventListeners() {
        // Format buttons
        document.querySelectorAll('.format-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.changeFormat(e.target.dataset.format));
        });

        // Add zone button
        document.getElementById('add-zone-btn').addEventListener('click', () => {
            document.getElementById('modal').classList.add('show');
        });

        // Close modal
        document.getElementById('close-modal').addEventListener('click', () => {
            document.getElementById('modal').classList.remove('show');
        });

        // Modal add button
        document.getElementById('modal-add-btn').addEventListener('click', () => {
            const select = document.getElementById('timezone-select');
            const value = select.value;
            if (value && !this.activeTimeZones.includes(value)) {
                this.activeTimeZones.push(value);
                this.updateAllClocks();
                this.savePreferences();
                document.getElementById('modal').classList.remove('show');
            }
        });

        // Reset button
        document.getElementById('reset-btn').addEventListener('click', () => {
            this.activeTimeZones = ['UTC', 'IST', 'JST'];
            this.updateAllClocks();
            this.savePreferences();
        });

        // Search
        document.getElementById('search-input').addEventListener('input', (e) => {
            this.searchTimeZones(e.target.value);
        });

        // Theme toggle
        document.getElementById('theme-toggle').addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            localStorage.setItem('clock-theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
        });
    }

    populateModal() {
        const select = document.getElementById('timezone-select');
        TIMEZONES.forEach(tz => {
            const option = document.createElement('option');
            option.value = tz.name;
            option.textContent = `${tz.name} (${tz.country}) UTC${tz.offset >= 0 ? '+' : ''}${tz.offset}`;
            select.appendChild(option);
        });
    }

    changeFormat(format) {
        this.timeFormat = format;
        this.savePreferences();
        this.updateAllClocks();
        
        // Update button states
        document.querySelectorAll('.format-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`.format-btn[data-format="${format}"]`).classList.add('active');
    }

    getCurrentTime(tzOffset) {
        const now = new Date();
        const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
        const localTime = new Date(utc + (3600000 * tzOffset));
        return localTime;
    }

    formatTime(date) {
        let hours = date.getHours();
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
        let ampm = '';

        if (this.timeFormat === '12') {
            ampm = hours >= 12 ? ' PM' : ' AM';
            hours = hours % 12;
            hours = hours ? hours : 12;
        }

        return `${String(hours).padStart(2, '0')}:${minutes}:${seconds}${ampm}`;
    }

    formatDate(date) {
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        
        return `${days[date.getDay()]} ${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
    }

    getDayIndicator(date) {
        const hours = date.getHours();
        if (hours >= 6 && hours < 18) {
            return { emoji: '☀️', label: 'Daytime', class: 'daytime' };
        } else if (hours >= 18 && hours < 21) {
            return { emoji: '🌅', label: 'Evening', class: 'evening' };
        } else {
            return { emoji: '🌙', label: 'Night', class: 'night' };
        }
    }

    updateAllClocks() {
        this.updateMainClock();
        this.updateTimeZoneClocks();
        this.updateStatistics();
    }

    updateMainClock() {
        const now = new Date();
        document.getElementById('main-time').textContent = this.formatTime(now);
        document.getElementById('main-date').textContent = this.formatDate(now);
    }

    updateTimeZoneClocks() {
        const grid = document.getElementById('clocks-grid');
        grid.innerHTML = '';

        this.activeTimeZones.forEach(tzName => {
            const tz = TIMEZONES.find(t => t.name === tzName);
            if (!tz) return;

            const localTime = this.getCurrentTime(tz.offset);
            const dayInfo = this.getDayIndicator(localTime);

            const card = document.createElement('div');
            card.className = `clock-card ${dayInfo.class}`;
            card.innerHTML = `
                <div class="clock-header">
                    <div class="clock-title">${tz.name}</div>
                    <div class="clock-offset">UTC${tz.offset >= 0 ? '+' : ''}${tz.offset}</div>
                </div>
                <div class="day-indicator">${dayInfo.emoji}</div>
                <div class="clock-time">${this.formatTime(localTime)}</div>
                <div class="clock-date">${tz.country}</div>
                <div class="clock-date">${this.formatDate(localTime)}</div>
                <button class="remove-btn" onclick="clock.removeTimeZone('${tz.name}')">Remove</button>
            `;
            grid.appendChild(card);
        });
    }

    updateStatistics() {
        const stats = {
            total: this.activeTimeZones.length,
            times: [],
            daytimes: 0
        };

        this.activeTimeZones.forEach(tzName => {
            const tz = TIMEZONES.find(t => t.name === tzName);
            const localTime = this.getCurrentTime(tz.offset);
            const hours = localTime.getHours();
            const minutes = localTime.getMinutes();
            const time = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
            stats.times.push({ time, hours });

            if (hours >= 6 && hours < 18) {
                stats.daytimes++;
            }
        });

        const earliest = stats.times.sort((a, b) => a.hours - b.hours)[0]?.time || '--:--';
        const latest = stats.times.sort((a, b) => b.hours - a.hours)[0]?.time || '--:--';

        document.getElementById('stat-total').textContent = stats.total;
        document.getElementById('stat-earliest').textContent = earliest;
        document.getElementById('stat-latest').textContent = latest;
        document.getElementById('stat-daytime').textContent = stats.daytimes;
    }

    removeTimeZone(tzName) {
        this.activeTimeZones = this.activeTimeZones.filter(tz => tz !== tzName);
        this.updateAllClocks();
        this.savePreferences();
    }

    searchTimeZones(searchTerm) {
        const term = searchTerm.toLowerCase();
        const cards = document.querySelectorAll('.clock-card');
        
        cards.forEach(card => {
            const text = card.textContent.toLowerCase();
            card.style.display = text.includes(term) ? 'block' : 'none';
        });
    }

    startClock() {
        setInterval(() => this.updateAllClocks(), 1000);
    }

    savePreferences() {
        localStorage.setItem('clock-zones', JSON.stringify(this.activeTimeZones));
        localStorage.setItem('clock-format', this.timeFormat);
    }

    loadPreferences() {
        const saved = localStorage.getItem('clock-zones');
        if (saved) {
            this.activeTimeZones = JSON.parse(saved);
        }
        
        const format = localStorage.getItem('clock-format');
        if (format) {
            this.timeFormat = format;
            document.querySelector(`.format-btn[data-format="${format}"]`).classList.add('active');
        }
    }

    applyTheme() {
        const theme = localStorage.getItem('clock-theme') || 'light';
        if (theme === 'dark') {
            document.body.classList.add('dark-mode');
            document.getElementById('theme-toggle').textContent = '☀️';
        } else {
            document.getElementById('theme-toggle').textContent = '🌙';
        }
    }
}

// Initialize app
let clock;
document.addEventListener('DOMContentLoaded', () => {
    clock = new DigitalClock();
});
