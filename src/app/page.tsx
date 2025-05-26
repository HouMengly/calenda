import HomeComponent from "@/components/Home";

interface HomeProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function Home({ searchParams }: HomeProps) {
  const { id } = searchParams;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_IMAGE_DOMAIN}/lcd/dfaily/${id}`,
    {
      cache: "no-store", // For dynamic data
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const apiResponse: ApiResponse = await res.json();

  return (
    <div>
      <HomeComponent data={apiResponse.data} />
    </div>
  );
}
