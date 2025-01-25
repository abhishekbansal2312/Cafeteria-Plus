import React from "react";

export default function UserSkeleton() {
  return Array.from({ length: 18 }).map((_, index) => (
    <li className="flex flex-col p-2 border-b border-amber-600 animate-pulse pb-1 mx-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <div className="flex-1">
          <div className="h-4 bg-gray-700 rounded w-32 mb-2"></div>
          <div className="h-3 bg-gray-700 rounded w-24"></div>
        </div>
        <div className="flex mt-2 sm:mt-0 space-x-2">
          <div className="h-7 w-16 bg-gray-700 rounded"></div>
          <div className="h-7 w-16 bg-gray-700 rounded"></div>
        </div>
      </div>
    </li>
  ));
}
