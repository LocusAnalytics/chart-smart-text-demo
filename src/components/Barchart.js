import React from "react";
import { VictoryBar, VictoryChart, VictoryAxis, VictoryLegend } from "victory";
import BarchartForm from "./BarchartForm";
import Text from "./Text";
class Barchart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data,
    };
    this.updateData = this.updateData.bind(this);
  }

  updateData(index, newVal) {
    let oldData = this.state.data;
    let newData = oldData.map((datum) => {
      if (datum.index === index) {
        return { ...datum, val: newVal };
      } else {
        return datum;
      }
    });
    this.setState({ data: newData });
  }

  render() {
    const dim = { h: 180, w: 350, legend_w: 50, legend_h: 20 };
    const chartPalette = [
      "#093959",
      "#0f3883",
      "#246195",
      "#427aa1",
      "#7a99b8",
    ];

    const legends = this.state.data.map((datum) => {
      return { name: datum.name, symbol: { fill: chartPalette[datum.index] } };
    });

    const fontSize = 8;
    const axisStyle = { tickLabels: { fontSize: fontSize } };
    const legendStyle = {
      border: { stroke: null },
      labels: { fontSize: fontSize },
    };

    return (
      <div>
        <VictoryChart
          height={dim.h}
          width={dim.w}
          domainPadding={{ x: [5, 0] }}
        >
          <VictoryAxis dependentAxis style={axisStyle} />
          <VictoryAxis tickFormat={() => ""} style={axisStyle} />
          <VictoryBar
            data={this.state.data}
            alignment="middle"
            x="name"
            y="val"
            labels={({ datum }) => {
              return datum.val;
            }}
            horizontal
            style={{
              data: {
                fill: ({ datum }) => {
                  return chartPalette[datum.index];
                },
              },
              labels: { fontSize: fontSize },
            }}
          />
          <VictoryLegend
            x={dim.w - dim.legend_w}
            y={5}
            width={dim.legend_w}
            height={dim.legend_h}
            orientation="vertical"
            rowGutter={2}
            style={legendStyle}
            data={legends}
          />
        </VictoryChart>
        <BarchartForm data={this.state.data} updateData={this.updateData} />
        National Average: {this.props.chartProperties.nationAvg}
        <Text
          data={this.state.data}
          chartType={this.props.chartType}
          chartProperties={this.props.chartProperties}
        />
      </div>
    );
  }
}

export default Barchart;
