import { getEventsBetweenDates } from "@/server/actions/Event";

export default function Home() {
  const today = new Date();
  const todaymin30 = new Date();
  todaymin30.setDate(todaymin30.getDate() - 10000);
  getEventsBetweenDates(todaymin30, today);
  return <h1>Home page</h1>;
}
