'use client'

function onClick() {
    if (document) {
        const printTableElement = document.getElementById('printTable');
        const dateOptionElement = document.getElementById('dateOption');
        const printButtonElement = document.getElementById('printButton');

        if (printTableElement && dateOptionElement && printButtonElement) {
            const printContents = printTableElement.innerHTML;
            const originalContents = document.body.innerHTML;

            document.body.innerHTML = printContents;
            dateOptionElement.style.display = 'none';
            printButtonElement.style.display = 'none';

            window.print();

            document.body.innerHTML = originalContents;
            dateOptionElement.style.display = 'block';
            printButtonElement.style.display = 'flex';
        }
    }

}
export default function PrintButton() {
    return (
        <button className="bg-green-500 text-white p-2 rounded-md ml-2" id="printButton"
            onClick={() => onClick()}
        >Print</button>
    )
}