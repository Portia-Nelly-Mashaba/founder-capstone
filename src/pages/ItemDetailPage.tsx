import { useParams } from "react-router-dom";
import layout from "../components/layout/AppLayout.module.css";

export function ItemDetailPage() {
  const { id } = useParams<{ id: string }>();

  return (
    <div className={layout.page}>
      <h1 className={layout.pageTitle}>Item detail</h1>
      <div className={layout.placeholder}>Detail view for item {id} coming next.</div>
    </div>
  );
}
