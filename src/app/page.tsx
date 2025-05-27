import { Kantumruy_Pro } from "next/font/google";
const kantumruy = Kantumruy_Pro({
  subsets: ["khmer", "latin"],
  weight: ["300", "400", "700"],
});

const page = () => {
  return (
    <div>
      <div
        className={`flex justify-center items-center text-2xl ${kantumruy.className}`}
      >
        សូមស្វាគមន៍មកកាន់ CDC Calendar
      </div>
      <div
        className={`flex justify-center items-center text-lg ${kantumruy.className}`}
      >
        សូមបញ្ចូលលេខសម្គាល់ Terminal 
      </div>
    </div>
  );
};

export default page;
