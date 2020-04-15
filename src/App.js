import React from "react";
import "./App.css";
import { VictoryBar, VictoryChart, VictoryAxis } from "victory";

function App() {
  return (
    <div className="App">
      <header className="App-header">Smart Text Prototype Demo</header>
      <body>
        <Chart />
      </body>
    </div>
  );
}

export default App;

class Chart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      markers: [
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
      <VictoryChart height={200} domainPadding={{ x: 15 }}>
        <VictoryAxis tickFormat={() => ""} />
        <VictoryAxis dependentAxis />
        <VictoryBar
          data={this.state.markers}
          x="name"
          y="estab"
          horizontal
          barWidth={16}
          labels={({ datum }) => datum.estab}
          style={{
            data: {
              fill: ({ datum }) => chartPalette[datum.index],
            },
          }}
        />
      </VictoryChart>
    );
  }
}
