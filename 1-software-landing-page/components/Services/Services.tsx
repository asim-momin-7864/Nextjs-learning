import React from "react";
import { Card } from "./Card";

export const Services = () => {
  return (
    <div className="w-full xl:max-w-5xl bg-slate-900 px-5 py-5 text-white flex flex-col gap-y-5 rounded-3xl">
      <div className="flex flex-col gap-y-5 sm:flex-row sm:justify-between">
        <div className="space-y-4 sm:w-1/2">
          <h3 className="font-bold text-lg">WHAT WE PROVIDE</h3>
          <h1 className="font-semibold text-3xl lg:text-4xl">
            Provide High Quality Software Services For All Industries
          </h1>
        </div>
        <div className="sm: my-auto">
          <button className="px-6 py-3 font-bold bg-blue-600 text-white rounded-2xl hover:bg-blue-500 transition-colors">
            ALL SERVICES
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
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
