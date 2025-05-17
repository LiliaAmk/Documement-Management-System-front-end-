import { useState, useEffect } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import { FileText, Users, Building, Tag, Database, Zap } from "lucide-react";
import axios from "../../api/axios";

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/dashboard");
        setDashboardData(response.data);
      } catch (error) {
        console.error("Failed to fetch dashboard data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-600">Loading dashboard data...</p>
      </div>
    );
  }

  if (!dashboardData) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-600">Failed to load dashboard data.</p>
      </div>
    );
  }

  // Calculate storage usage percentage if data is present
  const storagePercent =
    dashboardData.storageUsed && dashboardData.storageLimit
      ? Math.round(
          (dashboardData.storageUsed / dashboardData.storageLimit) * 100
        )
      : 0;

  return (
    <div className="flex flex-col md:flex-row bg-gray-100 min-h-screen w-full">
      <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold text-blue-900 mb-8">Dashboard</h1>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6 mb-10">
          <div className="bg-white p-5 shadow rounded-lg flex items-center space-x-4">
            <FileText className="text-blue-900 w-12 h-12" />
            <div>
              <p className="text-sm font-medium text-gray-500">Total Documents</p>
              <p className="text-2xl font-bold">{dashboardData.totalDocuments}</p>
            </div>
          </div>

          <div className="bg-white p-5 shadow rounded-lg flex items-center space-x-4">
            <Users className="text-green-600 w-12 h-12" />
            <div>
              <p className="text-sm font-medium text-gray-500">Users Uploading</p>
              <p className="text-2xl font-bold">{dashboardData.totalUsersUploading}</p>
            </div>
          </div>

          <div className="bg-white p-5 shadow rounded-lg flex items-center space-x-4">
            <Building className="text-blue-600 w-12 h-12" />
            <div>
              <p className="text-sm font-medium text-gray-500">Departments</p>
              <p className="text-2xl font-bold">{dashboardData.totalDepartments}</p>
            </div>
          </div>

          <div className="bg-white p-5 shadow rounded-lg flex items-center space-x-4">
            <Tag className="text-yellow-600 w-12 h-12" />
            <div>
              <p className="text-sm font-medium text-gray-500">Categories</p>
              <p className="text-2xl font-bold">{dashboardData.totalCategories}</p>
            </div>
          </div>

          {/* New: Storage Usage */}
          <div className="bg-white p-5 shadow rounded-lg flex items-center space-x-4">
            <Database className="text-indigo-600 w-12 h-12" />
            <div className="w-full">
              <p className="text-sm font-medium text-gray-500">Storage Usage</p>
              <div className="relative h-3 bg-gray-200 rounded-full mt-2 mb-1">
                <div
                  className="absolute left-0 top-0 h-3 rounded-full bg-indigo-500"
                  style={{ width: `${storagePercent}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-600">
  {((dashboardData.storageUsed || 0) / 1024 / 1024).toFixed(1)} / {((dashboardData.storageLimit || 0) / 1024 / 1024).toFixed(0)} MB
</p>


            </div>
          </div>
        </div>

        {/* Recent Uploads */}
        <div className="bg-white p-6 shadow rounded-lg mb-10">
          <h2 className="text-xl font-semibold mb-4">Recent Uploads</h2>
          {dashboardData.recentUploads.length === 0 ? (
            <p className="text-gray-500">No recent uploads available.</p>
          ) : (
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="bg-blue-100 text-blue-900">
                  <th className="p-3 border-b">File Name</th>
                  <th className="p-3 border-b">Uploaded By</th>
                  <th className="p-3 border-b">Upload Date</th>
                </tr>
              </thead>
              <tbody>
                {dashboardData.recentUploads.map((file, idx) => (
                  <tr
                    key={idx}
                    className="hover:bg-blue-50 border-b border-gray-200"
                  >
                    <td className="p-3">{file.fileName}</td>
                    <td className="p-3">{file.uploadedByEmail}</td>
                    <td className="p-3">{file.uploadDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Recent Activity Feed */}
        <div className="bg-white p-6 shadow rounded-lg">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Zap className="inline text-orange-400" /> Recent Activity
          </h2>
          {dashboardData.recentActivity && dashboardData.recentActivity.length > 0 ? (
            <ul className="space-y-2">
  
            </ul>
          ) : (
            <p className="text-gray-500">No recent activity.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
