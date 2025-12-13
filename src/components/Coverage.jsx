import { useEffect, useRef, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const Coverage = () => {
  const [branches, setBranches] = useState([]);
  const [notFound, setNotFound] = useState(false);
  const mapRef = useRef();

  useEffect(() => {
    fetch("/libraries.json")
      .then((res) => res.json())
      .then((res) => setBranches(res));
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const searched = e.target.search.value.trim().toLowerCase();

    if (!searched) return;

    const found = branches.find((b) =>
      b.district.toLowerCase().includes(searched)
    );

    if (found) {
      setNotFound(false);
      mapRef.current.flyTo([found.latitude, found.longitude], 13);
    } else {
      setNotFound(true);
    }
  };

  const mapCenter = [23.46, 91.18];

  return (
    <div className="pb-10">

      {/* Title */}
      <div className="text-center mt-6">
        <p className="text-4xl font-black text-orange-500 mb-6">
          Our All Libraries
        </p>

        {/* Search */}
        <form onSubmit={handleSearch} className="flex justify-center items-center">
          <input
            name="search"
            type="text"
            placeholder="Search Your District"
            className="
      input 
      w-72
      rounded-l-full rounded-r-none
      bg-white dark:bg-gray-800
      text-gray-800 dark:text-gray-200
      border border-orange-400
      focus:outline-none focus:border-orange-500
    "
          />

          <button
            type="submit"
            className="
      btn
      rounded-r-full rounded-l-none
      bg-orange-500 hover:bg-orange-600
      text-white font-semibold
      border-0
      px-6
    "
          >
            Search
          </button>
        </form>


        {/* Not Found Message */}
        {notFound && (
          <p className="text-red-500 mt-3 font-medium">
            No library found in this district.
          </p>
        )}
      </div>

      {/* Map Container */}
      <div
        className="
          mt-8
          border-2 rounded-xl overflow-hidden 
          border-gray-300 dark:border-gray-700
        "
      >
        <MapContainer
          ref={mapRef}
          className="h-[600px]"
          center={mapCenter}
          zoom={7}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution="&copy; OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {branches.map((branch) => (
            <Marker
              key={branch.id || branch.district}
              position={[branch.latitude, branch.longitude]}
            >
              <Popup>
                <strong>{branch.district}</strong> <br />
                Library Location
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default Coverage;
