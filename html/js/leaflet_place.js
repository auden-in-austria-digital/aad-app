var leaflet = document.getElementById("single-place-leaflet");
leaflet.style.height = "400px";
var lat = document.getElementById("latitude").innerHTML;
var long = document.getElementById("longitude").innerHTML;
var mymap = L.map(leaflet).setView([lat, long], 13);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    'Map data &amp;copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.openstreetmap.org/">OpenStreetMap</a>',
  maxZoom: 18,
  zIndex: 1,
}).addTo(mymap);

L.marker([lat, long]).addTo(mymap);
