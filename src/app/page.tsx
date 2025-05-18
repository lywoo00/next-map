// import * as stores from "@/data/store_data.json";
import StorePage from "./components/StorePage";

export default async function Home() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/stores`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch stores");
  }
  const data = await res.json();
  console.log("res", data);
  return (
    <>
      <StorePage stores={data.allStores} />
    </>
  );
}
