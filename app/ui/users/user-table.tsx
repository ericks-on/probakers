import { Suspense } from "react";
import TableSkeleton from "@/app/ui/skeletons/table-skeleton";
import { getUsers, deleteUser } from "@/app/actions/users";
import DeleteButton from "../delete-button";
import { CiCalendarDate, CiUser } from "react-icons/ci";
import { auth } from "@/auth";
import { User } from "@/app/lib/definitions";

export default async function UserTable() {
    let items = await getUsers();
    if (typeof items === 'string') {
        items = [];
    } else {
        items = items as User[];
    }
    const session = await auth();
    let username = null;
    if (session) {
        username = session.user?.info.username
    }

    return (
        <Suspense fallback={<TableSkeleton />}>
            <div className="container min-96 shadow w-full md:max-h-screen overflow-auto">
                <h1 className="text-2xl text-green-800 font-bold p-2">Users</h1>
                <table className="w-full mt-6 border-t">
                    <thead className="border-b-2 border-green-300">
                        <tr>
                            <th className="px-4 py-3 text-left text-gray-800 max-w-[200px] truncate">Date</th>
                            <th className="px-4 py-3 text-left text-gray-800 max-w-[200px] truncate">Name</th>
                            <th className="px-4 py-3 text-left text-gray-800 max-w-[150px] truncate">Email</th>
                            <th className="px-4 py-3 text-left text-gray-800 max-w-[150px] truncate">Username</th>
                            <th className="px-4 py-3 text-left text-gray-800 max-w-[150px] truncate">Role</th>
                            <th className="px-4 py-3 text-left text-gray-800 max-w-[150px] truncate">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item, index) => (
                            <tr key={index} className="border-b">
                                <td className="px-4 py-3 text-sm text-gray-800 bg-green-50 max-w-[200px] truncate flex gap-2 items-center">
                                    <CiCalendarDate className="text-green-500" />
                                    {item.createdat.toLocaleString()}
                                </td>
                                <td className="px-4 py-3 text-sm text-gray-800 bg-green-50 max-w-[200px] truncate"> 
                                    <div className="flex items-center gap-2">
                                        <CiUser className="text-green-500" />
                                        <span>{item.name}</span>
                                    </div>
                                </td>
                                <td className="px-4 py-3 text-sm text-gray-800 bg-green-50 max-w-[150px] truncate">{item.email}</td>
                                <td className="px-4 py-3 text-sm text-gray-800 bg-green-50 max-w-[150px] truncate">{item.username}</td>
                                <td className="px-4 py-3 text-sm text-gray-800 bg-green-50 max-w-[150px] truncate">{item.role}</td>
                                <td className="px-4 py-3 text-sm text-gray-800 bg-green-50 max-w-[150px] truncate">
                                    <DeleteButton id={item.id} deleteFunction={deleteUser}
                                        aria={username === item.username} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Suspense>
    );
}