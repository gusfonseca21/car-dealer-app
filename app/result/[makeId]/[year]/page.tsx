import { Suspense } from "react";
import Card from "@/components/Card";
import { CarData } from "@/types";
import { fetchCarData } from "@/lib/api"; // Move fetchCarData to a separate file
import axios from "axios";

const LoadingPlaceholder = () => (
  <div className="p-4 text-gwhite text-4xl">Loading...</div>
);

export default function ResultPage({ params }: any) {
  return (
    <>
      <Suspense fallback={<LoadingPlaceholder />}>
        <h2 className="font-custom text-6xl uppercase tracking-widest">
          Car models by year
        </h2>
        <ResultPageContent params={params} />
      </Suspense>
    </>
  );
}

async function ResultPageContent({ params }: any) {
  const { makeId, year } = params;
  const carDataResult = await fetchCarData(makeId, year);
  const carData: CarData[] = carDataResult.Results;

  return (
    <div className="w-full flex flex-row flex-wrap overflow-auto justify-center gap-20 mt-10 p-10">
      {carData.map((car) => (
        <Card key={car.Model_ID} carData={car} year={year} />
      ))}
    </div>
  );
}

// Static params for the dynamic routes
export async function generateStaticParams() {
  try {
    if (!process.env.NEXT_PUBLIC_CARS_API) {
      throw new Error("Cars API not defined");
    }

    const response = await axios.get(process.env.NEXT_PUBLIC_CARS_API);
    const cars = response.data.Results;

    const carModelYears = [
      2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015,
    ];

    // Generate paths for each car make and year
    const paths = cars.flatMap((car: { MakeId: number }) =>
      carModelYears.map((year) => ({
        makeId: car.MakeId.toString(),
        year: year.toString(),
      }))
    );

    return paths;
  } catch (error) {
    console.error("Error fetching car data:", error);
    return [];
  }
}
