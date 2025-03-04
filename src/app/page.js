"use client";
import PlantesSearch from "@/app/components/PlantesSearch";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-start min-h-screen bg-gray-100 p-6">
      <div className="max-w-2xl text-center mt-4">
        <p className="text-lg text-gray-700 mb-6">
          Assurez la sécurité de votre chat en vérifiant rapidement si une
          plante ou une fleur est toxique, et évitez ainsi les dangers pour
          votre compagnon félin !
        </p>
        <PlantesSearch />
      </div>
    </main>
  );
}
