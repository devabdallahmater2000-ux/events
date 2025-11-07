import EventCard from "@/components/EventCard";
import ExplorBtn from "@/components/ExplorBtn";
import {IEvent } from "@/lib/constants";
// removed invalid `cacheLife` import — use Next fetch caching options instead

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const page = async () => {
  // Server component — use Next's fetch caching options instead of an unsupported directive
  const res = await fetch(`${BASE_URL}/api/events`, { next: { revalidate: 3600 } });

  const { events } = await res.json();
  console.log({ events });
  return (
    <section>
      <h1 className="text-center">
        The Hub for Every Dev Event <br /> You Mustn't Miss
      </h1>
      <p className="text-center mt-5">
        Hackathons , Meetups , Conferences , All in One Place
      </p>

      <ExplorBtn />

      <div className="mt-20 space-y-7">
        <h3>Featured Events</h3>
        <div className="events ">
          {events.map((event: IEvent) => (
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
