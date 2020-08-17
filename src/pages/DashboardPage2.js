import React from "react";
import { Col } from "antd";
import ChartRenderer from "../components/ChartRenderer";
import Dashboard from "../components/Dashboard";
import DashboardItem from "../components/DashboardItem";
var now = new Date();
console.log(now);
const DashboardItems = [
  {
    id: 0,
    name: "Evolucion de la velocidad a lo largo del tiempo",
    vizState: {
      query: {
        measures: ["Velocidad.velocidad"],
        timeDimensions: [
          {
            dimension: "Velocidad.fechahora",
            dateRange: "Today"
          }
        ],
        dimensions: ["Velocidad.fechahora"],
        filters: [
          {
            dimension: "Velocidad.usuario",
            operator: "equals",
            values: ["1"]
          }
        ],
        order: {
          "Velocidad.fechahora": "asc"
        }
      },
      chartType: "line"
    }
  },
  {
    id: 1,
    name: "Evolucion de la bateria a lo largo del tiempo",
    vizState: {
      query: {
        measures: ["Bateria.bateriaActual"],
        timeDimensions: [
          {
            dimension: "Bateria.fechahora",
            dateRange: "Today"
          }
        ],
        dimensions: ["Bateria.fechahora"],
        filters: [
          {
            dimension: "Bateria.usuario",
            operator: "equals",
            values: ["1"]
          }
        ],
        order: {
          "Bateria.fechahora": "asc"
        }
      },
      chartType: "line"
    }
  },
];

const DashboardPage2 = () => {
  const dashboardItem = item => (
    <Col
      span={24}
      lg={12}
      key={item.id}
      style={{
        marginBottom: "24px"
      }}
    >
      <DashboardItem title={item.name}>
        <ChartRenderer vizState={item.vizState} />
      </DashboardItem>
    </Col>
  );

  const Empty = () => (
    <div
      style={{
        textAlign: "center",
        padding: 12
      }}
    >
      <h2>
        There are no charts on this dashboard. Use Playground Build to add one.
      </h2>
    </div>
  );

  return DashboardItems.length ? (
    <Dashboard dashboardItems={DashboardItems}>
      {DashboardItems.map(dashboardItem)}
    </Dashboard>
  ) : (
    <Empty />
  );
};

export default DashboardPage2;
