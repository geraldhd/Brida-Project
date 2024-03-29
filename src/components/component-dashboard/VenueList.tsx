import Venue from "./VenueCart";
import { useEffect, useState, useRef } from "react";

type KotaType = {
  id: number;
  kota: string;
  Venue: VenueType[];
};

type VenueType = {
  venue_id: number;
  nama: string;
  gambar: string;
};

export default function VenueCart() {
  const [data, setData] = useState<KotaType[]>();
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://mocki.io/v1/98dd4af9-41ae-446f-8801-d8332014bc7f")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, []);
  if (isLoading) return <p className="text-center">Loading popular venue</p>;
  if (!data) return <p className="text-center">No data found</p>;

  const venueMataram = data.find((item) => item.id === 1);
  const venueLoteng = data.find((item) => item.id === 2);

  return (
    <div className="w-full">
      <h2 className="text-lg sm:text-xl md:text-2xl mt-10 font-bold lg:text-3xl">Popular venue</h2>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-8 md:grid-cols-4 lg:grid-cols-5 md:gap-8 mt-2 sm:mt-4"> 
        {venueMataram?.Venue.map((item) => (
          <Venue
            key={item.venue_id}
            kota={venueMataram.kota}
            nama={item.nama}
            gambar={item.gambar}
          />
        ))}
        {venueLoteng?.Venue.map((item) => (
          <Venue
            key={item.venue_id}
            kota={venueLoteng.kota}
            nama={item.nama}
            gambar={item.gambar}
          />
        ))}
      </div>
    </div>
  );
}
