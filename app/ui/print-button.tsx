'use client'

function onClick() {
    if (document) {
        const printTableElement = document.getElementById('printTable');

        if (printTableElement ) {
            const printContents = printTableElement.innerHTML;
            const originalContents = document.body.innerHTML;

            document.body.innerHTML = printContents;
            
            const dateOptionElement = document.getElementById('dateOption');
            const printButtonElement = document.getElementById('printButton');
            const actionsHeaderElement = document.getElementById('actions-col');
            const actionsRowsElement = document.getElementsByClassName('actions-val') as HTMLCollectionOf<HTMLElement>;
            if (dateOptionElement && printButtonElement && actionsHeaderElement && actionsRowsElement) {
                dateOptionElement.style.display = 'none';
                printButtonElement.style.display = 'none';
                actionsHeaderElement.style.display = 'none';
                for (let i = 0; i < actionsRowsElement.length; i++) {
                    actionsRowsElement[i].style.display = 'none';
                }
            }

            window.print();
            window.location.reload();

            document.body.innerHTML = originalContents;
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