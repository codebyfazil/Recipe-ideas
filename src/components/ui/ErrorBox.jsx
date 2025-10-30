import React from "react";

export default function ErrorBox({ message, onRetry }) {
  return (
    <div className="p-4 bg-red-50 text-red-700 rounded-md">
      <div className="flex items-start justify-between">
        <div>{message}</div>
        <div>
          <button onClick={onRetry} className="ml-4 px-3 py-1 bg-red-600 text-white rounded-md">
            Retry
          </button>
        </div>
      </div>
    </div>
  );
}
