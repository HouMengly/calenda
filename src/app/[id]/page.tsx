import { use } from "react";
import HomeComponent from "@/components/Home";

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);

  const res = use(fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/lcd/daily/${id}`,
    { 
      cache: "no-store",
      headers: {
        'Content-Type': 'application/json'
      }
    }
  ));

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const apiResponse = use(res.json());

  return (
    <div>
      <HomeComponent data={apiResponse.data} />
    </div>
  );
}