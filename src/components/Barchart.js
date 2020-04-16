import React from "react";
import { VictoryBar, VictoryChart, VictoryAxis, VictoryLegend } from "victory";

class Barchart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        { index: 1, label: "Engineering", value: 7 },
        { index: 2, label: "Doctor", value: 15 },
        { index: 3, label: "Pilots", value: 10 },
        { index: 4, label: "Consultant", value: 1 },
      ],
    };
  }

  render() {
    const dim = { h: 200, w: 450, legend_w: 80, legend_h: 50 };
    const chartPalette = [
      "#093959",
      "#0f3883",
      "#246195",
      "#427aa1",
      "#7a99b8",
    ];

    const legends = this.state.data.map((datum) => {
      return { name: datum.label, symbol: { fill: chartPalette[datum.index] } };
    });

    return (
      <VictoryChart height={dim.h} width={dim.w} domainPadding={{ x: [15, 0] }}>
        <VictoryAxis dependentAxis />
        <VictoryAxis tickFormat={() => ""} />
        <VictoryBar
          data={this.state.data}
          alignment="middle"
          x="index"
          y="value"
          horizontal
          labels={({ datum }) => datum.value}
          style={{
            data: {
              fill: ({ datum }) => {
                return chartPalette[datum.index];
              },
            },
          }}
        />
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

export default Barchart;
