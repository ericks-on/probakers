'use client'

function onClick() {
    var printContents = document.getElementById('printTable').innerHTML;
    var originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;
    document.getElementById('dateOption').style.display = 'none';
    document.getElementById('printButton').style.display = 'none';

    window.print();

    document.body.innerHTML = originalContents;
    document.getElementById('dateOption').style.display = 'block';
    document.getElementById('printButton').style.display = 'flex';
}
export default function PrintButton() {
    return (
        <button className="bg-green-500 text-white p-2 rounded-md ml-2" id="printButton"
            onClick={() => onClick()}
        >Print</button>
    )
}