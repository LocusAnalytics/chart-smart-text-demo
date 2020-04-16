import React from "react";
import { VictoryLine, VictoryChart, VictoryAxis, VictoryLegend } from "victory";

class Linechart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          index: 1,
          label: "Engineering",
          series: [
            { x: 2006, y: 2 },
            { x: 2007, y: 3 },
            { x: 2005, y: 1 },
          ],
        },
        {
          index: 2,
          label: "Doctor",
          series: [
            { x: 2005, y: 4 },
            { x: 2006, y: 3 },
            { x: 2007, y: 2 },
          ],
        },
        {
          index: 3,
          label: "Pilot",
          series: [
            { x: 2006, y: 6 },
            { x: 2007, y: 3 },
            { x: 2005, y: 7 },
          ],
        },
        {
          index: 4,
          label: "Consultant",
          series: [
            { x: 2005, y: 2 },
            { x: 2006, y: 1 },
            { x: 2007, y: 5 },
          ],
        },
      ],
    };
  }

  render() {
    const dim = { h: 200, w: 450, legend_w: 80, legend_h: 50 };
    const chartPalette = ["orange", "orange", "red", "teal", "turquoise"];
    const legends = this.state.data.map((datum) => {
      return { name: datum.label, symbol: { fill: chartPalette[datum.index] } };
    });

    return (
      <VictoryChart height={dim.h} width={dim.w}>
        <VictoryAxis tickValues={[2005, 2006, 2007]} />
        <VictoryAxis dependentAxis />
        {this.state.data.map((datum) => {
          return (
            <VictoryLine
              key={datum.index}
              style={{
                data: { stroke: chartPalette[datum.index] },
              }}
              data={datum.series}
            />
          );
        })}
        <VictoryLegend
          x={dim.w - dim.legend_w}
          y={5}
          width={dim.legend_w}
          height={dim.legend_h}
          orientation="vertical"
          rowGutter={2}
          style={{ border: { stroke: null }, title: { fontSize: 5 } }}
          data={legends}
        />
      </VictoryChart>
    );
  }
}

export default Linechart;
