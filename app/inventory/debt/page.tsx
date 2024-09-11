import { getDebts } from "@/app/actions/debts";
import { Debt } from "@/app/lib/definitions";
import DebtTable from "@/app/ui/debts/debt-table";
import DebtsForm from "@/app/ui/debts/debts-form";

export default async function DebtPage() {
    let items = await getDebts();
    let dates = [] as string[];
    if (typeof items !== 'string') {
        if (items.length > 0) {
            dates = items.map((item) => item.createdat.toISOString().split('T')[0]);
            dates = [...new Set(dates)];
        }
    } else {
        items = [] as Debt[];
    }
    return (
        <div className="flex gap-4 pt-2 flex-col-reverse justify-end md:flex-row">
            <DebtTable items={items} dates={dates} />
            <DebtsForm />
        </div>
    );
}