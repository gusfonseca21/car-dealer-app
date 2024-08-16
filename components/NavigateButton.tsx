import { Button } from "@headlessui/react";
import { useRouter } from "next/navigation";
import React from "react";

interface Props {
  route: string; // When user clicks the button, navigate to this route
  disabled: boolean;
}

export default function NavigateButton({ route, disabled }: Props) {
  const router = useRouter();

  return (
    <Button
      onClick={() => router.push(route)}
      className={`${
        disabled ? "bg-gray-500 pointer-events-none" : "bg-primary"
      } w-20 flex justify-center items-center rounded-md px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary`}
    >
      Next
    </Button>
  );
}
