import { UserTable } from "@/components/admin/user-table/user-table";
import { Navbar } from "@/components/navbar/navbar";

export default function Page() {
  return (
    <div>
      <Navbar />
      <div className="p-4">
        <UserTable />
      </div>
    </div>
  );
}
