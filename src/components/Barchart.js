import React from "react";
import { VictoryBar, VictoryChart, VictoryAxis } from "victory";

class Barchart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      markers: [
        { fm: "dummy", estab: 1 },
        { fm: "Engineering", estab: 7 },
        { fm: "Doctor", estab: 15 },
        { fm: "Pilots", estab: 10 },
        { fm: "Consultant", estab: 1 },
      ],
    };
  }

  render() {
    const chartPalette = [
      "#093959",
      "#0f3883",
      "#246195",
      "#427aa1",
      "#7a99b8",
    ];

    return (
      <VictoryChart height={250} domainPadding={{ x: [15, 0] }}>
        <VictoryAxis tickFormat={() => ""} />
        <VictoryAxis dependentAxis />
        <VictoryBar
          data={this.state.markers}
          x="name"
          y="estab"
          horizontal
          barWidth={16}
          labels={({ datum }) => datum.fm}
          style={{
            data: {
              fill: ({ datum }) => {
                return chartPalette[datum._x];
              },
            },
          }}
        />
      </VictoryChart>
    );
  }
}

export default Barchart;
