import { useState } from "react";
import { ShowStatus } from "@/components/dashboard/loan/overview/overview";
import { LoanOption } from "@/utils/model/term.model";
import ReusableButton from "@/components/common_btn";

const DropDownList = [
  {
    label: "30 Days",
    value: "30",
  },
  {
    label: "15 Days",
    value: "15",
  },
  {
    label: "180 Days",
    value: "180",
  },
  {
    label: "360 Days",
    value: "360",
  },
  {
    label: "365 Days",
    value: "365",
  },
];

const TermsTable = ({ data }: { data: LoanOption[] }) => {
  const [selectedTerm, setSelectedTerm] = useState("");
  const filteredData = selectedTerm
    ? data.filter((item) => item.term === parseInt(selectedTerm))
    : data;
    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      setSelectedTerm(event.target.value);
    };
    
  return (
    <div className="">
      <div
        className=" p-4 gap-3 w-full  lg:w-2/3     border-2     border-grey"
        style={{
          minHeight: "300px",
        }}
      >
        <div className="flex flex-col lg:flex-row">
          <h6 className="text-md">
            These options refelect a 30 year fixed loan
          </h6>
          <div className="flex flex-row ml-auto">
            <div>
              <div className="flex flex-row gap-4 items-center ">
                <label
                  htmlFor="loanTerm"
                  className="block mb-2 text-sm font-medium"
                >
                  Prepayment penality
                </label>
                <select
                  style={{ backgroundColor: "#f4f5f5" }}
                  id="loanTerm"
                  value={selectedTerm}
                  onChange={handleChange}
                  className="text-sm py-1 px-2 border border-gray-300  focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select a term</option>
                  {DropDownList.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-5">
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto border-collapse pl-2">
              <thead>
                <tr className="bg-gray-200">
                  <th className=" px-3 py-2 text-center text-sm font-medium text-gray-700"></th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                    Loan to value
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                    Total Loan
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                    Rate
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                    Monthly Payment
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                    Term{" "}
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((item: LoanOption, index: number) => (
                  <tr
                    key={index}
                    className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}
                  >
                    <td className="pl-3 py-2 text-sm text-gray-700">
                      {ShowStatus(item?.status)}
                    </td>
                    <td className=" pl-3 py-2 text-sm text-gray-700">
                      {item.loanToValue}%
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-700">
                      ${item.totalLoan}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-700">
                      {item.rate}%
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-700">
                      ${item.monthlyPayment}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-700">
                      {item.term} Days
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-5 flex flex-col md:flex-row items-center">
            <div className="flex flex-col w-3/4  ">
              <h4 className="flex flex-row item-center gap-2">
                <span className="text-2xl">* </span>Rate displayed are subject
                to rate lock
              </h4>
              <h4 className="flex flex-row item-center gap-2">
                <span className="text-2xl">** </span>Loan to Value will be
                calculated off of your LWA final evaluation.Loan amount may be
                coppied based on other underitten critteria
              </h4>
            </div>
            <div className=" w-1/3  flex justify-end">
              <ReusableButton label="Submit Loan Term" />
            </div>
          </div>
        </div>
      </div>{" "}
    </div>
  );
};

export default TermsTable;
