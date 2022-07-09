

async function getLocation(){
    const positon = await new Promise((resolve,reject)=>{
        navigator.geolocation.getCurrentPosition(resolve,reject);
    });
    return[positon.coords.latitude, positon.coords.longitude];
    
}
window.onload = async function(){
    const cords = await getLocation();
    var map = L.map('map').setView([cords[0], cords[1]], 13);
    console.log(cords); 
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
}).addTo(map);
var marker = L.marker([cords[0], cords[1]]).addTo(map);
marker.bindPopup("<b>Hello!</b><br>You are here.").openPopup()
}

document.getElementById("submit").addEventListener('click', async (e)=>{
    e.preventDefault();
    let business = document.getElementById('choose').value;
    console.log(business)
})


//initialize intial quordinats

// var map = L.map('map').setView([51.505, -0.09], 13);

//adds the tile layer
// L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//     maxZoom: 19,
//     attribution: '© OpenStreetMap'
// }).addTo(map);

//generate a marker
// var marker = L.marker([51.5, -0.09]).addTo(map);
// //bind a pop up to marker
// marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();