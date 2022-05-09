import ResizableBox from "./ResizableBox";
import useDemoConfig from "./useDemoConfig";
import React from "react";
import { AxisOptions, Chart } from "react-charts";

export default function CustomStyles() {
  const [{ activeSeriesIndex, activeDatumIndex }, setState] = React.useState({
    activeSeriesIndex: -1,
    activeDatumIndex: -1,
  });

  return (
    <div style={{display:"flex"}}>
      <MyChart
        elementType="bar"
        setState={setState}
        activeDatumIndex={activeDatumIndex}
        activeSeriesIndex={activeSeriesIndex}
      />
    </div>
  );
}

function MyChart({
  elementType,
  activeDatumIndex,
  activeSeriesIndex,
  setState,
}: any) {
  const { data, interactionMode, randomizeData } = useDemoConfig({
    series: 4,
    interactionMode: "primary",
    dataType: "ordinal",
    show: ["elementType", "interactionMode"],
  });
  // alert(data.length);
  // data[0].label="12123";
  // const data = [];
  const mydata=[
    [50, 20, 30, 40],
    [20, 30, 30, 40],
    [100, 30, 20, 50],
    [40, 20, 10, 70]
  ]
  for(var i = 0; i < 4; i++){
    for(var j = 0; j < 4; j++){
      data[j].data[i].secondary = mydata[i][j];
      data[i].data[j].primary = "Chat" + j.toString();
    }
    data[i].label = "Series" + i.toString();
  }
  const primaryAxis = React.useMemo<
    AxisOptions<typeof data[number]["data"][number]>
  >(
    () => ({
      getValue: (datum) => datum.primary,
      // getValue: (datum) => "primary",
    }),
    []
  );

  const secondaryAxes = React.useMemo<
    AxisOptions<typeof data[number]["data"][number]>[]
  >(
    () => [
      {
        getValue: (datum) => datum.secondary,
        // getValue: 100,
        elementType,
      },
    ],
    [elementType]
  );

  return (
    <>
      <br />
      <br />
      <div style={{display:"flex", width:"100%", height:"100%"}}>
      <ResizableBox>
        <Chart
          style={{width:"100%", height:"100%"}}
          options={{
            data,
            interactionMode,
            primaryAxis,
            secondaryAxes,
            getDatumStyle: (datum, status) =>
              (activeDatumIndex === datum.index &&
              activeSeriesIndex === datum.seriesIndex
                ? {
                    opacity: 1,
                    circle: {
                      r: 5,
                    },
                    rectangle: {
                      stroke: "black",
                      strokeWidth: 3,
                    },
                  }
                : activeDatumIndex === datum.index
                ? {
                    opacity: 1,
                    circle: {
                      r: 3,
                    },
                    rectangle: {
                      stroke: "black",
                      strokeWidth: 1,
                    },
                  }
                : datum.seriesIndex === activeSeriesIndex
                ? {
                    circle: {
                      r: 3,
                    },
                    rectangle: {
                      stroke: "black",
                      strokeWidth: 1,
                    },
                  }
                : status === "groupFocused"
                ? {
                    circle: {
                      r: 2,
                    },
                    rectangle: {
                      stroke: "black",
                      strokeWidth: 0,
                    },
                  }
                : {
                    circle: {
                      r: 2,
                    },
                    rectangle: {
                      stroke: "black",
                      strokeWidth: 0,
                    },
                  }) as any,
            getSeriesStyle: (series) => {
              return {
                color: `url(#${series.index % 4})`,
                opacity:
                  activeSeriesIndex > -1
                    ? series.index === activeSeriesIndex
                      ? 1
                      : 0.3
                    : 1,
              };
            },
            onFocusDatum: (focused) =>
              setState({
                activeSeriesIndex: focused ? focused.seriesIndex : -1,
                activeDatumIndex: focused ? focused.index : -1,
              }),

            renderSVG: () => (
              <defs>
                <linearGradient id="0" x1="0" x2="0" y1="1" y2="0">
                  <stop offset="0%" stopColor="#17EAD9" />
                  <stop offset="100%" stopColor="#6078EA" />
                </linearGradient>
                <linearGradient id="1" x1="0" x2="0" y1="1" y2="0">
                  <stop offset="0%" stopColor="#ff8f10" />
                  <stop offset="100%" stopColor="#ff3434" />
                </linearGradient>
                <linearGradient id="2" x1="0" x2="0" y1="1" y2="0">
                  <stop offset="0%" stopColor="#42E695" />
                  <stop offset="100%" stopColor="#3BB2B8" />
                </linearGradient>
                <linearGradient id="3" x1="0" x2="0" y1="1" y2="0">
                  <stop offset="0%" stopColor="#ffb302" />
                  <stop offset="100%" stopColor="#ead700" />
                </linearGradient>
              </defs>
            ),
          }}
        />
      </ResizableBox></div>
    </>
  );
}
