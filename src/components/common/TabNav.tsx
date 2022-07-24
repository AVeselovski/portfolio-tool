import { FC } from "react";
// import { NavLink, useLocation } from "react-router-dom";
import MuiTab, { tabClasses, TabProps as MuiTabProps } from "@mui/material/Tab";
import MuiTabs, { tabsClasses, TabsProps as MuiTabsProps } from "@mui/material/Tabs";
import { styled } from "@mui/material/styles";

const a11yProps = (index: number, name: string) => {
  return {
    id: `${name}-tab-${index}`,
    "aria-controls": `${name}-tabpanel-${index}`,
  };
};

const Tabs = styled(MuiTabs)<MuiTabsProps>(({ theme }) => ({
  borderRadius: theme.spacing(4),
  minHeight: theme.spacing(4),
  ":hover": {
    backgroundColor: theme.palette.grey[100],
  },
  [`.${tabsClasses.indicator}`]: {
    borderRadius: theme.spacing(4),
    height: "100%",
    zIndex: 1,
    backgroundColor: theme.palette.grey[300],
  },
}));

const Tab = styled(MuiTab)<MuiTabProps>(({ theme }) => ({
  borderRadius: theme.spacing(4),
  minHeight: theme.spacing(4),
  textTransform: "none",
  zIndex: 2,
  paddingBottom: 2,
  paddingTop: 2,
  ":hover": {
    backgroundColor: theme.palette.grey[200],
  },
  [`&.${tabClasses.selected}`]: {
    backgroundColor: theme.palette.grey[300],
    color: theme.palette.grey[900],
    fontWeight: 600,
    ":hover": {
      backgroundColor: theme.palette.grey[300],
    },
  },
}));

type Props = MuiTabsProps & {
  name: string;
  tabs: string[];
  value: number;
};

const TabNav: FC<Props> = ({ name = "nav", onChange, tabs = [], value = 0 }) => {
  const handleChange = onChange;

  return (
    <Tabs value={value} onChange={handleChange} aria-label={`${name} tabs`}>
      {tabs.map((tab, i) => (
        <Tab key={i} label={tab} {...a11yProps(i, name)} />
      ))}
    </Tabs>
  );
};

export default TabNav;

// interface Route {
//   label: string;
//   route: string;
// }

// type RouterTabNavProps = MuiTabsProps & {
//   name: string;
//   tabs: Route[];
//   to?: string;
// };

// export const RouterTabNav: FC<RouterTabNavProps> = ({ name = "nav", onChange, tabs = [] }) => {
//   const handleChange = onChange;

//   const { pathname } = useLocation();

//   return (
//     <Tabs value={pathname} onChange={handleChange} aria-label={`${name} tabs`}>
//       {tabs.map((tab, i) => (
//         <Tab
//           // @ts-ignore < TODO: add custom "component" prop type
//           component={NavLink}
//           key={i}
//           label={tab.label}
//           to={tab.route}
//           value={tab.route}
//           {...a11yProps(i, name)}
//         />
//       ))}
//     </Tabs>
//   );
// };

const IconTabs = styled(Tabs)<MuiTabsProps>(({ theme }) => ({
  borderRadius: theme.spacing(0.5),
  [`.${tabsClasses.indicator}`]: {
    borderRadius: theme.spacing(0.5),
  },
}));

const IconTab = styled(Tab)<MuiTabProps>(({ theme }) => ({
  borderRadius: theme.spacing(0.5),
  minWidth: theme.spacing(4),
  paddingBottom: 0.5,
  paddingLeft: 0.5,
  paddingRight: 0.5,
  paddingTop: 0.5,
}));

type IconTabNavProps = MuiTabsProps & {
  name: string;
  tabs: React.ReactNode[];
};

export const IconTabNav: FC<IconTabNavProps> = ({
  name = "nav",
  onChange,
  tabs = [],
  value = 0,
  ...props
}) => {
  const handleChange = onChange;

  return (
    <IconTabs {...props} aria-label={`${name} tabs`} onChange={handleChange} value={value}>
      {tabs.map((tab, i) => (
        <IconTab key={i} label={tab} {...a11yProps(i, name)} />
      ))}
    </IconTabs>
  );
};
