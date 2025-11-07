export interface IEvent {
  _id :string;
  __v? :number;
  image: string;
  title: string;
  slug: string;
  location: string;
  date: string;
  time: string;
  description: string;
  overview: string;
  venue: string;
  mode: string;
  audience: string;
  organizer: string;
  agenda: string[];

}

// export const EVENTS: IEvent[] = [
//   {
//     image: "/images/event1.png",
//     title: "React Summit 2025",
//     slug: "react-summit-2025",
//     location: "Amsterdam, Netherlands",
//     date: "2025-11-15",
//     time: "09:00",
//   },
//   {
//     image: "/images/event2.png",
//     title: "JSConf EU 2026",
//     slug: "jsconf-eu-2026",
//     location: "Berlin, Germany",
//     date: "2026-03-20",
//     time: "10:00",
//   },
//   {
//     image: "/images/event3.png",
//     title: "AWS re:Invent 2025",
//     slug: "aws-reinvent-2025",
//     location: "Las Vegas, USA",
//     date: "2025-12-02",
//     time: "08:30",
//   },
//   {
//     image: "/images/event4.png",
//     title: "DevOpsDays Nairobi 2025",
//     slug: "devopsdays-nairobi-2025",
//     location: "Nairobi, Kenya",
//     date: "2025-11-28",
//     time: "09:30",
//   },
//   {
//     image: "/images/event5.png",
//     title: "HackMIT 2026",
//     slug: "hackmit-2026",
//     location: "Cambridge, MA, USA",
//     date: "2026-01-24",
//     time: "18:00",
//   },
//   {
//     image: "/images/event6.png",
//     title: "NG-Conf 2026",
//     slug: "ng-conf-2026",
//     location: "Salt Lake City, USA",
//     date: "2026-04-10",
//     time: "09:00",
//   },
// ];
