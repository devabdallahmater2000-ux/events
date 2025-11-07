import { EventDetails } from "@/components/EventDetails";
import  { Suspense } from "react";

export default function EventPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return (
    <Suspense
      fallback={<div className="text-center">Loading event details...</div>}
    >
      <EventDetails params={params} />
    </Suspense>
  );
}
