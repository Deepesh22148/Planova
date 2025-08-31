// i will expect a list of places and i wil call placeapi

const fetchPlaces = async (place: string) => {
  // -1 status failed
  try {
    const params = new URLSearchParams({
      query: place,
      limit: "1",
    });

    const response = await fetch(
      `https://places-api.foursquare.com/places/search?${params}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${process.env.FOURSQUARE_API_KEY}`,
          "X-Places-Api-Version": "2025-06-17",
        },
      }
    );

    if (!response.ok) {
      console.log("Error : Fetching from Foursquare failed");
      return {
        latitude: 0,
        longitude: 0,
        status: -1,
        name: "",
        address: "",
      };
    }

    const { results } = await response.json();
    console.log(results[0]);

    return {
      status: 1,
      latitude: results[0].latitude,
      longitude: results[0].longitude,
      name: results[0].name,
      address: results[0]?.location?.formatted_address,
    };
  } catch (err) {
    console.log(place, "for which i am getting error" , err);
    return {
      latitude: 0,
      longitude: 0,
      status: -1,
      name: "",
      address: "",
    };
  }
};

export { fetchPlaces };
