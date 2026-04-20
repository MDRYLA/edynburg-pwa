import { Header } from "@/components/layout/Header";
import { BottomNav } from "@/components/layout/BottomNav";
import { Divider } from "@/components/ui/Divider";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { PlaceCard } from "@/components/places/PlaceCard";
import { placesList } from "@/data/places";

export default function PlacesPage() {
  return (
    <>
      <Header title="Miejsca" backHref="/" />
      <main className="max-w-[560px] mx-auto px-5 pt-6 with-bottom-nav fade-in">
        <section>
          <Eyebrow>Sześć atrakcji</Eyebrow>
          <h1 className="page-title mt-2">Miejsca</h1>
          <p className="italic-subtitle mt-2">
            Każda z nich bardziej interesująca <em>po</em> niż <em>przed</em>.
          </p>
        </section>

        <Divider ornament="star" />

        <section className="space-y-3">
          {placesList.map((place) => (
            <PlaceCard key={place.slug} place={place} />
          ))}
        </section>

        <Divider ornament="cross" />
      </main>
      <BottomNav />
    </>
  );
}
