import React from "react";

export default function ProfileSkeleton() {
  return (
    <div className="p-8 border-2 rounded-2xl animate-pulse bg-gray-200">
      {/* Profile Header */}
      <div className="flex items-center space-x-6">
        <div className="h-32 w-32 rounded-full bg-gray-300"></div>
        <div>
          <div className="h-8 w-48 bg-gray-300 rounded"></div>
          <div className="h-6 w-32 bg-gray-300 rounded mt-2"></div>
        </div>
      </div>

      {/* Profile Details */}
      <div className="mt-8 space-y-4">
        <div className="p-6">
          <div className="h-6 w-40 bg-gray-300 rounded mb-4"></div>
          <div className="h-4 w-64 bg-gray-300 rounded"></div>
          <div className="h-4 w-48 bg-gray-300 rounded mt-2"></div>
          <div className="h-4 w-56 bg-gray-300 rounded mt-2"></div>
        </div>
      </div>
    </div>
  );
}
