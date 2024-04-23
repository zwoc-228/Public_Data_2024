mapboxgl.accessToken = 'pk.eyJ1IjoiendvYyIsImEiOiJjbHU3c24wZXIwM21hMmpwNnhmMTJkOTZvIn0.RW_k2Lezha_QbHUHQQ-ZBg';
const startYear = 1830;
const endYear = 1920;
let currentYear = startYear;

const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/zwoc/clvbn0sy800zg01qlcfyadbrz',
    center: [-98, 40],
    zoom: 4,
    scrollZoom: false
});

let dataFeatures = [];

map.on('load', () => {
    fetch('1.json')  // Assumes '1.json' is your GeoJSON file with all the historical data
        .then(response => response.json())
        .then(data => {
            dataFeatures = data.features;

            map.addSource('railways', {
                type: 'geojson',
                data: {
                    type: 'FeatureCollection',
                    features: []
                }
            });

            map.addLayer({
                'id': 'railway-animation',
                'type': 'line',
                'source': 'railways',
                'layout': {
                    'line-cap': 'round',
                    'line-join': 'round'
                },
                'paint': {
                    'line-color': '#ed6498',
                    'line-width': 3,
                    'line-opacity': 0.8
                }
            });

            updateMapWithYearData(currentYear); // Initial load
            setupTimeline();  // Set up the timeline after the map has loaded
        });
});

window.addEventListener("wheel", function(e) {
    e.preventDefault(); // Prevent scrolling
    let yearChange = e.deltaY > 0 ? 1 : -1;
    let newYear = currentYear + yearChange;
    if (newYear >= startYear && newYear <= endYear) {
        currentYear = newYear;
        updateMapWithYearData(currentYear);
        highlightCurrentYear(currentYear);
    }
});

function updateMapWithYearData(year) {
    const yearlyData = dataFeatures.filter(feature => feature.properties.InOpBy === year);
    const source = map.getSource('railways');
    if (source) {
        source.setData({
            type: 'FeatureCollection',
            features: yearlyData
        }); // Update map data to display current year data
    }
}

function setupTimeline() {
    const timeline = document.getElementById('timeline');
    for (let year = startYear; year <= endYear; year += 10) {  // Create markers every 10 years
        const marker = document.createElement('div');
        marker.classList.add('year-marker');
        marker.textContent = year;
        marker.onclick = () => {
            currentYear = year;
            updateMapWithYearData(currentYear);
            highlightCurrentYear(currentYear);
        };
        timeline.appendChild(marker);
    }
}

function highlightCurrentYear(year) {
    document.querySelectorAll('.year-marker').forEach(marker => {
        marker.classList.remove('active');
        if (marker.textContent == year.toString()) {
            marker.classList.add('active');
        }
    });
}
