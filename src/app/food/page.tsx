import { Header } from "@/components/layout/Header";
import { BottomNav } from "@/components/layout/BottomNav";
import { Divider } from "@/components/ui/Divider";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { RestaurantCard } from "@/components/food/RestaurantCard";
import { restaurants, recommendedRestaurant } from "@/data/restaurants";

export default function FoodPage() {
  const recommended = restaurants.find((r) => r.id === recommendedRestaurant);

  return (
    <>
      <Header title="Lunch" backHref="/" />
      <main className="max-w-[560px] mx-auto px-5 pt-6 with-bottom-nav fade-in">
        <section>
          <Eyebrow>Gdzie na lunch</Eyebrow>
          <h1 className="page-title mt-2">Trzy opcje</h1>
          <p className="italic-subtitle mt-2">Żadnych rezerwacji.</p>
          <p className="text-sm text-fg-muted mt-3 leading-relaxed">
            Wszystkie trzy są na Victoria Street lub obok — możecie wybrać na miejscu
            patrząc przez okna. 60 minut na lunch (13:15–14:15), potem ruszacie pod górkę na zamek.
          </p>
        </section>

        <Divider ornament="star" />

        <section className="space-y-4">
          {restaurants.map((restaurant) => (
            <RestaurantCard
              key={restaurant.id}
              restaurant={restaurant}
              recommended={restaurant.id === recommendedRestaurant}
            />
          ))}
        </section>

        <Divider ornament="thistle" />

        {recommended && (
          <section className="border border-border-subtle bg-bg-secondary rounded-lg p-5">
            <Eyebrow color="accent">Moja rekomendacja</Eyebrow>
            <p className="font-display text-xl mt-2 leading-tight">
              {recommended.name}
            </p>
            <p className="text-sm text-fg-secondary mt-2 leading-relaxed">
              Klasyka, duży lokal bez rezerwacji, przewidywalny czas (30–40 min), a
              haddock supper to szkocki kanon. Plan B: jeśli będzie kolejka, Oink
              obok — kanapka w 5 minut i idziecie jeść na murku.
            </p>
          </section>
        )}

        <Divider ornament="cross" />
      </main>
      <BottomNav />
    </>
  );
}
