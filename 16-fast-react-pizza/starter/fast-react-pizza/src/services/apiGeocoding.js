export async function getAddress({latitude, longitude}) {
  const res = await fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}`
  );
  if (!res.ok) throw Error("Failed getting address");

  const data = await res.json();
  return data;
}

// TODO: use this api for getting lat and lng
// // Function to fetch user location
// function fetchUserLocation() {
//   setIsLoading(true);
//   fetch("http://ip-api.com/json/")
//       .then((res) => res.json())
//       .then((data) => {
//         setMapPosition([data?.lat, data?.lon]);
//       })
//       .catch(() => alert("Cannot fetch current user location."))
//       .finally(() => setIsLoading(false));
// }
