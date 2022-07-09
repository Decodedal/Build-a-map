const myMap = {
   coordinates: [],
    stores:[],
    map: {},
	markers: {},

    buildMap() {
		this.map = L.map('map', {
		center: this.coordinates,
		zoom: 11,
		});
		// add openstreetmap tiles
		L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
		attribution:
			'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
		minZoom: '15',
		}).addTo(this.map)
		// create and add geolocation marker
		const marker = L.marker(this.coordinates)
		marker
		.addTo(this.map)
		.bindPopup('<p1><b>You are here</b><br></p1>')
		.openPopup()
	},
    //loop through stores and add markes with pop ups for each
    addMarkers(){
    for (i = 0; i<this.stores.length; i++){
           this.markers = L.marker([
            this.stores[i].lat,
            this.stores[i].long,
           ])
           .bindPopup(`<p1>${this.stores[i].name}</p1>`)
           .addTo(this.map)
           console.log(this.markers)
       
}
}
}
//retreve users location
async function getLocation(){
    const positon = await new Promise((resolve,reject)=>{
        navigator.geolocation.getCurrentPosition(resolve,reject);
    });
    return[positon.coords.latitude, positon.coords.longitude];
    
}
//build map when window loads after getting users location 
window.onload = async function(){
    const cords = await getLocation();
    myMap.coordinates = cords
    myMap.buildMap()

}
//fetch data from FourSquare api pare as json and isolate what we need
async function getFoursquare(venue){
    const options = {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization: 'fsq31lbu8w/izI8ISLFZg6OVRq1pMdiwyGtVmJialHes2cY='
        }
      };
       let lat = myMap.coordinates[0]
       let lon = myMap.coordinates[1]
     let data =  await fetch(`https://api.foursquare.com/v3/places/search?query=${venue}&ll=${lat}%2C${lon}&limit=5`, options)
        response = await data.json()
         let targetArr = response.results
    
         return targetArr
     
         }
//further refine information just getting name latitude and longitude
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


//button event that gets bussnes type from user then passes the information to the fetch request and map object
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




         




