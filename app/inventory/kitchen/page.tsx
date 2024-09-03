import { getKitchen } from "@/app/actions/kitchen";
import KitchenForm from "@/app/ui/kitchen/kitchen-form";
import KitchenTable from "@/app/ui/kitchen/kitchen-table";
import { auth } from "@/auth";

export default async function KitchenPage() {
    const items = await getKitchen();
    let dates = [];
    if (items !== 'Error fetching kitchen items') {
        dates = items.map((item) => item.createdAt.toISOString().split('T')[0]);
        dates = [...new Set(dates)];
    }
    return (
        <div className="flex gap-4 pt-2 flex-col-reverse justify-end md:flex-row">
            <KitchenTable items={items} dates={dates} />
            <KitchenForm />
        </div>
    );
}