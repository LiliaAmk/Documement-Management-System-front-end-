import { useState } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { FileText, UploadCloud, Clock } from "lucide-react";

const UserDashboard = () => {
  // Simulated user-specific recent files
  const [recentFiles] = useState([
    { id: 1, name: "Report.pdf", date: "Mar 5, 2025" },
    { id: 2, name: "Notes.docx", date: "Mar 3, 2025" },
    { id: 3, name: "Budget.xlsx", date: "Mar 1, 2025" },
  ]);

  // User recent activity log
  const [activityLog] = useState([
    { id: 1, action: "You uploaded Report.pdf", time: "5 min ago" },
    { id: 2, action: "You viewed Budget.xlsx", time: "2 days ago" },
    { id: 3, action: "You updated Notes.docx", time: "1 week ago" },
  ]);

  // File type breakdown for user
  const fileStats = [
    { name: "PDF", value: 5, color: "#4F46E5" },
    { name: "Excel", value: 3, color: "#059669" },
    { name: "Word", value: 2, color: "#D97706" },
  ];

  return (
    <div className="flex flex-col md:flex-row bg-gray-100 min-h-screen w-full">
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold text-purple-700 mb-6">User Dashboard</h1>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-white p-4 shadow-md rounded-lg flex items-center">
            <FileText className="text-purple-600 w-10 h-10 mr-3" />
            <div>
              <p className="text-lg font-semibold">Your Total Files</p>
              <p className="text-xl font-bold">{recentFiles.length}</p>
            </div>
          </div>

          <div className="bg-white p-4 shadow-md rounded-lg flex items-center">
            <UploadCloud className="text-yellow-600 w-10 h-10 mr-3" />
            <div>
              <p className="text-lg font-semibold">Recent Uploads</p>
              <p className="text-xl font-bold">{recentFiles.length}</p>
            </div>
          </div>
        </div>

        {/* Chart & Recent Files */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* File Type Pie Chart */}
          <div className="bg-white p-6 shadow-md rounded-lg">
            <h2 className="text-lg font-bold mb-4">Your File Type Breakdown</h2>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={fileStats}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                >
                  {fileStats.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Recent Files Table */}
          <div className="bg-white p-6 shadow-md rounded-lg">
            <h2 className="text-lg font-bold mb-4">Your Recent Files</h2>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-purple-100">
                  <th className="p-2 text-left text-purple-700">File Name</th>
                  <th className="p-2 text-left text-purple-700">Date</th>
                </tr>
              </thead>
              <tbody>
                {recentFiles.map((file) => (
                  <tr key={file.id} className="border-b hover:bg-purple-50">
                    <td className="p-2">{file.name}</td>
                    <td className="p-2">{file.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Activity Log */}
        <div className="bg-white p-6 shadow-md rounded-lg mt-6">
          <h2 className="text-lg font-bold mb-4">Your Recent Activity</h2>
          <ul className="space-y-3">
            {activityLog.map((log) => (
              <li key={log.id} className="flex items-center space-x-3">
                <Clock className="text-gray-500 w-5 h-5" />
                <span>{log.action}</span>
                <span className="text-gray-400 text-sm">{log.time}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
