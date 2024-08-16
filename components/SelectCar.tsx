"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { Car } from "@/types";

interface SelectCarProps {
  selected: Car | null; // Controlled selected value
  setSelected: React.Dispatch<React.SetStateAction<Car | null>>; // Function to update the selected value on the parent component
}

export default function SelectCar({ selected, setSelected }: SelectCarProps) {
  const [cars, setCars] = useState<Car[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchCars() {
      try {
        if (!process.env.NEXT_PUBLIC_CARS_API) {
          throw new Error("Cars API not defined");
        }

        const response = await axios.get(process.env.NEXT_PUBLIC_CARS_API);
        setCars(response.data.Results);
      } catch (error) {
        console.log("Error trying to fetch cars: ", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchCars();
  }, []);

  return (
    <Listbox value={selected} onChange={setSelected}>
      <div className="relative mt-2 w-60 h-12 hover:cursor-pointer">
        <ListboxButton className="relative w-full h-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-primary sm:text-sm sm:leading-6">
          <span className="block truncate">
            {isLoading ? "Loading..." : selected?.MakeName ?? "Choose a car"}
          </span>
          <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
            <ChevronUpDownIcon
              aria-hidden="true"
              className="h-5 w-5 text-gray-400"
            />
          </span>
        </ListboxButton>

        <ListboxOptions
          transition
          className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none data-[closed]:data-[leave]:opacity-0 data-[leave]:transition data-[leave]:duration-100 data-[leave]:ease-in sm:text-sm"
        >
          {cars.map((car) => (
            <ListboxOption
              key={car.MakeId}
              value={car}
              className="group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 data-[focus]:bg-primary data-[focus]:text-white"
            >
              <span className="block truncate font-normal group-data-[selected]:font-semibold">
                {car.MakeName}
              </span>

              <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-primary group-data-[focus]:text-white [.group:not([data-selected])_&]:hidden">
                <CheckIcon aria-hidden="true" className="h-5 w-5" />
              </span>
            </ListboxOption>
          ))}
        </ListboxOptions>
      </div>
    </Listbox>
  );
}
