import { useParams } from "react-router-dom";
import layout from "../components/layout/AppLayout.module.css";

export function BookingPage() {
  const { id } = useParams<{ id: string }>();

  return (
    <div className={layout.page}>
      <h1 className={layout.pageTitle}>Book item</h1>
      <div className={layout.placeholder}>Booking flow for item {id} coming next.</div>
    </div>
  );
}
