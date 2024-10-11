document.addEventListener('DOMContentLoaded', () => {
    
    fetch('http://localhost:3000/tankonyvek')
        .then(response => response.json()) 
        .then(data => {
           
            const datalist = document.getElementById('tankonyvek-lista');
            
            data.forEach(tankonyv => {
                const option = document.createElement('option');
                option.value = tankonyv.tk_nev; 
                datalist.appendChild(option); 
            });
        })
        .catch(error => {
            console.error('Hiba a tankönyvek betöltése során:', error);
        });
});

function temaKivalasztas() {
    let tankonyv = document.getElementById('tankonyv').value;
    
    fetch(`http://localhost:3000/temak/${encodeURIComponent(tankonyv)}`)
        .then(response => response.json())
        .then(data => {
            const datalist = document.getElementById('temak-lista');
            datalist.innerHTML = ''; 
            
            data.forEach(tema => {
                const option = document.createElement('option');
                option.value = tema.f_tema;  
                datalist.appendChild(option); 
            });
        })
        .catch(error => {
            console.error('Hiba a témák betöltése során:', error);
        });
}

function oratervGeneralas() {
    let tema = document.getElementById('tema').value;

    fetch(`http://localhost:3000/feladatok/${encodeURIComponent(tema)}`)
        .then(response => response.json())
        .then(data => {
            const oraterv = document.getElementById('oraterv-tabla');

            const feladatok = data.slice(0, 6);

            feladatok.forEach(feladat => {
                const row = document.createElement('tr');

                const timeCell = document.createElement('td');
                const timeInput = document.createElement('input');
                timeInput.type = 'text';
                timeCell.appendChild(timeInput);
                row.appendChild(timeCell);

                const leirasCell = document.createElement('td');
                leirasCell.textContent = feladat.f_leiras;
                row.appendChild(leirasCell);

                const modszerekCell = document.createElement('td');
                modszerekCell.textContent = feladat.f_modszerek;
                row.appendChild(modszerekCell);

                const munkaformakCell = document.createElement('td');
                munkaformakCell.textContent = feladat.f_munkaformak;
                row.appendChild(munkaformakCell);

                const eszkozokCell = document.createElement('td');
                eszkozokCell.textContent = feladat.f_eszkozok;
                row.appendChild(eszkozokCell);

                const megjegyzesCell = document.createElement('td');
                const megjegyzesInput = document.createElement('input');
                megjegyzesInput.type = 'text';
                megjegyzesCell.appendChild(megjegyzesInput);
                row.appendChild(megjegyzesCell);

                oraterv.appendChild(row);
            });
        })
        .catch(error => {
            console.error('Hiba a feladatok betöltése során:', error);
        });
}

function exportPDF() {
    
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({
        orientation: "landscape",
        format: [900, 500]
    });

    doc.setFont('Noto_Sans', 'normal');
    doc.addFileToVFS('NotoSans-Regular.ttf', '<BASE64 TARTALOM>');
    doc.addFont('NotoSans-Regular.ttf', 'NotoSans', 'normal');

    const nev = document.querySelector('input[name="nev"]').value;
    const muvTerulet = document.querySelector('input[name="muv_terulet"]').value;
    const tantargy = document.querySelector('input[name="tantargy"]').value;
    const osztaly = document.querySelector('input[name="osztaly"]').value;
    const cel = document.querySelector('textarea[name="cel"]').value;
    const didaktikaiFeladatok = document.querySelector('input[name="didaktikai_feladatok"]').value;
    const tantargyiKapcs = document.querySelector('input[name="tantargyi_kapcs"]').value;
    const forrasok = document.querySelector('textarea[name="forrasok"]').value;
    const datum = document.querySelector('input[name="datum"]').value;

   
    doc.text(`A pedagógus neve: ${nev}`, 10, 10);
    doc.text(`Műveltségi terület: ${muvTerulet}`, 10, 20);
    doc.text(`Tantárgy: ${tantargy}`, 10, 30);
    doc.text(`Osztály: ${osztaly}`, 10, 40);
    doc.text(`Dátum: ${datum}`, 10, 50);
    doc.text(`Az óra cél- és feladatrendszere: ${cel}`, 10, 60);
    doc.text(`Az óra didaktikai feladatai: ${didaktikaiFeladatok}`, 10, 70);
    doc.text(`Tantárgyi kapcsolatok: ${tantargyiKapcs}`, 10, 80);
    doc.text(`Felhasznált források: ${forrasok}`, 10, 90);

    
    doc.text(`Az óra menete:`, 10, 100);

   
    const rows = document.querySelectorAll('#oraterv-tabla tr');
    let currentY = 110;

    rows.forEach((row, rowIndex) => {
        const columns = row.querySelectorAll('td, th');
        let currentX = 10;
        columns.forEach((column) => {
            doc.text(column.innerText, currentX, currentY);
            currentX += 10;
        });
        currentY += 30;
    });

    
    doc.save('oraterv.pdf');
}
