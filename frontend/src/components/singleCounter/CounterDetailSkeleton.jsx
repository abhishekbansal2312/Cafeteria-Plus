import React from "react";

export default function CounterDetailSkeleton() {
  return (
    <div className="max-w-4xl mx-auto p-6 shadow-lg rounded-lg flex border-2 animate-pulse">
      <div className="flex-shrink-0 w-1/3 mr-6 bg-gray-300 h-64 rounded-lg"></div>
      <div className="flex-grow space-y-3">
        <div className="h-6 bg-gray-300 rounded w-3/4"></div>
        <div className="h-4 bg-gray-300 rounded w-full"></div>
        <div className="h-4 bg-gray-300 rounded w-1/2"></div>
        <div className="h-4 bg-gray-300 rounded w-1/3"></div>
      </div>
    </div>
  );
}
