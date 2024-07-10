//—Ctrl + / on Windows
var first_image = ee.Image( 
'LANDSAT/LT05/C02/T1_L2/LT05_118038_20000606'); 
print(first_image); 

// Map.addLayer( 
// first_image, //  dataset to display 
// { 
// bands: ['SR_B1'], //  band to display 
// min: 8000, //  display range  
// max: 17000 
// }, 
// 'Layer 1' //  name to show in Layer Manager 
// );
// Map.addLayer( 
// first_image, 
// { 
// bands: ['SR_B2'], 
// min: 8000, 
// max: 17000 
// }, 
// 'Layer 2', 
// 0, //  shown 
// 1 //  opacity 
// ); 
// Map.addLayer( 
// first_image, 
// { 
// bands: ['SR_B3'], 
// min: 8000, 
// max: 17000 
// }, 
// 'Layer 3', 
// 1, //  shown 
// 0 //  opacity 
// );
// Map.addLayer( 
// first_image, 
// { 
// bands: ['SR_B3', 'SR_B2', 'SR_B1'], 
// min: 8000, 
// max: 17000 
// }, 
// 'Natural Color'); 
// Map.addLayer( 
// first_image, 
// { 
// bands: ['SR_B4', 'SR_B3', 'SR_B2'], 
// min: 8000, 
// max: 17000 
// }, 
// 'False Color');
// Map.addLayer( 
// first_image, 
// { 
// bands: ['SR_B5', 'SR_B4', 'SR_B2'], 
// min: 8000, 
// max: 17000 
// }, 
// 'Short wave false color');

var lights93 = ee.Image('NOAA/DMSP-OLS/NIGHTTIME_LIGHTS/F101993'); 
print('Nighttime lights', lights93); 
Map.addLayer( 
lights93, 
{ 
bands: ['stable_lights'], 
min: 0, 
max: 63 
}, 
'Lights'); 

 var lights03 = ee.Image('NOAA/DMSP-OLS/NIGHTTIME_LIGHTS/F152003') 
.select('stable_lights').rename('2003'); 
var lights13 = ee.Image('NOAA/DMSP-OLS/NIGHTTIME_LIGHTS/F182013') 
.select('stable_lights').rename('2013'); 
var changeImage = lights13.addBands(lights03) 
.addBands(lights93.select('stable_lights').rename('1993')); 
print('change image', changeImage); 
Map.addLayer( 
changeImage, 
{ 
min: 0, 
max: 63 
}, 
'Change composite'); 

//// https://code.earthengine.google.com/?accept_repo=projects/gee-edu/book
 ///// 
// View an Image Collection 
///// 
// Import the Landsat 8 Raw Collection. 
var landsat8 = ee.ImageCollection('LANDSAT/LC08/C02/T1'); 
// Print the size of the Landsat 8 dataset. 
print('The size of the Landsat 8 image collection is:', landsat8 .size()); 
// Try to print the image collection. 
// WARNING! Running the print code immediately below 
//produces an error because 
// the Console can not print more than 5000 elements. 
print(landsat8); 
// Add the Landsat 8 dataset to the map as a mosaic. The 
//collection is 
// already chronologically sorted, so the most recent pixel 
//is displayed. 
Map.addLayer(landsat8, 
{ 
bands: ['B4', 'B3', 'B2'], 
min: 5000, 
max: 15000 
}, 
'Landsat 8 Image Collection'); 

// Filter an Image Collection 
///// 
// Filter the collection by date. 

var landsatWinter = landsat8.filterDate('2020-12-01', 
'2021-03-01'); 
Map.addLayer(landsatWinter, 
{ 
bands: ['B4', 'B3', 'B2'], 
min: 5000, 
max: 15000 
}, 
'Winter Landsat 8'); 
print('The size of the Winter Landsat 8 image collection is:', landsatWinter.size());


// Create an Earth Engine Point object. 
var pointMN = ee.Geometry.Point([-93.79, 45.05]); 
// Filter the collection by location using the point. 
var landsatMN = landsatWinter.filterBounds(pointMN); 
Map.addLayer(landsatMN, 
{ 
bands: ['B4', 'B3', 'B2'], 
min: 5000, 
max: 15000 
}, 
'MN Landsat 8'); 
// Add the point to the map to see where it is. 
Map.addLayer(pointMN, {}, 'Point MN'); 
print('The size of the Minneapolis Winter Landsat 8 image collection is: ', 
landsatMN.size());

 // Select the first image in the filtered collection. 
var landsatFirst = landsatMN.first(); 
// Display the first image in the filtered collection. 
Map.centerObject(landsatFirst, 7); 
Map.addLayer(landsatFirst, 
{ 
bands: ['B4', 'B3', 'B2'], 
min: 5000, 
max: 15000 
}, 
'First Landsat 8');

///// 
// Collections of single images - Landsat 8 Surface Reflectance 
///// 
// Create and Earth Engine Point object over San Francisco. 
var pointSF = ee.Geometry.Point([-122.44, 37.76]); 
// Import the Landsat 8 Surface Reflectance collection. 
var landsat8SR = ee.ImageCollection('LANDSAT/LC08/C02/T1_L2'); 
// Filter the collection and select the first image. 
var landsat8SRimage = landsat8SR.filterDate('2014-03-18', 
'2014-03-19') 
.filterBounds(pointSF) 
.first(); 
print('Landsat 8 Surface Reflectance image', landsat8SRimage);

