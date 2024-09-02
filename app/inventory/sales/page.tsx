import SalesForm from "@/app/ui/sales/sales-form";
import SalesTable from "@/app/ui/sales/sales-table";

export default function SalesPage() {
    return (
        <div className="flex gap-4 pt-2 flex-col-reverse justify-end md:flex-row">
            <SalesTable />
            <SalesForm />
        </div>
    );
}