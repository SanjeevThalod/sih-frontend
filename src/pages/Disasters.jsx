import React, { useEffect, useState } from "react";
import apiConnector from "../services/apiConnector";
import { disasterEndPoints } from "../services/api";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

const Disasters = () => {
  const [disasters, setDisasters] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiConnector({
          method: "GET",
          url: disasterEndPoints.FETCH_ALL_DISASTERS_API,
        });

        setDisasters(response.disasters);
        setLoading(false);
      } catch (error) {
        toast.error("Error fetching disasters");
        console.error(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDetailsClick = (disasterId) => {
    // Navigate to the disaster details page with the disaster ID as a param
    navigate(`/disaster-details/${disasterId}`);
  };

  return (
    <div>
      <div>
        <Link to="/addDisaster">
          <button className="px-4 py-2">Add Disaster</button>
        </Link>
      </div>
      {loading ? (
        <div className="w-full flex items-center justify-center mt-16">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-500"></div>
        </div>
      ) : (
        <div>
          <h2 className="text-3xl font-semibold mb-4 text-purple-700">
            Disaster Events
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {disasters.map((disaster) => (
              <div
                key={disaster._id}
                className="bg-white shadow-md p-4 rounded-lg"
              >
                <h3 className="text-xl font-semibold text-blue-800">
                  {disaster.typeOfDisaster}
                </h3>
                <p className="text-sm text-gray-500 mt-2">
                  {disaster.timestamp}
                </p>
                <p className="text-sm text-gray-500">{disaster.severity}</p>
                <p className="text-sm mt-2">{disaster.description}</p>
                <div className="mt-4">
                  <p className="text-sm font-semibold">Address:</p>
                  <p className="text-sm">{disaster.contact.address.street}</p>
                  <p className="text-sm">{`${disaster.contact.address.city}, ${disaster.contact.address.state}`}</p>
                  <p className="text-sm">{disaster.contact.address.country}</p>
                </div>
                <button
                  className="mt-4 bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 px-4 rounded-full"
                  onClick={() => handleDetailsClick(disaster._id)}
                >
                  Details
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Disasters;
