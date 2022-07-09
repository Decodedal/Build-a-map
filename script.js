const myMap = {
   coordinates: [],
    stores:[],
    map: {},
	markers: {},

buildMap(cords){
var map = L.map('map').setView(cords, 13);
console.log(cords); 
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
maxZoom: 19,
attribution: '© OpenStreetMap'
}).addTo(map);
var marker = L.marker(cords).addTo(map);
marker.bindPopup("<b>Hello!</b><br>You are here.").openPopup()
},
addMarkers(){
    for (i = 0; i<this.stores.length; i++){
           this.markers = L.marker([
            this.stores[i].lat,
            this.stores[i].long,
           ])
           .bindPopup(`<p1>${this.stores[i].name}</p1>`)
           .addTo(this.map)
       
}
}
}

async function getLocation(){
    const positon = await new Promise((resolve,reject)=>{
        navigator.geolocation.getCurrentPosition(resolve,reject);
    });
    return[positon.coords.latitude, positon.coords.longitude];
    
}
window.onload = async function(){
    const cords = await getLocation();
    myMap.buildMap(cords)

}

function processBusinesses(data) {
	let store = data.map((element) => {
		let location = {
			name: element.name,
			lat: element.geocodes.main.latitude,
			long: element.geocodes.main.longitude
		};
		console.log(location)
        return location
	})
    console.log(store)
	return store
}



document.getElementById("submit").addEventListener('click', async (e)=>{
    e.preventDefault();
    let business = document.getElementById('choose').value;
    // console.log(business)

     let data = await getFoursquare(business)  
    //  myMap.addMarkers(data)
    processBusinesses(data)
    myMap.stores = processBusinesses(data)
    myMap.addMarkers()

})



async function getFoursquare(venue){
    const options = {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization: 'fsq31lbu8w/izI8ISLFZg6OVRq1pMdiwyGtVmJialHes2cY='
        }
      };
      
     let data =  await fetch(`https://api.foursquare.com/v3/places/search?query=${venue}&ll=40.74%2C-73.75&limit=5`, options)
        response = await data.json()
         let targetArr = response.results
    
         return targetArr
     
         }
         