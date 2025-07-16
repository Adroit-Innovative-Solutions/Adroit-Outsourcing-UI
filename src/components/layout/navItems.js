// components/layout/navItems.js
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import WorkIcon from "@mui/icons-material/Work";
import SettingsIcon from "@mui/icons-material/Settings";
import WidgetsIcon from "@mui/icons-material/Widgets";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import GroupIcon from "@mui/icons-material/Group";
import ListAltIcon from "@mui/icons-material/ListAlt";
import ArticleIcon from "@mui/icons-material/Article";

export const navItems = [
  { text: "Home", path: "/layout/home", icon: <HomeIcon /> },
  { text: "Profiles", path: "/layout/profile", icon: <PersonIcon /> },
  { text: "Placements", path: "/layout/placements", icon: <WorkIcon /> },
  { text: "Settings", path: "/layout/settings", icon: <SettingsIcon /> },
  { text: "UI-lib", path: "/layout/ui-examples", icon: <WidgetsIcon /> },
  { text: "Sample-Form", path: "/layout/sample-form", icon: <ArticleIcon /> },
  { text: "Hot-List", path: "/layout/hotlist", icon: <FormatListBulletedIcon /> },
  { text: "Teamlist", path: "/layout/teamlist", icon: <GroupIcon /> },
];
