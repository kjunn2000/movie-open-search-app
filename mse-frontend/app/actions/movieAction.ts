'use server'

import { revalidatePath } from "next/cache";
import { MovieListResp, OpenSearchCount } from "../types/movie";

export async function getMovieAction(movieName: any) {
    const url = "http://localhost:4566/restapis/kx0d4ma3qo/test/_user_request_/search";
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ movieName }),
    });
    try {
        const result = await response.json();
        console.log(`Successful fetch ${result?.hits?.total?.value} records.`)
        return result?.hits;
    }catch(e: any) {
        console.log(e)
    }
}