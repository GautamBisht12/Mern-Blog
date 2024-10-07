import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DashProfile from "../components/DashProfile";
import DashSidebar from "../components/DashSidebar";

const Dashboard = () => {
  const location = useLocation();
  const [tab, setTab] = useState("");
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    console.log(urlParams);
    const tabFromUrl = urlParams.get("tab");
    console.log(tabFromUrl);
    setTab(tabFromUrl);
  }, [location.search]);
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="md:w-56">
        <DashSidebar />
        {/* Sidebar  */}
      </div>

      {tab === "profile" && <DashProfile />}
      {/* profile  */}
    </div>
  );
};

export default Dashboard;
