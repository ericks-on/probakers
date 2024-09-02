import UserForm from "@/app/ui/users/user-form";
import UserTable from "@/app/ui/users/user-table";

export default function AddUsers() {
    return (
        <div className="flex gap-4 pt-2 flex-col-reverse justify-end md:flex-row">
            <UserTable />
            <UserForm />
        </div>
    );
}