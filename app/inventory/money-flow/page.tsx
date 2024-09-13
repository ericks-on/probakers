import { getMoneyFlows } from "@/app/actions/money-flow";
import MoneyFlowForm from "@/app/ui/money-flow/money-flow-form";
import MoneyFlowTable from "@/app/ui/money-flow/money-flow-table";

export default async function MoneyFlowPage() {
    let items = await getMoneyFlows();
    let dates = [] as string[];

    if (typeof items !== 'string') {
        if (items.length > 0) {
            dates = items.map((item) => item.createdat.toISOString().split('T')[0]);
            dates = [...new Set(dates)];
        }
    } else {
        items = [];
    }
    return (
        <div className="container min-96 shadow w-full md:max-h-screen overflow-auto">
            <div className="flex gap-4 pt-2 flex-col-reverse justify-end md:flex-row">
                <MoneyFlowTable dates={dates} items={items} />
                <MoneyFlowForm />
            </div>
        </div>
    )
}