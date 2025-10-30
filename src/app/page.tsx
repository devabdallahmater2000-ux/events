import EventCard from "@/components/EventCard";
import ExplorBtn from "@/components/ExplorBtn";
import { EVENTS } from "@/lib/constants";


const page = () => {
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
          {EVENTS.map((event) => (
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
