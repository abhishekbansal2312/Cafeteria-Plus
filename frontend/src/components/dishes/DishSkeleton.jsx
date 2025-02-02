import React from "react";

export default function DishSkeleton() {
  return (
    <div className="grid grid-cols-3 gap-4">
      {[...Array(6)].map((_, index) => (
        <div
          key={index}
          className="shadow-lg rounded-lg overflow-hidden border animate-pulse"
        >
          <div className="w-full h-48 bg-gray-300"></div>
          <div className="p-4 space-y-2">
            <div className="h-6 bg-gray-300 rounded w-3/4"></div>
            <div className="h-4 bg-gray-300 rounded w-full"></div>
            <div className="h-4 bg-gray-300 rounded w-1/2"></div>
            <div className="h-4 bg-gray-300 rounded w-1/3"></div>
            <div className="flex justify-between items-center mt-2">
              <div className="w-16 h-6 bg-gray-300 rounded"></div>
              <div className="w-24 h-8 bg-gray-300 rounded"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
