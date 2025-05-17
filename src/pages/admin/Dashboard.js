import { useState, useEffect } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import { FileText, UploadCloud, Users, Building, Tag, Clock } from "lucide-react";
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

  return (
    <div className="flex flex-col md:flex-row bg-gray-100 min-h-screen w-full">
      

      <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold text-purple-700 mb-8">Dashboard</h1>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-10">
          <div className="bg-white p-5 shadow rounded-lg flex items-center space-x-4">
            <FileText className="text-purple-600 w-12 h-12" />
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
        </div>

        {/* Recent Uploads */}
        <div className="bg-white p-6 shadow rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Recent Uploads</h2>
          {dashboardData.recentUploads.length === 0 ? (
            <p className="text-gray-500">No recent uploads available.</p>
          ) : (
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="bg-purple-100 text-purple-700">
                  <th className="p-3 border-b">File Name</th>
                  <th className="p-3 border-b">Uploaded By</th>
                  <th className="p-3 border-b">Upload Date</th>
                </tr>
              </thead>
              <tbody>
                {dashboardData.recentUploads.map((file, idx) => (
                  <tr
                    key={idx}
                    className="hover:bg-purple-50 border-b border-gray-200"
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
      </div>
    </div>
  );
};

export default Dashboard;
