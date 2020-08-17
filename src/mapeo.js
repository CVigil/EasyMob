


import cubejs from "@cubejs-client/core";
//import position from "./pages/Mapa2"

var position=require("./pages/Mapa2");
//var position = [40.332462, -3.765399];
var now = new Date();
console.log(now);

// initialize cubejs instance with API Token and API URL
const cubejsApi = cubejs(
  "263c2d7449e254865cbe3b09a016566570fefce2976ad903e5a02bf3232360053669ff3fc9653276b01a0016921d80328a2506d03ffea1cceadce76e2c1d5287",
  { apiUrl: "http://163.117.154.112:4000/cubejs-api/v1" }
);

console.log("me estoy ejecutando");

cubejsApi
  .load({
    measures: ["Posicion.latitud", "Posicion.longitud", "Posicion.altitud"],
    timeDimensions: [],
    dimensions: ["Posicion.fechahora"],
    filters: [
      {
        dimension: "Posicion.usuario",
        operator: "equals",
        values: ["1"],
      },
    ],
    limit: 1,
    order: {
      "Posicion.fechahora": "desc",
    },
  })
  .then((resultSet) => {
    //console.log(resultSet.loadResponse.data[0]);
    var latitudOriginal = resultSet.loadResponse.data[0]["Posicion.latitud"];
    var longitudOriginal = resultSet.loadResponse.data[0]["Posicion.longitud"];
    var altitudOriginal = resultSet.loadResponse.data[0]["Posicion.altitud"];
    console.log(
      "Lat: " +
        latitudOriginal +
        " Long: " +
        longitudOriginal +
        " Alt: " +
        altitudOriginal
    );

    var latitud =
      parseFloat(
        latitudOriginal
          .toString()
          .slice(0, latitudOriginal.toString().indexOf(".") - 2)
      ) +
      parseFloat(
        latitudOriginal
          .toString()
          .slice(latitudOriginal.toString().indexOf(".") - 2)
      ) /
        (latitudOriginal.toString()[0] == "-" ? -60 : 60);
    var longitud =
      parseFloat(
        longitudOriginal
          .toString()
          .slice(0, longitudOriginal.toString().indexOf(".") - 2)
      ) +
      parseFloat(
        longitudOriginal
          .toString()
          .slice(longitudOriginal.toString().indexOf(".") - 2)
      ) /
        (longitudOriginal.toString()[0] == "-" ? -60 : 60);
    
    console.log(latitud + "," + longitud);

    position = [latitud, longitud];

    //var mapita = document.getElementsByClassName("openlayers-map")[0];
    //mapita.id = "map";
    //console.log(mapita);
    /*mapita.setView(new ol.View({
      center: ol.proj.fromLonLat([position[1], position[0]]),
      zoom: 1,
    }));*/
  });