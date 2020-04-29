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
    const dim = { h: 200, w: 450, legend_w: 80, legend_h: 50 };
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

    return (
      <div>
        <VictoryChart
          height={dim.h}
          width={dim.w}
          domainPadding={{ x: [15, 0] }}
        >
          <VictoryAxis dependentAxis />
          <VictoryAxis tickFormat={() => ""} />
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
            }}
          />
          <VictoryLegend
            x={dim.w - dim.legend_w}
            y={5}
            width={dim.legend_w}
            height={dim.legend_h}
            orientation="vertical"
            rowGutter={2}
            style={{ border: { stroke: null }, labels: { fontSize: 10 } }}
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
