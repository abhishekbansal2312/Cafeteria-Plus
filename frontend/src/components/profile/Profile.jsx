import React from "react";

export default function Profile({ profile }) {
  return (
    <div>
      <div className=" p-8  border-2 rounded-2xl">
        <div className="flex items-center space-x-6">
          <div className="flex-shrink-0">
            <img
              className="h-32 w-32 rounded-full object-cover shadow-xl"
              src="https://images.unsplash.com/photo-1635107510862-53886e926b74?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHByb2ZpbGUlMjBwaWN0dXJlfGVufDB8fDB8fHww"
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

        <div className="mt-2 space-y-4">
          <div className=" p-6 ">
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
