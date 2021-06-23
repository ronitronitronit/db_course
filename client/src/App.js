import React, { useState, useEffect } from "react";
import Paper from "@material-ui/core/Paper";
import {
  Chart,
  BarSeries,
  ArgumentAxis,
  ValueAxis,
  Title,
  Legend,
  Tooltip,
} from "@devexpress/dx-react-chart-material-ui";
import * as d3Format from "d3-format";
import {
  Animation,
  EventTracker,
  HoverState,
} from "@devexpress/dx-react-chart";
import Typography from "@material-ui/core/Typography";
import Axios from "axios";

function App() {
  const [hover, setHover] = useState(null);
  const [tooltipTarget, setTooltipTarget] = useState(null);
  const [zipCodeData, setZipCodeData] = useState([]);

  const getAndSetZipCodeData = () => {
    Axios.get("http://localhost:3001/api/get/zipcodes").then((response) => {
      const zipCodes = response.data;
      // stringify the zip codes so that the bar chart will not sort them numerically
      const stringifiedZipCodeData = zipCodes.map((item) => ({
        ...item,
        zipcode: item.zipcode.toString(),
      }));
      setZipCodeData(stringifiedZipCodeData);
    });
  };

  const changeHover = (hover) => setHover(hover);
  const changeTooltip = (targetItem) => setTooltipTarget(targetItem);

  const formatTooltip = d3Format.format(",.2r");
  const TooltipContent = (props) => {
    const { targetItem, text, ...restProps } = props;
    return (
      <div>
        <div>
          <Tooltip.Content {...restProps} text={targetItem.series} />
        </div>
        <div>
          <Tooltip.Content
            {...restProps}
            text={formatTooltip(
              zipCodeData[targetItem.point][targetItem.series]
            )}
          />
        </div>
      </div>
    );
  };

  const formatInfo = (target) => {
    if (!target) {
      return "None";
    }
    const { point } = target;
    const lowIncomeRatio = zipCodeData[point].low_income_ratio;
    const ticketRatio = zipCodeData[point].ticket_ratio;
    const zipCode = zipCodeData[point].zipcode;
    return `In the zip code ${zipCode}, ${(
      lowIncomeRatio * 100
    ).toFixed()}% of tax payers made below $25,000, and there were ${(
      ticketRatio * 100
    ).toFixed()} parking tickets issued for every 100 residents`;
  };

  useEffect(() => {
    getAndSetZipCodeData();
  }, []);

  return (
    <>
      <Typography align="center" variant="h2">
        2018 low income and parking ticket prevalence in Chicago, IL, USA
      </Typography>
      <Paper>
        <Chart height={1000} rotated={true} data={zipCodeData}>
          <ArgumentAxis />
          <ValueAxis max={59} />
          <Typography align="center" color="textSecondary">
            {!!hover ? formatInfo(hover) : "Hover over any bar for details."}
          </Typography>

          <BarSeries
            valueField="low_income_ratio"
            argumentField="zipcode"
            name="low_income_ratio"
            color="#4682B4"
            barWidth={1}
          />
          <BarSeries
            valueField="ticket_ratio"
            name="ticket_ratio"
            argumentField="zipcode"
            color="#87CEEB"
            barWidth={0.5}
          />

          <Legend position="bottom" />
          <EventTracker />
          <HoverState hover={hover} onHoverChange={changeHover} />
          <Tooltip
            targetItem={tooltipTarget}
            onTargetItemChange={changeTooltip}
            contentComponent={TooltipContent}
          />
          <Animation />
        </Chart>
      </Paper>
    </>
  );
}

export default App;
