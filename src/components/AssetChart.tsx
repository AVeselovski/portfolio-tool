import { useState } from "react";
import { Cell, Label, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

import { formatCurrency } from "utils/numbers";
import {
  TYPES as TYPES_ARR,
  SECTORS as SECTORS_ARR,
  REGIONS as REGIONS_ARR,
  COLORS,
} from "utils/constants";

import { Box, TabNav, Typography } from "./common";

const TYPES = TYPES_ARR.reduce(
  (obj: any, item: any) => Object.assign(obj, { [item.key]: item.value }),
  {}
);

const SECTORS = SECTORS_ARR.reduce(
  (obj: any, item: any) => Object.assign(obj, { [item.key]: item.value }),
  {}
);

const REGIONS = REGIONS_ARR.reduce(
  (obj: any, item: any) => Object.assign(obj, { [item.key]: item.value }),
  {}
);

const SORT_NAMES: any = {
  type: TYPES,
  sector: SECTORS,
  region: REGIONS,
};

const SORT: { [key: number]: string } = {
  0: "type",
  1: "sector",
  2: "region",
};

const getColor = (key: number, value: any) => {
  return key === 0 ? COLORS[value.type] : "#BDBDBD";
};

const getName = (key: string, value: number) => {
  return SORT_NAMES[key][value];
};

const formatData = (data: any, sortedBy: number) => {
  const sorter = SORT[sortedBy];
  const sorted = data.sort((a: any, b: any) => a[sorter] - b[sorter]);

  const grouped = sorted
    .reduce((reduced: any[], current: any, index: number) => {
      const dataObjName = getName(sorter, current[sorter]);
      const dataObj = { ...current, name: dataObjName, value: current.value };

      if (index > 0 && current[sorter] === reduced[index - 1][sorter]) {
        dataObj.value = current.value + reduced[index - 1].value;
        reduced[index - 1] = null;
      }

      return [...reduced, dataObj];
    }, [])
    .filter(Boolean);

  return [sorted, grouped];
};

const CustomTooltip = ({ active, payload, total }: any, x: any) => {
  if (active && payload && payload.length) {
    const percentage = (payload[0].value / total) * 100;
    return (
      <Box
        sx={{
          backgroundColor: "grey.50",
          borderRadius: "3px",
          boxShadow: "3",
          px: 2,
          py: 1,
          // transform: "rotate(0deg)",
        }}
      >
        <Typography sx={{ fontWeight: 600 }}>{payload[0].name}</Typography>
        <Typography sx={{ fontWeight: 400 }}>
          {formatCurrency(payload[0].value)} {percentage.toFixed(0)}%
        </Typography>
      </Box>
    );
  }

  return null;
};

type Props = any;

const AssetChart = ({ data, tab, total }: Props) => {
  const [sortedData, groupedData] = formatData(data, tab);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", position: "relative" }}>
      <Box sx={{ position: "relative", height: "500px", width: "100%" }}>
        <Box
          sx={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 0,
          }}
        >
          {groupedData.map((g: any, i: number) => {
            const percentage = (g.value / total) * 100;
            return (
              <Typography key={i}>
                <strong>{percentage.toFixed(0)}%</strong> {g.name}
              </Typography>
            );
          })}
        </Box>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              cx="50%"
              cy="50%"
              data={sortedData}
              dataKey="value"
              fill="#8884d8"
              innerRadius={150}
              outerRadius={200}
            >
              {sortedData.map((_entry: any, index: any) => (
                <Cell
                  fill={sortedData[index].color ?? COLORS[sortedData[index].type]}
                  key={`1-cell-${index}`}
                />
              ))}
            </Pie>
            <Pie
              cx="50%"
              cy="50%"
              data={groupedData}
              dataKey="value"
              fill="#82ca9d"
              innerRadius={210}
              outerRadius={225}
            >
              {groupedData.map((_entry: any, index: any) => (
                <Cell fill={getColor(tab, groupedData[index])} key={`2-cell-${index}`} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip total={total} />} />
          </PieChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
};

export default AssetChart;
