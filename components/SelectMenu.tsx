"use client";

import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

interface SelectMenuProps<T> {
  items: T[]; // Recieves a generic array of items to be selected or null when data is not fetched
  labelKey?: keyof T; // This is the key in the item object that will be used as the label
  placeholder: string;
  selected: T | null; // Controlled selected value
  setSelected: React.Dispatch<React.SetStateAction<T | null>>; // Function to update the selected value on the parent component
}

export default function SelectMenu<T>({
  items,
  labelKey,
  placeholder,
  selected,
  setSelected,
}: SelectMenuProps<T>) {
  // Handles the display of the value of the item for objects or primites
  const displayValue = (item: T) => {
    if (typeof item === "object" && labelKey) {
      return (item as any)[labelKey] as unknown as string;
    }
    // Handle primitive types
    return item as unknown as string;
  };

  return (
    <Listbox value={selected} onChange={setSelected}>
      <div className="relative mt-2 w-60 h-12 hover:cursor-pointer">
        <ListboxButton className="relative w-full h-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-primary sm:text-sm sm:leading-6">
          <span className="block truncate">
            {selected !== null ? displayValue(selected) : placeholder}
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
          {items?.map((item, index) => (
            <ListboxOption
              key={index}
              value={item}
              className="group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 data-[focus]:bg-primary data-[focus]:text-white"
            >
              <span className="block truncate font-normal group-data-[selected]:font-semibold">
                {displayValue(item)}
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
