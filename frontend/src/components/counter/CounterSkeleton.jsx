import React from "react";

const CounterSkeleton = () => {
  const count = 6;
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 mx-10 pt-4">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index}>
          <div className="shadow-lg rounded-lg overflow-hidden border-1 animate-pulse bg-gray-100">
            <div className="w-full h-48 bg-gray-300"></div>

            <div className="p-6">
              <div className="h-6 bg-gray-300 rounded w-3/4 mb-3"></div>
              <div className="h-4 bg-gray-300 rounded w-5/6 mb-3"></div>
              <div className="h-4 bg-gray-300 rounded w-1/2 mb-3"></div>
              <div className="h-4 bg-gray-300 rounded w-1/3 mb-3"></div>

              <div className="flex justify-between">
                <div className="h-10 w-10 bg-gray-300 rounded-full"></div>
                <div className="h-10 w-10 bg-gray-300 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CounterSkeleton;
