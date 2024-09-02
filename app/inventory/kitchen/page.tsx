import KitchenForm from "@/app/ui/kitchen/kitchen-form";
import KitchenTable from "@/app/ui/kitchen/kitchen-table";
import { auth } from "@/auth";

export default async function KitchenPage() {
    return (
        <div className="flex gap-4 pt-2 flex-col-reverse justify-end md:flex-row">
            <KitchenTable />
            <KitchenForm />
        </div>
    );
}