// Center map to the first image. 
Map.centerObject(landsat8SRimage, 8); 
 
// Add first image to the map. 
Map.addLayer(landsat8SRimage, 
    { 
        bands: ['SR_B4', 'SR_B3', 'SR_B2'], 
        min: 7000, 
        max: 13000 
    }, 
    'Landsat 8 SR'); 
    
     ///// 
// Pre-made composites 
///// 
// Import a MODIS dataset of daily BRDF-corrected 
//reflectance. 
var modisDaily = ee.ImageCollection('MODIS/006/MCD43A4'); 
// Filter the dataset to a recent date. 
var modisDailyRecent = modisDaily.filterDate('2021-11-01'); 
// Add the dataset to the map. 
var modisVis = { 
bands: [ 
'Nadir_Reflectance_Band1', 
'Nadir_Reflectance_Band4', 
'Nadir_Reflectance_Band3' 
], 
min: 0, 
max: 4000 
}; 
Map.addLayer(modisDailyRecent, modisVis, 'MODIS Daily Composite');

// Import the MODIS monthly burned areas dataset. 
var modisMonthly = ee.ImageCollection('MODIS/006/MCD64A1'); 
// Filter the dataset to a recent month during fire season. 
var modisMonthlyRecent = modisMonthly.filterDate('2021-08-01'); 
// Add the dataset to the map. 
Map.addLayer(modisMonthlyRecent, {}, 'MODIS Monthly Burn'); 

 ///// 
// Other satellite products 
///// 
// Import a Sentinel-5 methane dataset. 
var methane = 
ee.ImageCollection('COPERNICUS/S5P/OFFL/L3_CH4'); 
// Filter the methane dataset. 
var methane2018 = methane.select( 
'CH4_column_volume_mixing_ratio_dry_air') 
.filterDate('2018-11-28', '2018-11-29') 
.first(); 
// Make a visualization for the methane data. 
var methaneVis = { 
palette: ['black', 'blue', 'purple', 'cyan', 'green', 
'yellow', 'red' 
], 
min: 1770, 
max: 1920 
}; 

// Center the Map. 
Map.centerObject(methane2018, 3); 
// Add the methane dataset to the map. 
Map.addLayer(methane2018, methaneVis, 'Methane'); 

// Import the ERA5 Monthly dataset 
var era5Monthly = ee.ImageCollection('ECMWF/ERA5/MONTHLY'); 
// Filter the dataset 
var era5MonthlyTemp = 
era5Monthly.select('mean_2m_air_temperature') 
.filterDate('2018-01-01', '2019-01-31') 
.first(); 
// Add the ERA dataset to the map.                  
Map.addLayer(era5MonthlyTemp, 
{ 
palette: ['yellow', 'red'], 
min: 260, 
max: 320 
}, 
'ERA5 Max Monthly Temp'); 

///// 
// Pre-classified Land Use Land Cover 
///// 
// Import the ESA WorldCover dataset. 
var worldCover = 
ee.ImageCollection('ESA/WorldCover/v100').first(); 
// Center the Map. 
Map.centerObject(worldCover, 3); 
// Add the worldCover layer to the map. 
Map.addLayer(worldCover, { 
bands: ['Map'] 
}, 'WorldCover'); 

// Import the Hansen Global Forest Change dataset. 
var globalForest = ee.Image( 
'UMD/hansen/global_forest_change_2020_v1_8'); 
// Create a visualization for tree cover in 2000. 
var treeCoverViz = { 
bands: ['treecover2000'], 
min: 0, 
max: 100, 
palette: ['black', 'green'] 
}; 
// Add the 2000 tree cover image to the map. 
Map.addLayer(globalForest, treeCoverViz, 'Hansen 2000 Tree Cover'); 

//Create a visualization for the year of tree loss over 
//the past 20 years. 
var treeLossYearViz = { 
bands: ['lossyear'], 
min: 0, 
max: 20, 
palette: ['yellow', 'red'] 
}; 
// Add the 2000-2020 tree cover loss image to the map. 
Map.addLayer(globalForest, treeLossYearViz, '2000-2020 Year of Loss'); 

 ///// 
// Other datasets 
///// 
// Import and filter a gridded population dataset. 
var griddedPopulation = ee.ImageCollection( 
'CIESIN/GPWv411/GPW_Population_Count') 
.first(); 
// Predefined palette. 
var populationPalette = [ 
'ffffe7', 
'86a192', 
'509791', 
'307296', 
'2c4484', 
'000066' 
]; 
// Center the Map. 
Map.centerObject(griddedPopulation, 3); 
// Add the population data to the map. 
Map.addLayer(griddedPopulation, 
{ 
min: 0, 
max: 1200, 
'palette': populationPalette 
}, 
'Gridded Population');

// Import the NASA DEM Dataset. 
var nasaDEM = ee.Image('NASA/NASADEM_HGT/001'); 
// Add the elevation layer to the map. 
Map.addLayer(nasaDEM, { 
bands: ['elevation'], 
min: 0, 
max: 3000 
}, 'NASA DEM');