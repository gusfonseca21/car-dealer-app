"use client";

import NavigateButton from "@/components/NavigateButton";
import SelectCar from "@/components/SelectCar";
import SelectMenu from "@/components/SelectMenu";
import { Car } from "@/types";
import { useState } from "react";

export const carModelYears = [
  2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015,
];

export default function Home() {
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);

  return (
    <>
      <h1 className="font-custom text-6xl uppercase tracking-widest">
        Your Next Ride Awaits
      </h1>
      <p className="text-xl">
        Explore our diverse fleet of cars designed for comfort and performance
      </p>
      <div className="w-full flex flex-col items-center gap-10 justify-center mt-10">
        <SelectCar selected={selectedCar} setSelected={setSelectedCar} />
        <SelectMenu
          items={carModelYears}
          labelKey="toString"
          placeholder="Choose a model year"
          selected={selectedYear}
          setSelected={setSelectedYear}
        />
        <NavigateButton
          disabled={!selectedCar || !selectedYear}
          route={`/result/${selectedCar?.MakeId}/${selectedYear}`}
        />
      </div>
    </>
  );
}
