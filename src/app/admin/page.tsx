import { UserTable } from "@/components/admin/user-table/user-table";
import { Navbar } from "@/components/navbar/navbar";

export default async function Page() {
  return (
    <div>
      <Navbar />
      <div className="p-4">
        <h2>Application users</h2>
        <UserTable />
      </div>
    </div>
  );
}
