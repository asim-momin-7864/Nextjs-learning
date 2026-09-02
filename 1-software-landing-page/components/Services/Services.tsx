import React from "react";
import { Card } from "./Card";

export const Services = () => {
  return (
    <div className="w-full xl:max-w-5xl bg-blue-950 px-5 py-5 text-white flex flex-col gap-y-5">
      <div className="flex flex-col gap-y-5 sm:flex-row sm:justify-between">
        <div className="space-y-4 sm:w-1/2">
          <h3 className="font-bold text-lg">WHAT WE PROVIDE</h3>
          <h1 className="font-semibold text-3xl">
            Provide High Quality Software Services For All Industries
          </h1>
        </div>
        <div className="sm: my-auto">
          <button className="px-5 py-4 font-bold bg-blue-700 text-white rounded-2xl">
            ALL SERVICES
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-y-5 justify-items-center sm:grid-cols-2 lg:grid-cols-3">
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </div>
  );
};
