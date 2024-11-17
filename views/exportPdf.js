function exportPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({
        orientation: "landscape",
        format: [900, 500]
    });

    doc.addFileToVFS('NotoSans-Regular.ttf', '<BASE64_CONTENT>');
    doc.addFont('NotoSans-Regular.ttf', 'NotoSans', 'normal');
    doc.setFont('NotoSans', 'normal');


    const headerData = {
        név: document.querySelector('input[name="név"]').value,
        MűveltségiTerulet: document.querySelector('input[name="muv_terulet"]').value,
        tantargy: document.querySelector('input[name="tantargy"]').value,
        osztaly: document.querySelector('input[name="osztaly"]').value,
        datum: document.querySelector('input[name="datum"]').value,
        cel: document.querySelector('textarea[name="cel"]').value,
        didaktikaiFeladatok: document.querySelector('input[name="didaktikai_feladatok"]').value,
        tantargyiKapcs: document.querySelector('input[name="tantargyi_kapcs"]').value,
        forrasok: document.querySelector('textarea[name="forrasok"]').value
    };

    let y = 10;
    Object.entries(headerData).forEach(([key, value]) => {
        doc.text(`${key}: ${value}`, 10, y);
        y += 10;
    });

    doc.text('Az óra menete:', 10, y + 10);

    const rows = document.querySelectorAll('#oraterv-tabla tr');
    let currentY = y + 20;

    rows.forEach(row => {
        let currentX = 10;
        const columns = row.querySelectorAll('td');
        columns.forEach(column => {
            doc.text(column.innerText || "", currentX, currentY);
            currentX += 40;
        });
        currentY += 10;
    });

    doc.save('oraterv.pdf');
}