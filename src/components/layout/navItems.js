// components/layout/navItems.js
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import WorkIcon from "@mui/icons-material/Work";
import SettingsIcon from "@mui/icons-material/Settings";
import WidgetsIcon from "@mui/icons-material/Widgets";

export const navItems = [
  { text: "Hot-List", path: "/", icon: <HomeIcon /> },
  { text: "Profiles", path: "/profile", icon: <PersonIcon /> },
  { text: "Placements", path: "/placements", icon: <WorkIcon /> },
  { text: "Settings", path: "/settings", icon: <SettingsIcon /> },
  { text: "UI-lib", path: "/ui-examples", icon: <WidgetsIcon /> },
  { text: "Sample-Form", path: "/sample-form", icon: <WidgetsIcon /> },
];
