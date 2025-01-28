import React, { useEffect, useState } from "react";
import useAxios from "../hooks/useAxios";

export default function ProfilePage() {
  const makeRequest = useAxios();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async () => {
    try {
      const response = await makeRequest(
        "http://localhost:3000/api/users/profile",
        "GET",
        null,
        true
      );
      setProfile(response);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching profile:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (loading) return <div className="text-center text-xl">Loading...</div>;

  return (
    <div className="container mx-auto p-6 mt-12 ">
      <div className=" p-8  border-2 rounded-2xl">
        <div className="flex items-center space-x-6">
          <div className="flex-shrink-0">
            <img
              className="h-32 w-32 rounded-full object-cover shadow-xl"
              src="https://via.placeholder.com/150"
              alt="Profile"
            />
          </div>

          <div className="">
            <h1 className="text-4xl font-semibold mb-2">
              {profile.name}'s Profile
            </h1>
            <p className="text-xl font-medium">{profile.role}</p>
          </div>
        </div>

        <div className="mt-8 space-y-4">
          <div className="bg-white p-6 ">
            <h2 className="text-2xl font-semibold mb-4">Profile Details</h2>
            <p className="text-lg">
              <strong className="font-medium">Email:</strong> {profile.email}
            </p>
            <p className="text-lg">
              <strong className="font-medium">Address:</strong>{" "}
              {profile.address || "Not provided"}
            </p>
            <p className="text-lg">
              <strong className="font-medium">Phone:</strong>{" "}
              {profile.phone || "Not provided"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
