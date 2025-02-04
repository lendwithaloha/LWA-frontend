"use client";
import { Application } from "@/utils/application";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";

const Origination = ({ applications }: { applications: Application[] }) => {
  const router = useRouter();

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse border border-gray-300">
        {/* Table Header */}
        <thead className="bg-gray-100">
          <tr className="text-left text-gray-700">
            <th className="px-4 py-2 border">Lender</th>
            <th className="px-4 py-2 border">Loan Amount</th>
            <th className="px-4 py-2 border">Interest Rate</th>
            <th className="px-4 py-2 border">Property</th>
            <th className="px-4 py-2 border">Loan Number</th>
            <th className="px-4 py-2 border">Document Date</th>
          </tr>
        </thead>

        {/* Table Body */}
        <tbody>
          {applications.map((app, index) => (
            <tr
              key={index}
              className="hover:bg-gray-50 cursor-pointer text-gray-700"
              onClick={() => router.push(`${app.link}/overview?id=${app.id}`)}
            >
              <td className="px-4 py-2 border">{app.title}</td>
              <td className="px-4 py-2 border">${app.id}</td>
              <td className="px-4 py-2 border">{app.id}%</td>
              <td className="px-4 py-2 border">{app.address}</td>
              <td className="px-4 py-2 border">{app.id}</td>
              <td className="px-4 py-2 border">{app.id}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Buttons Section */}
      <div className="flex flex-wrap gap-3 mt-4">
        <Button
          variant="outlined"
          style={{
            textTransform: "none",
            color: "#636363",
            border: "1px solid #cbcbcb",
          }}
        >
          Download Pre-Qualification Letter
        </Button>
        <Button
          variant="outlined"
          style={{
            textTransform: "none",
            color: "#636363",
            border: "1px solid #cbcbcb",
          }}
        >
          View Terms
        </Button>
        <Button
          variant="outlined"
          style={{
            textTransform: "none",
            color: "#636363",
            border: "1px solid #cbcbcb",
          }}
        >
          Contact My Team
        </Button>
      </div>
    </div>
  );
};

export default Origination;
