import React from "react";

export default function CartSkeleton() {
  return (
    <div className="p-6 rounded-lg border shadow-xl max-w-6xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4 border-b pb-3 flex items-center gap-2">
        <div className="w-8 h-8 bg-gray-300 animate-pulse rounded-full"></div>
        <div className="w-20 h-6 bg-gray-300 animate-pulse rounded"></div>
      </h2>

      <div className="flex flex-col lg:flex-row gap-10">
        <div className="flex-1 space-y-4">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="p-4 bg-gray-200 animate-pulse rounded">
              <div className="h-6 w-3/4 bg-gray-300 mb-2"></div>
              <div className="h-4 w-1/2 bg-gray-300"></div>
            </div>
          ))}
        </div>
        <div className="flex-1 p-4 bg-gray-200 animate-pulse rounded">
          <div className="h-8 w-3/4 bg-gray-300 mb-2"></div>
          <div className="h-4 w-1/2 bg-gray-300"></div>
        </div>
      </div>
    </div>
  );
}
