const GuarantorDetails = () => {
  const profileData = {
    sections: [
      {
        name: "Guarantor Details",
        buttonText: "Edit",
        data: [
          {
            title: "Personal Details",
            items: [
              { label: "Full Name", value: "Austin Water" },
              { label: "Date of Birth", value: "Jan 23 - 1990" },
              { label: "Marital Status", value: "Married" },
              { label: "Credit Score", value: "800" },
            ],
          },
          {
            title: "Contact Details",
            items: [
              { label: "Email", value: "austin@gmail.com" },
              { label: "Phone", value: "+1 234 3432" },
            ],
          },
          {
            title: "Employment Details",
            items: [
              { label: "Position", value: "Manager" },
              { label: "Years Employed", value: "2001" },
              { label: "Annual Income", value: "$120,000" },
              { label: "Employer Address", value: "Same as current" },
              { label: "Street Address", value: "123 Main Street" },
              { label: "City", value: "Washington DC" },
            ],
          },
          {
            title: "Current Address",
            items: [
              { label: "Street Address", value: "Stress Address" },
              { label: "City", value: "City" },
              { label: "State", value: "State" },
              { label: "Zip Code", value: "Zip Code" },
              { label: "Housing", value: "Rent" },
              { label: "Monthly Rate", value: "$1,200" },
              { label: "", value: "12" },
            ],
          },
        ],
        actions: ["Approve", "Reject"],
      },
    ],
  };

  const currentSection = profileData.sections[0];

  return (
    <div className="w-full p-4 sm:p-8">
      <div className="space-y-8 max-w-5xl mx-auto">
        {/* Header */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
          <h1 className="text-xl sm:text-2xl font-bold">
            {currentSection.name}
          </h1>
          <button className="flex items-center bg-black text-white px-4 py-2 rounded-md w-16">
            {currentSection?.buttonText}
          </button>
        </div>

        {/* Dynamic Sections */}
        {currentSection?.data.map((section, index) => (
          <div key={index} className="border-b pb-4">
            <h2 className="text-lg font-medium mb-4">{section.title}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {section.items.map((item, idx) => (
                <div key={idx} className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold text-sm sm:text-base">
                      {item.value}
                    </p>
                    <span className="text-xs sm:text-sm text-gray-500">
                      {item.label}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Approve/Reject Buttons */}
        <div className="flex justify-center sm:justify-start gap-4 mt-8">
          {currentSection?.actions.map((action, index) => (
            <button
              key={index}
              className={`px-6 py-2 text-sm sm:text-base rounded-md text-white ${
                action === "Reject" ? "bg-red-500" : "bg-primaryColor"
              }`}
            >
              {action}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GuarantorDetails;
