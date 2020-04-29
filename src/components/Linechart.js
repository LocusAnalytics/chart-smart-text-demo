import React from "react";
import LinechartForm from "./LinechartForm";
import { VictoryLine, VictoryChart, VictoryAxis, VictoryLegend } from "victory";
import Text from "./Text";

class Linechart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data,
    };
    this.updateData = this.updateData.bind(this);
    this.addYear = this.addYear.bind(this);
  }

  updateData(index, newSeries) {
    let oldData = this.state.data;
    let newData = oldData.map((datum) => {
      if (datum.index === index) {
        return { ...datum, series: newSeries };
      } else {
        return datum;
      }
    });
    this.setState({ data: newData });
  }

  addYear() {
    let oldData = this.state.data;
    let oldYearMax = Math.max(...oldData[0].series.map((item) => item.x));
    let newData = oldData.map((datum) => {
      return {
        index: datum.index,
        label: datum.label,
        series: [...datum.series, { x: oldYearMax + 1, y: 0 }],
      };
    });
    this.setState({ data: newData });
  }

  render() {
    const dim = { h: 200, w: 450, legend_w: 80, legend_h: 50 };
    const chartPalette = ["orange", "orange", "red", "teal", "turquoise"];
    const legends = this.state.data.map((datum) => {
      return { name: datum.label, symbol: { fill: chartPalette[datum.index] } };
    });

    return (
      <div>
        <VictoryChart height={dim.h} width={dim.w}>
          <VictoryAxis
            tickValues={this.state.data[0].series.map((item) => item.x)}
          />
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
            style={{ border: { stroke: null }, labels: { fontSize: 10 } }}
            data={legends}
          />
        </VictoryChart>
        <LinechartForm
          data={this.state.data}
          updateData={this.updateData}
          addYear={this.addYear}
        />
        <Text data={this.state.data} chartType={this.props.chartType} />
      </div>
    );
  }
}

export default Linechart;
