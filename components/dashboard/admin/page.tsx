import React from "react";


const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800">
        Admin Dashboard
      </h2>

      {/* Overview Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: "Total Loans", value: "$24.5M" },
          { label: "Active Borrowers", value: "1,250" },
          { label: "Loan Applications", value: "85" },
        ].map((stat, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-600">
              {stat.label}
            </h3>
            <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
          </div>
        ))}
      </div>
    
    </div>
  );
};

export default Dashboard;
