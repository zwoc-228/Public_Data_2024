document.addEventListener('DOMContentLoaded', function() {
    mapboxgl.accessToken = 'pk.eyJ1IjoiendvYyIsImEiOiJjbHU3c24wZXIwM21hMmpwNnhmMTJkOTZvIn0.RW_k2Lezha_QbHUHQQ-ZBg';
    const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/zwoc/cluskgdki001h01qthpnd79fg',
        center: [-98, 40],
        zoom: 3
    });


    map.on('load', function() {
        map.addSource('railways', {
            type: 'geojson',
            data: 'ALL2.geojson'
        });
        map.addLayer({
            'id': 'railway-layer',
            'type': 'line',
            'source': 'railways',
            'layout': {
                'line-cap': 'round',
                'line-join': 'round'
            },
            'paint': {
                'line-color': '#ff0000',
                'line-width': 3
            },
            'filter': ['<=', ['get', 'InOpBy'], 1829]
        });

        generateTimeline();
    });

    function generateTimeline() {
        const ticksContainer = document.getElementById('ticks');
        const yearRange = document.getElementById('yearRange');
        const tickCount = 6;
        const yearStep = (parseInt(yearRange.max) - parseInt(yearRange.min)) / tickCount;

        for (let i = 0; i <= tickCount; i++) {
            const tickValue = parseInt(yearRange.min) + i * yearStep;
            const tickLabel = document.createElement('div');
            tickLabel.className = 'tick-label';
            tickLabel.style.left = `${(i / tickCount) * 100}%`;
            tickLabel.textContent = tickValue;
            ticksContainer.appendChild(tickLabel);

            const yearBlock = document.createElement('div');
            yearBlock.className = 'year-block';
            yearBlock.style.left = `${(i / tickCount) * 100}%`;
            yearBlock.style.width = `${(1 / tickCount) * 100}%`;
            ticksContainer.appendChild(yearBlock);
        }
    }

    document.getElementById('yearRange').addEventListener('change', function() {
        const year = parseInt(this.value, 10);
        map.setFilter('railway-layer', ['<=', ['get', 'InOpBy'], year]);
    });
});
