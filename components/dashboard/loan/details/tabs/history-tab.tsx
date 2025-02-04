"use client";

export default function HistoryTab() {
  return (
    <div className="mx-auto p-6">
      <div className="relative">
        {/* Vertical connecting line */}
        <div className="absolute left-10 top-0 w-0.5 h-full bg-gray-200"></div>

        <table className="w-full">
          <thead>
            <tr className="text-left text-sm text-gray-500">
              <th className="w-16 px-4 py-2"></th>
              <th className="w-48 px-4 py-2"></th>
              <th className="w-48 px-4 py-2">Submission Date</th>
              <th className="px-4 py-2">Feedback</th>
            </tr>
          </thead>
          <tbody>
            <tr className="align-top">
              <td className="px-4 py-4">
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center relative z-10">
                  <svg
                    className="w-5 h-5 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
              </td>
              <td className="px-4 py-4">
                <div className="text-sm font-medium text-gray-900">
                  Document name
                </div>
              </td>
              <td>
                <div className="text-sm text-gray-500">Jan 24, 2024</div>
              </td>
              <td className="px-4 py-4">
                <p className="text-sm text-gray-500">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et
                  massa mi. Aliquam in hendrerit ur...
                </p>
              </td>
            </tr>

            <tr className="align-top">
              <td className="px-4 py-4">
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center relative z-10">
                  <svg
                    className="w-5 h-5 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
              </td>
              <td className="px-4 py-4">
                <div className="text-sm font-medium text-gray-900">
                  Document name
                </div>
                <span className="mt-1 inline-block px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded-full">
                  Current
                </span>
              </td>
              <td>
                <div className="text-sm text-gray-500">Jan 24, 2024</div>
              </td>
              <td className="px-4 py-4">
                <p className="text-sm text-gray-500">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et
                  massa mi. Aliquam in hendrerit ur...
                </p>
              </td>
            </tr>

            <tr className="align-top">
              <td className="px-4 py-4">
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center relative z-10">
                  <svg
                    className="w-5 h-5 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
              </td>
              <td className="px-4 py-4">
                <div className="text-sm font-medium text-gray-900">
                  Document name
                </div>
                <span className="mt-1 inline-block px-3 py-1 text-xs bg-green-100 text-green-700 rounded-full">
                  Approved
                </span>
              </td>
              <td className="px-4 py-4"></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
