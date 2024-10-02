import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "@remix-run/react";
import { readReservation, updateReservation } from "../utils/api";
import ReservationErrors from "../errors/ReservationErrors";
import ReservationForm from "../reservation/reservationForm";
import { hasValidDateAndTime } from "../reservation/reservationValidate";

export default function ReservationEdit(){
  const initialReservationState = {
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: 0,
  };

  const [reservation, setReservation] = useState({
    ...initialReservationState,
  });
  const [reservationErrors, setReservationErrors] = useState(null);
  const { reservation_id } = useParams();
  

  useEffect(() => {
    const abortController = new AbortController();
    setReservationErrors(null);
    readReservation(reservation_id, abortController.signal)
      .then((data) => {
        setReservation(data)
        console.log(data)
      })
      .catch(setReservationErrors);

    return () => abortController.abort();
  }, [reservation_id]);

  const changeHandler = (event) => {
    if (event.target.name === "people") {
      setReservation({
        ...reservation,
        [event.target.name]: Number(event.target.value),
      });
      
    } else {
      setReservation({
        ...reservation,
        [event.target.name]: event.target.value,
      });
      
    }
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    const abortController = new AbortController();

    const errors = hasValidDateAndTime(reservation);
    if (errors.length) {
      return setReservationErrors(errors);
    }

    try {
      await updateReservation(reservation, abortController.signal);
      ///*then(() => history(`/?date=${reservation.reservation_date}`));*/
    } catch (error) {
      setReservationErrors([error]);
    }

    return () => abortController.abort();
  };

  return (
    <section>
      <h2>Edit Reservation:</h2>
      <ReservationErrors errors={reservationErrors} />
      <ReservationForm
        reservation={reservation}
        changeHandler={changeHandler}
        submitHandler={submitHandler}
      />
    </section>
  );
};