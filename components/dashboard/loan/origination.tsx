"use Client";
import { CiCamera } from "react-icons/ci";
import { Button, Link } from "@mui/material";
import { Application } from "@/utils/application";
const Origination = ({ applications }: { applications: Application[] }) => {
  return (
    <div className="flex flex-col ">
      {" "}
      {applications.map((app, index) => (
        <div key={index}>
          <div className="flex flex-column  md:flex-row gap-2 md:gap-3  items-center">
            <div>
              <h6 className="text-lg m-0 p-0">{app.title}</h6>
            </div>
            <div className="mt-1 p-0 flex-grow bg-grey text-grey">
              <hr className="border-t-4 border-solid border-grey" />
            </div>
          </div>
          <div
            className="flex flex-row  border-2  border-grey mt-4 w-full lg:w-1/2"
            style={{ minHeight: "400px" }}
          >
            <div className="w-1/4 items-center  flex flex-row justify-center   p-2  ">
              <CiCamera
                className=" w-3/4 h-1/2"
                style={{ color: "#dddddd" }}
              />
            </div>

            <div className="w-3/4   p-2 md:p-6  border-l-2  border-grey">
              <h3 className="text-gray-800">
                <Link href={`${app.link}/overview?id=${app.id}`}>
                  {app.address}
                </Link>
              </h3>

              <h6 className="text-gray-800 mt-2 font-semibold">
                {app.description}
              </h6>

              <div className="p-1  ">
                <ul>
                  {app.details.map((detail, index) => (
                    <li key={index} className="flex justify-between  ">
                      <span className="font-normal text-gray-600 text-sm">
                        {detail.label} :
                      </span>
                      <span className="text-gray-600 text-sm ">
                        {detail.value}
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="flex flex-row flex-wrap gap-2 mt-4">
                  <Button
                    variant="outlined"
                    style={{
                      textTransform: "none",
                      color: "#636363",
                      border: "1px solid #cbcbcb",
                    }}
                  >
                    Donwload pre qualification letter
                  </Button>
                  <Link href={`loan/id/terms?id=${app.id}`}>
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
                  </Link>

                  <Link href={`loan/id/team?id=${app.id}`}>
                    <Button
                      variant="outlined"
                      style={{
                        textTransform: "none",
                        color: "#636363",
                        border: "1px solid #cbcbcb",
                      }}
                    >
                      Contact my team
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Origination;
