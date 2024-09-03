import Sidebar from "../ui/sidebar";
import SignOutForm from "../ui/sign-out-form";

export default function InventoryLayout(
    { children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col justify-end md:justify-start md:flex-row h-screen relative" id="inventoryPage">
            <Sidebar />
            <div className="w-screen md:w-full h-full overflow-auto px-4">
                {children}
            </div>
            <SignOutForm />
        </div>
    );
}

// interface Props {
//     session: Session | null;
//     children: React.ReactNode;
// }

// export default function RootLayout({
//     session,
//     children,
// }: Props): JSX.Element {
//     return (
//         <SessionProvider session={session}>
//             <div className='flex flex-col justify-end md:justify-start md:flex-row h-screen relative'>
//                 <Sidebar />
//                 <div className="w-screen md:w-full h-full overflow-auto px-4">
//                     {children}
//                 </div>
//                 <SignOutForm />
//             </div>
//         </SessionProvider>
//     );
// }
