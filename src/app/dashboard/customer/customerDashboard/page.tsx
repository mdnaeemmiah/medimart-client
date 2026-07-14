import CustomerGraph from "@/components/modules/graph/CustomerGraph";

export const dynamic = "force-dynamic";


export default function UserDashboard() {

    return (
      <div className="py-4">
        <div className="min-h-screen">
          <CustomerGraph></CustomerGraph>
        </div>
      </div>
    );
  }

