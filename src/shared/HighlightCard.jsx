import React from "react";

export default function HighlightCard({heading,measurement}) {
  return (
    <div className="grid grid-rows-3">
      <div className="backdrop-blur-lg bg-black/60 rounded-lg my-2 h-54 p-3 row-span-2">
        1
      </div>
      <div className="backdrop-blur-lg bg-black/60 rounded-lg my-2 h-30 p-3">
        <div>{heading}</div>
        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-end mt-2">
            <div className="mr-2 text-2xl font-semibold">{measurement?.value}</div>
            <div>{measurement?.type}</div>
          </div>
          <div>{measurement?.description}</div>
        </div>
      </div>
    </div>
  );
}
