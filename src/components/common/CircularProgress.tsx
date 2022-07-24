import { FC } from "react";
import Box from "@mui/material/Box";
import MuiCircularProgress, {
  circularProgressClasses,
  CircularProgressProps,
} from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";

// TODO: Needs more thought
const SIZES = {
  small: { fontSize: "1.05rem", fontWeight: "500", size: 60, thickness: 4 },
  medium: { fontSize: "1.5rem", fontWeight: "500", size: 90, thickness: 3 },
  large: { fontSize: "2.25rem", fontWeight: "500", size: 120, thickness: 3 },
};

const getBarWidth = (val: number) => (val > 100 ? 100 : val);

type Props = CircularProgressProps & {
  size?: "small" | "medium" | "large";
};

const CircularProgress: FC<Props> = ({ size = "medium", value = 0, ...props }) => (
  <Box sx={{ position: "relative", mr: 2, mt: 1, width: `${SIZES[size].size}px` }}>
    <MuiCircularProgress
      {...props}
      size={SIZES[size].size}
      sx={{
        color: "rgba(0,0,0,0.05)",
      }}
      thickness={SIZES[size].thickness}
      value={100}
      variant="determinate"
    />
    <MuiCircularProgress
      {...props}
      size={SIZES[size].size}
      sx={{
        animationDuration: "550ms",
        color: value <= 100 ? "primary.light" : "error.light",
        left: 0,
        position: "absolute",
        [`& .${circularProgressClasses.circle}`]: {
          strokeLinecap: "round",
        },
      }}
      thickness={SIZES[size].thickness}
      value={getBarWidth(value)}
      variant="determinate"
    />
    <Box
      sx={{
        alignItems: "center",
        bottom: 0,
        display: "flex",
        justifyContent: "center",
        left: 0,
        position: "absolute",
        right: 0,
        top: 0,
      }}
    >
      <Typography
        color={value <= 100 ? "primary.main" : "error.main"}
        component="span"
        sx={{ fontSize: SIZES[size].fontSize, fontWeight: SIZES[size].fontWeight, mb: 0.5 }}
      >
        {`${value.toFixed(0)}%`}
      </Typography>
    </Box>
  </Box>
);

export default CircularProgress;
