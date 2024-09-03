import { getSales } from "@/app/actions/sales";
import { Sale } from "@/app/lib/definitions";
import SalesForm from "@/app/ui/sales/sales-form";
import SalesTable from "@/app/ui/sales/sales-table";

export default async function SalesPage() {
    let items = await getSales();
    let dates = [] as string[];
    if (typeof items !== 'string') {
        dates = items.map((item) => item.createdAt.toISOString().split('T')[0]);
        dates = [...new Set(dates)];
    } else {
        items = [] as Sale[];
    }
    return (
        <div className="flex gap-4 pt-2 flex-col-reverse justify-end md:flex-row">
            <SalesTable items={items} dates={dates} />
            <SalesForm />
        </div>
    );
}


// import SalesForm from "@/app/ui/sales/sales-form";
// import SalesTable from "@/app/ui/sales/sales-table";

// export default function SalesPage() {
//     return (
//         <div className="flex gap-4 pt-2 flex-col-reverse justify-end md:flex-row">
//             <SalesTable />
//             <SalesForm />
//         </div>
//     );
// }