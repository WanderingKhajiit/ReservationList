import type { MetaFunction } from "@remix-run/node";
import Dashboard from "../layout/Dashboard";
import Menu from "../layout/Menu";
import { today } from "../utils/date-time";
import useQuery from "../utils/useQuery";

export const meta: MetaFunction = () => {
  return [
    { title: "ReservationList" },
    { name: "description", content: "Welcome to Clam Broulette" },
  ];
};

export default function Index() {
  const query = useQuery();
  const date = query.get("date");
  return (
    <div>
      <Dashboard date={date ? date : today()}/>
    </div>
  );
}
