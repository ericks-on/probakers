import MonthlyChartTable from '@/app/ui/monthly-chart/monthly-chart-table';
import { MonthlyChart } from '../../lib/definitions';
import { getMonthlyChart } from '@/app/actions/monthly-chart';
export default async function MonthlyChartPage() {
    let monthlyChart = await getMonthlyChart();
    if (typeof monthlyChart === 'string') {
        monthlyChart = [];
    }
    return (
        <div className="flex gap-4 pt-2 flex-col-reverse justify-end md:flex-row">
            <MonthlyChartTable items={monthlyChart} />
        </div>
    );
}