import EventCard from "@/components/EventCard";
import ExplorBtn from "@/components/ExplorBtn";
import { IEvent } from "@/lib/constants";

// Revalidate this route every hour (3600 seconds).
export const revalidate = 3600;

const page = async () => {
  // Use a relative path so Next treats this as an internal fetch and can apply caching.
  const res = await fetch(`/api/events`, { next: { revalidate } });

  const { events } = await res.json();
  return (
    <section>
      <h1 className="text-center">
        The Hub for Every Dev Event <br /> You Mustn't Miss
      </h1>
      <p className="text-center mt-5">Hackathons , Meetups , Conferences , All in One Place</p>

      <ExplorBtn />

      <div className="mt-20 space-y-7">
        <h3>Featured Events</h3>
        <div className="events">
          {events?.map((event: IEvent) => (
            <div key={event.title}>
              <EventCard {...event} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default page;
