import axios from 'axios';

export async function fetchCarData(makeId: number, year: number) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_CARSDATA_API;

    if (!baseUrl) {
      throw new Error('Cars data API URL not defined');
    }

    const url = baseUrl
      .replace('{makeId}', makeId.toString())
      .replace('{year}', year.toString());

    const response = await axios.get(url);

    return response.data;
  } catch (error) {
    console.log('Error trying to fetch car data: ', error);
    throw error;
  }
}
