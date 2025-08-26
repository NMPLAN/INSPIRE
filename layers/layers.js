var wms_layers = [];

var lyr_OpenStreetMap = new ol.layer.Tile({
            'title': 'OpenStreetMap',
            'baseLayer':'true',
            'opacity': 1.000000,
            
            
            source: new ol.source.XYZ({
            attributions: ' ',
                url: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png'
            })
        });
        

var lyr_NMINSPIRE = new ol.layer.Vector({
    title: '<div class="roller-switcher"></div> NMINSPIRE',
    source: new ol.source.Vector(), 
    declutter: false,
    style: style_NMINSPIRE,
    permalink: "NMINSPIRE",
    popuplayertitle: 'NM INSPIRE',
    creationdate: '2025-08-26 14:41:19',
    interactive: false,
});
function load_NMINSPIRE_data() {
    var format_NMINSPIRE = new ol.format.GeoJSON();
    var features_NMINSPIRE = format_NMINSPIRE.readFeatures(json_NMINSPIRE, 
    {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
    var jsonSource_NMINSPIRE = new ol.source.Vector({
    attributions: '<a class="legend"><img src="styles/legend/NMINSPIRE.png" /> <b>NM INSPIRE</b>'
    });
    lyr_NMINSPIRE.setSource(jsonSource_NMINSPIRE);
    lyr_NMINSPIRE.set(
    "title", '<img src="styles/legend/NMINSPIRE.png" /> NM INSPIRE'
    );
var featureCounter_NMINSPIRE = 1;
jsonSource_NMINSPIRE.on('addfeature', function (event) {
    var feature = event.feature;
    feature.set("idO", featureCounter_NMINSPIRE++);
    feature.set("layerObject", lyr_NMINSPIRE);
});        
jsonSource_NMINSPIRE.addFeatures(features_NMINSPIRE);
}


var lyr_NMOAs386387388 = new ol.layer.Vector({
    title: '<div class="roller-switcher"></div> NMOAs386387388',
    source: new ol.source.Vector(), 
    declutter: false,
    style: style_NMOAs386387388,
    permalink: "NMOAs386387388",
    popuplayertitle: 'NM OAs 386,387, 388',
    creationdate: '2025-08-26 14:41:19',
    interactive: false,
});
function load_NMOAs386387388_data() {
    var format_NMOAs386387388 = new ol.format.GeoJSON();
    var features_NMOAs386387388 = format_NMOAs386387388.readFeatures(json_NMOAs386387388, 
    {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
    var jsonSource_NMOAs386387388 = new ol.source.Vector({
    attributions: '<a class="legend"><img src="styles/legend/NMOAs386387388.png" /> <b>NM OAs 386,387, 388</b>'
    });
    lyr_NMOAs386387388.setSource(jsonSource_NMOAs386387388);
    lyr_NMOAs386387388.set(
    "title", '<img src="styles/legend/NMOAs386387388.png" /> NM OAs 386,387, 388'
    );
var featureCounter_NMOAs386387388 = 1;
jsonSource_NMOAs386387388.on('addfeature', function (event) {
    var feature = event.feature;
    feature.set("idO", featureCounter_NMOAs386387388++);
    feature.set("layerObject", lyr_NMOAs386387388);
});        
jsonSource_NMOAs386387388.addFeatures(features_NMOAs386387388);
}


// Funzione per caricare e aggiornare i layer uno alla volta
    // Array per i layer visibili/non visibili all'avvio (solo layer vettori e raster)
    var layersVisibleOnStart = [
        { layer: lyr_NMINSPIRE, source: 'NMINSPIRE' },
        { layer: lyr_NMOAs386387388, source: 'NMOAs386387388' }
    ];
    var layersHiddenOnStart = [
        
    ];
    // Funzione per caricare il JSON source
    function loadJSON(fileName) {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = `layers/${fileName}.js`; // Percorso del file
            script.onload = () => {
                resolve(fileName);  // Risolviamo la promise passando il nome del file
            };
            script.onerror = (e) => {
                console.error(`Errore nel caricamento di ${fileName}.js:`, e);
                reject(new Error(`Errore nel caricamento di ${fileName}.js`));
            };
            document.head.appendChild(script);
        });
    }
    // Carico i dati nei layer
    async function loadLayers() {
        try {
            // Carica prima i layer visibili all'avvio
            for (const { layer, source } of layersVisibleOnStart) {
                await loadJSON(source);
                // Inietta i dati del layer
                window[`load_${source}_data`]();
            }
            // Carica i layer non visibili all'avvio
            for (const { layer, source } of layersHiddenOnStart) {
                await loadJSON(source);
                // Inietta i dati del layer
                window[`load_${source}_data`]();
            }
            // Quando tutti i layer sono stati caricati e aggiornati, emetti 'layersLoaded'
            window.layersLoadedFlag = true;
            const layersLoaded = new Event('layersLoaded');
            document.dispatchEvent(layersLoaded);
        } catch (error) {
            console.error("Errore nel caricamento dei layer:", error);
            throw error;
        }
    }
    // Esegui il caricamento dei layer una volta che il DOM è pronto
    document.addEventListener("DOMContentLoaded", () => {
        loadLayers();  // Inizia il caricamento dei layer uno per volta
    });

var group_BOUNDARIES = new ol.layer.Group({
                                layers: [lyr_NMOAs386387388,],
                                openInLayerSwitcher: true,
                                title: 'BOUNDARIES'});
var group_LOCATIONS = new ol.layer.Group({
                                layers: [lyr_NMINSPIRE,],
                                openInLayerSwitcher: true,
                                title: 'LOCATIONS'});
var group_BaseMaps = new ol.layer.Group({
                                layers: [lyr_OpenStreetMap,],
                                openInLayerSwitcher: true,
                                title: 'Base Maps'});

lyr_OpenStreetMap.setVisible(true);lyr_NMINSPIRE.setVisible(true);lyr_NMOAs386387388.setVisible(true);
var layersList = [group_BaseMaps,group_LOCATIONS,group_BOUNDARIES];
lyr_NMINSPIRE.set('fieldAliases', {'gml_id': 'gml_id', 'INSPIREID': 'INSPIREID', 'LABEL': 'LABEL', 'NATIONALCADASTRALREFERENCE': 'NATIONALCADASTRALREFERENCE', 'VALIDFROM': 'VALIDFROM', 'BEGINLIFESPANVERSION': 'BEGINLIFESPANVERSION', });
lyr_NMOAs386387388.set('fieldAliases', {'FID': 'FID', 'OA21CD': 'OA21CD', 'LSOA21CD': 'LSOA21CD', 'LSOA21NM': 'LSOA21NM', 'LSOA21NMW': 'LSOA21NMW', 'BNG_E': 'BNG_E', 'BNG_N': 'BNG_N', 'LAT': 'LAT', 'LONG': 'LONG', 'GlobalID': 'GlobalID', });
lyr_NMINSPIRE.set('fieldImages', {'gml_id': 'TextEdit', 'INSPIREID': 'Range', 'LABEL': 'Range', 'NATIONALCADASTRALREFERENCE': 'Range', 'VALIDFROM': 'TextEdit', 'BEGINLIFESPANVERSION': 'TextEdit', 'layerObject': 'Hidden', 'idO': 'Hidden'});
lyr_NMOAs386387388.set('fieldImages', {'FID': 'TextEdit', 'OA21CD': 'TextEdit', 'LSOA21CD': 'TextEdit', 'LSOA21NM': 'TextEdit', 'LSOA21NMW': 'TextEdit', 'BNG_E': 'Range', 'BNG_N': 'Range', 'LAT': 'TextEdit', 'LONG': 'TextEdit', 'GlobalID': 'TextEdit', 'layerObject': 'Hidden', 'idO': 'Hidden'});
lyr_NMINSPIRE.set('fieldLabels', {'gml_id': 'no label', 'INSPIREID': 'inline label - visible with data', 'LABEL': 'no label', 'NATIONALCADASTRALREFERENCE': 'hidden field', 'VALIDFROM': 'no label', 'BEGINLIFESPANVERSION': 'no label', });
lyr_NMOAs386387388.set('fieldLabels', {'FID': 'no label', 'OA21CD': 'no label', 'LSOA21CD': 'no label', 'LSOA21NM': 'no label', 'LSOA21NMW': 'no label', 'BNG_E': 'no label', 'BNG_N': 'no label', 'LAT': 'no label', 'LONG': 'no label', 'GlobalID': 'no label', });
lyr_NMOAs386387388.on('precompose', function(evt) {
    evt.context.globalCompositeOperation = 'normal';
});