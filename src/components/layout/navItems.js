import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import WorkIcon from "@mui/icons-material/Work";
import SettingsIcon from "@mui/icons-material/Settings";
import WidgetsIcon from "@mui/icons-material/Widgets";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import GroupIcon from "@mui/icons-material/Group";
import ListAltIcon from "@mui/icons-material/ListAlt";
import ArticleIcon from "@mui/icons-material/Article";
import BadgeIcon from "@mui/icons-material/Badge";

export const navItems = [
  {
    text: "Home",
    path: "/layout/home",
    icon: <HomeIcon />,
    allowedRoles: [ "TEAMLEAD", "SALESEXECUTIVE"],
  },
  {
    text: "Profiles",
    path: "/layout/profile",
    icon: <PersonIcon />,
    allowedRoles: [ "TEAMLEAD"],
  },
  {
    text: "Placements",
    path: "/layout/placements",
    icon: <WorkIcon />,
    allowedRoles: [],
  },
  {
    text: "Settings",
    path: "/layout/settings",
    icon: <SettingsIcon />,
    allowedRoles: [],
  },
  {
    text: "UI-lib",
    path: "/layout/ui-examples",
    icon: <WidgetsIcon />,
    allowedRoles: [],
  },
  {
    text: "Sample-Form",
    path: "/layout/sample-form",
    icon: <ArticleIcon />,
    allowedRoles: [],
  },
  {
    text: "Hot-List",
    path: "/layout/hotlist",
    icon: <FormatListBulletedIcon />,
    allowedRoles: ["SALESEXECUTIVE", "TEAMLEAD","RECRUITER","SUPERADMIN"],
  },
  {
    text: "Teamlist",
    path: "/layout/teamlist",
    icon: <GroupIcon />,
    allowedRoles: ["", "TEAMLEAD"],
  },
  {
    text: "Employees",
    path: "/layout/employees",
    icon: <BadgeIcon />,
    allowedRoles: ["SUPERADMIN","RECRUITER"],
  },
];
