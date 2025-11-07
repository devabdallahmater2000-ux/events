"use client";

import { useActionState, useState } from "react";
import { createBooking } from "@/lib/actions/booking.action";

const BookEvent = ({ eventId, slug }: { eventId: string; slug: string }) => {
  // const [email, setEmail] = useState('');
  // const [submitted, setSubmitted] = useState(false);

  // const handleSubmit = async (e: React.FormEvent) => {
  //     e.preventDefault();

  //     try {
  //         const { success, } = await createBooking({ eventId, slug, email });

  //         if(success) {
  //             setSubmitted(true);
  //         } else {
  //             console.error('Booking creation failed:')
  //         }
  //     } catch (err) {
  //         console.error('Error submitting booking:')
  //     }
  // }
  const [state, action, pending] = useActionState(createBooking, undefined);

  return (
    <div id="book-event">
      <form action={action}>
        <div>
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email address"
          />
        </div>
        <input type="text" name="slug" defaultValue={slug} hidden />
        <input type="text" name="eventId" defaultValue={eventId} hidden />

        <button disabled={pending} type="submit" className="button-submit">
          Submit {pending && "...."}
        </button>
        {state && (
            state.success ? (<p className="text-green-600 mt-2 text-center">{state.message}</p>) : (
              <p className="text-red-600 mt-2 text-center">{state.message}</p>)
        )}
      </form>
    </div>
  );
};
export default BookEvent;
