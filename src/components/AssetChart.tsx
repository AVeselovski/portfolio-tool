import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

import { formatCurrency } from "utils/numbers";
import { COLORS } from "utils/constants";

import { Box, Typography } from "./common";

const getColor = (key: number, value: any) => {
  return key === 0 ? COLORS[value.type] : "#BDBDBD";
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
          {data.grouped.map((g: any, i: number) => {
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
              data={data.sorted}
              dataKey="value"
              fill="#8884d8"
              innerRadius={150}
              outerRadius={200}
            >
              {data.sorted.map((_entry: any, index: any) => (
                <Cell
                  fill={data.sorted[index].color ?? COLORS[data.sorted[index].type]}
                  key={`1-cell-${index}`}
                />
              ))}
            </Pie>
            <Pie
              cx="50%"
              cy="50%"
              data={data.grouped}
              dataKey="value"
              fill="#82ca9d"
              innerRadius={210}
              outerRadius={225}
            >
              {data.grouped.map((_entry: any, index: any) => (
                <Cell fill={getColor(tab, data.grouped[index])} key={`2-cell-${index}`} />
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
