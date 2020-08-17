
import React, { useEffect, useState } from "react";
import { Col } from "antd";
import ChartRenderer from "../components/ChartRenderer";
import Dashboard from "../components/Dashboard";
import DashboardItem from "../components/DashboardItem";
//import { render } from "react-dom";
import {
  interaction,
  layer,
  custom,
  control, //name spaces
  Interactions,
  Overlays,
  Controls, //group
  Map,
  Layers,
  Overlay,
  Util, //objects
} from "react-openlayers";
//import OSM, { ATTRIBUTION } from "ol/source/OSM";
//import "../mapeo.js";
//import Source from "ol/source/Source";
//import TileGrid from "ol/tilegrid/TileGrid";
//import TileSource from "ol/source/Tile";
import * as ol from "openlayers";
//import { Map, Marker, Popup, TileLayer } from "react-leaflet";
import cubejs from "@cubejs-client/core";
//import echarts from 'echarts';

//var position = [40.332462, -3.765399];


var now = new Date();
console.log(now);

// initialize cubejs instance with API Token and API URL
const cubejsApi = cubejs(
  "263c2d7449e254865cbe3b09a016566570fefce2976ad903e5a02bf3232360053669ff3fc9653276b01a0016921d80328a2506d03ffea1cceadce76e2c1d5287",
  { apiUrl: "http://163.117.154.112:40000/cubejs-api/v1" }
);

var origen = new ol.source.OSM();

const DashboardItems = [{}];
const Mapa2 = () => {

  //this.state = {posicion:[40.332462, -3.765399]};  
  const [posicion,setPosicion] = useState([40.332462, -3.765399]);
  console.log("*****"+posicion);



  const dashboardItem = (item) => (
    <Col
      span={24}
      lg={12}
      key={item.id}
      style={{
        marginBottom: "24px",
      }}
    >
      <DashboardItem title={item.name}>
        <Map
          id="map"
          view={{
            center: ol.proj.fromLonLat([posicion[1],posicion[0]]),
            zoom: 18,
          }}
        >
          <Layers>
            <layer.Tile source={origen} />
          </Layers>
          <Controls attribution={false} zoom={true}>
            <control.Rotate />
            <control.ScaleLine />
            <control.FullScreen />
            <control.OverviewMap />
            <control.ZoomSlider />
            <control.Zoom />
          </Controls>
        </Map>
      </DashboardItem>
    </Col>
  );

  const Empty = () => (
    <div
      style={{
        textAlign: "center",
        padding: 12,
      }}
    >
      <h2>No mapa</h2>
    </div>
  );

  //useEffect(() => {
    console.log("calculando coordenadas");
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
        var latitudOriginal =
          resultSet.loadResponse.data[0]["Posicion.latitud"];
        var longitudOriginal =
          resultSet.loadResponse.data[0]["Posicion.longitud"];
        var altitudOriginal =
          resultSet.loadResponse.data[0]["Posicion.altitud"];
        /*console.log(
          "Lat: " +
            latitudOriginal +
            " Long: " +
            longitudOriginal +
            " Alt: " +
            altitudOriginal
        );*/

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

        //console.log(latitud + "," + longitud);

        //position = [latitud, longitud];
        //console.log("/////"+ latitud+","+longitud+"       "+posicion);
        //console.log(latitud != posicion[0] & longitud != posicion[1]);
        if (latitud != posicion[0] & longitud != posicion[1] & !isNaN(latitud) & !isNaN(longitud) ) {
          setPosicion([latitud, longitud]);
        }
        //setPosicion([latitud, longitud]);
        
        //var mapita = document.getElementsByClassName("openlayers-map")[0];
        //mapita.id = "map";
        //console.log(mapita);
        //mapita.setView(new ol.View({
        //  center: ol.proj.fromLonLat([position[1], position[0]]),
        //  zoom: 1,
        //}));
      });
  //});

  return DashboardItems.length ? (
    <Dashboard dashboardItems={DashboardItems}>
      {DashboardItems.map(dashboardItem)}
    </Dashboard>
  ) : (
    <Empty />
  );
};

export default Mapa2;
