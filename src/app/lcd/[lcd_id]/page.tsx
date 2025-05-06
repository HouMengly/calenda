import { use } from "react";
import Home from "@/components/Home";

export default function Page({ params }: { params: Promise<{ lcd_id: string }> }) {
  const { lcd_id } = use(params);
  return <Home lcd_id={lcd_id} />;
}
