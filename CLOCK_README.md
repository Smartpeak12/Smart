# Digital Clock - Multiple Time Zones

A modern, interactive digital clock application that displays current time across different time zones worldwide.

## Features

✅ **Real-time Clock** - Updates every second
✅ **Multiple Time Zones** - Display 26+ time zones
✅ **Add/Remove Time Zones** - Customize your display
✅ **Time Format Toggle** - Switch between 12-hour and 24-hour formats
✅ **Search Functionality** - Find specific time zones
✅ **Statistics** - View time zone statistics
✅ **Day/Night Indicator** - Visual time of day indicator (☀️/🌙)
✅ **Dark Mode** - Light/Dark theme toggle
✅ **Responsive Design** - Works on all devices
✅ **Local Storage** - Saves your preferences

## Time Zones Included

- **UTC/GMT** - Coordinated Universal Time
- **Europe** - CET, EET, MSK, WET, WEST
- **Asia** - IST, JST, SGT, HKT, ICT, CST, BDT, PKT
- **Americas** - PST, MST, CST, EST, BRT, ART, AKST, HST
- **Australia/Pacific** - AEST, NZST
- **Middle East/Africa** - GST

## How to Use

### View Current Time
1. Open `clock.html` in your browser
2. Main clock displays your local time
3. Timezone cards show time in different regions

### Add a Time Zone
1. Click **+ Add Time Zone** button
2. Select desired time zone from dropdown
3. Click **Add** to add to display

### Remove a Time Zone
1. Find the time zone card
2. Click **Remove** button
3. Time zone will be removed from display

### Search Time Zones
1. Type in search box (e.g., "Tokyo", "UTC+8")
2. Matching time zones will be highlighted
3. Clear search to show all again

### Change Time Format
1. Select **12-Hour** or **24-Hour** format
2. All clocks update immediately
3. Format is saved in your browser

### Toggle Dark Mode
1. Click moon/sun icon in navbar
2. Theme switches to dark/light mode
3. Preference is saved

## Statistics

The stats section shows:
- **Total Time Zones** - Number of zones being displayed
- **Earliest Time** - Earliest hour shown
- **Latest Time** - Latest hour shown
- **Daytime Zones** - How many zones are between 6 AM - 6 PM

## Time Zone List

### UTC/GMT (0)
- UTC, GMT (London)
- WET (Lisbon)

### Europe
- CET +1 (Paris, Berlin)
- WEST +1 (Lisbon Summer)
- EET +2 (Cairo, Athens)
- MSK +3 (Moscow)

### Middle East/Asia
- GST +4 (Dubai)
- PKT +5 (Karachi)
- IST +5:30 (India)
- BDT +6 (Bangladesh)
- ICT +7 (Bangkok, Ho Chi Minh)
- CST +8 (Beijing)
- SGT +8 (Singapore)
- HKT +8 (Hong Kong)
- JST +9 (Tokyo, Seoul)

### Pacific
- AEST +10 (Sydney)
- NZST +12 (Auckland)

### Americas
- AKST -9 (Anchorage)
- HST -10 (Hawaii)
- PST -8 (Los Angeles)
- MST -7 (Denver)
- CST -6 (Chicago)
- EST -5 (New York)

### South America
- BRT -3 (Brasília)
- ART -3 (Buenos Aires)

## File Structure

```
clock.html          - Main HTML page
clock-styles.css    - Complete CSS styling
clock-app.js        - Application logic and time calculations
CLOCK_README.md     - This documentation
```

## Technologies Used

- **HTML5** - Structure
- **CSS3** - Styling with gradients and animations
- **JavaScript** - Real-time clock logic
- **LocalStorage** - Data persistence

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Features Breakdown

### Real-time Updates
- Clock updates every second
- Accurate time calculation for all time zones
- No server required (client-side only)

### Time Zone Management
- Add/remove time zones dynamically
- Default 3 time zones on load (UTC, IST, JST)
- Up to 26 time zones available
- Custom selection per user

### Display Options
- 12-hour format (with AM/PM)
- 24-hour format (00:00 to 23:59)
- Full date display with day of week
- UTC offset display

### Visual Indicators
- ☀️ Daytime (6 AM - 6 PM)
- 🌅 Evening (6 PM - 9 PM)
- 🌙 Night (9 PM - 6 AM)
- Color-coded cards with left border
- Gradient backgrounds

### Statistics Panel
- Total active time zones
- Earliest/latest hours
- Daytime zone count
- Real-time updates

### Dark Mode
- Toggle between light and dark themes
- System preference detection option
- Smooth color transitions
- Saves user preference

## Customization

### Add More Time Zones
Edit `TIMEZONES` array in `clock-app.js`:

```javascript
const TIMEZONES = [
    { name: 'Your City', offset: 0, country: 'Country' },
    // More zones...
];
```

### Change Colors
Edit CSS variables in `clock-styles.css`:

```css
:root {
    --primary-color: #6B46C1;
    --secondary-color: #EC4899;
    // More colors...
}
```

### Modify Update Frequency
Change interval in `clock-app.js`:

```javascript
setInterval(() => this.updateAllClocks(), 1000); // milliseconds
```

## Performance

- Lightweight (~20KB total)
- No external dependencies
- Efficient DOM updates
- Smooth animations
- Low memory usage

## Future Enhancements

- [ ] World map with highlighted time zones
- [ ] Analog clock display option
- [ ] Weather for each time zone
- [ ] Sunrise/sunset times
- [ ] City landmarks display
- [ ] Timer and stopwatch
- [ ] Alarm functionality
- [ ] Multiple languages
- [ ] Timezone meeting scheduler
- [ ] Time zone comparison

## License

MIT License - Free to use and modify

## Support

For issues or feature requests, please open a GitHub issue.

---

**Made with ❤️ by SmartPeak Team**
