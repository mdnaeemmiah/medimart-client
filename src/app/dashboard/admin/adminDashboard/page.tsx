import AdminGraph from "@/components/modules/graph/AdminGraph";


export default function UserDashboard() {
    return (
      <div>
        <div className="min-h-[100vh] rounded-xl bg-muted mt-4">
          <AdminGraph></AdminGraph>
        </div>
      </div>
    );
  }