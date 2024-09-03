import { getKitchen } from "@/app/actions/kitchen";
import { Kitchen } from "@/app/lib/definitions";
import KitchenForm from "@/app/ui/kitchen/kitchen-form";
import KitchenTable from "@/app/ui/kitchen/kitchen-table";
import { auth } from "@/auth";

export default async function KitchenPage() {
    let items = await getKitchen();
    let dates = [] as string[];
    if (typeof items !== 'string') {
        dates = items.map((item) => item.createdAt.toISOString().split('T')[0]);
        dates = [...new Set(dates)];
    } else {
        items = [] as Kitchen[];
    }
    return (
        <div className="flex gap-4 pt-2 flex-col-reverse justify-end md:flex-row">
            <KitchenTable items={items} dates={dates} />
            <KitchenForm />
        </div>
    );
}