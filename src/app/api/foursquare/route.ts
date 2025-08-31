import dbConnect from "@/lib/dbConnect";
import PlaceModel, { placeDescriptionType } from "@/models/place.model";
import { getPlaceDescription } from "@/workers/chatgpt";
import { fetchPlaces } from "@/workers/foursquare";
import { NextRequest, NextResponse } from "next/server";

function safeParse(input: string) {
  try {
    return JSON.parse(input);
  } catch (err) {
    console.error("Failed to parse:", err);
    return null;
  }
}

const savePlacesToDB = async (placesData: placeDescriptionType[]) => {
  await dbConnect();

  try {
    for (const place of placesData) {
      const exists = await PlaceModel.findOne({
        name: place.name,
        address: place.address,
      });

      if (!exists) {
        await PlaceModel.create(place);
        console.log(`Inserted: ${place.name}`);
      } else {
        console.log(`Skipped (already exists): ${place.name}`);
      }
    }
    console.log("Finished checking and inserting places.");
  } catch (err) {
    console.error("Error saving places:", err);
  }
};

export async function POST(req: NextRequest) {
  try {
    const { places_for_lookup } = await req.json();

    const promises = places_for_lookup.map(async (place: string) => {
      try {
        const foursquareResponse = await fetchPlaces(place);

        if (foursquareResponse.status === -1) return null;

        // Now send both name and address to GPT
        const descriptionResponse = await getPlaceDescription(
          foursquareResponse.name,
          foursquareResponse.address
        );

        const JSONdescription = safeParse(descriptionResponse);
        if (!JSONdescription) return null;

        return {
          ...foursquareResponse,
          ...JSONdescription,
        };
      } catch (err) {
        console.error("Error for place:", place, err);
        return null;
      }
    });

    const settled = await Promise.allSettled(promises);

    const result = settled
      .filter((p) => p.status === "fulfilled" && p.value)
      .map((p) => (p as PromiseFulfilledResult<any>).value);

    await savePlacesToDB(result);

    return NextResponse.json({
      message: "Received POST request",
      data: result,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Error processing request", error: (error as Error).message },
      { status: 500 }
    );
  }
}
