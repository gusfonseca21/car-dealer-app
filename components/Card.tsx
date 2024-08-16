import { CarData } from "@/types";
import React from "react";

interface Props {
  carData: CarData;
  year: number;
}

export default function Card({ carData, year }: Props) {
  return (
    <div
      key={carData.Model_ID}
      className="w-64 flex flex-col items-center p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-black dark:border-gray-800"
    >
      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {carData.Model_Name}
      </h5>
      <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
        {`${carData.Make_Name} Year ${year}`}
      </p>
    </div>
  );
}
