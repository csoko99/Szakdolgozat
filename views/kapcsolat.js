const url = 'pti.unithe.hu:13002';
document.addEventListener('DOMContentLoaded', () => {
    fetch(`http://${url}/tankonyvek`)
        .then(response => response.json())
        .then(data => {
            const datalist = document.getElementById('tankonyvek-lista');
            data.forEach(tankonyv => {
                const option = document.createElement('option');
                option.value = tankonyv.tk_nev;
                option.dataset.tk_id = tankonyv.tk_id;
                datalist.appendChild(option);
            });
        })
        .catch(error => {
            console.error('Error loading textbooks:', error);
        });
});

function temaKivalasztas() {
    const tankonyvInput = document.getElementById('tankonyv');
    const selectedOption = Array.from(document.querySelectorAll('#tankonyvek-lista option'))
        .find(option => option.value === tankonyvInput.value);

    if (!selectedOption) {
        console.error('No textbook selected.');
        return;
    }

    const tk_id = selectedOption.dataset.tk_id;
    const apiURL = `http://${url}/tankonyvek/temak/${tk_id}`;
    console.log(apiURL);
    fetch(apiURL)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }
            return response.json();
        })
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
            console.error('Error loading topics:', error);
        });
}

function oratervGeneralas() {
    const tema = document.getElementById('tema').value;
    fetch(`http://${url}/feladatok/${encodeURIComponent(tema)}`)
        .then(response => response.json())
        .then(data => {
            const oraterv = document.getElementById('oraterv-tabla');
            const kepek = document.getElementById('feladat_kepek');

            const feladatok = data.slice(0, 6);
            feladatok.forEach(feladat => {
                const row = document.createElement('tr');

                function createEditableCell(content) {
                    const cell = document.createElement('td');
                    const contentSpan = document.createElement('span');
                    contentSpan.textContent = content;

                    const input = document.createElement('input');
                    input.type = 'text';
                    input.value = content;
                    input.style.display = 'none';

                    const editButton = document.createElement('button');
                    editButton.innerHTML = '<span class="material-icons">edit</span>';
                    editButton.onclick = () => {
                        const isEditing = input.style.display === 'none';
                        if (isEditing) {
                            input.style.display = 'inline';
                            input.style.width='100%';
                            contentSpan.style.display = 'none';
                            editButton.innerHTML = '<span class="material-symbols-outlined">save</span>';
                        } else {
                            contentSpan.textContent = input.value;
                            input.style.display = 'none';
                            contentSpan.style.display = 'inline';
                            editButton.innerHTML = '<span class="material-icons">edit</span>';

                        }
                    };

                    cell.appendChild(contentSpan);
                    cell.appendChild(input);
                    cell.appendChild(editButton);
                    return cell;
                }

                const timeCell = document.createElement('td');
                const timeInput = document.createElement('input');
                timeInput.type = 'text';
                timeCell.appendChild(timeInput);
                row.appendChild(timeCell);

                row.appendChild(createEditableCell(feladat.f_leiras));
                row.appendChild(createEditableCell(feladat.f_modszerek));
                row.appendChild(createEditableCell(feladat.f_munkaformak));
                row.appendChild(createEditableCell(feladat.f_eszkozok));

                const megjegyzesCell = document.createElement('td');
                const megjegyzesInput = document.createElement('input');
                megjegyzesInput.type = 'text';
                megjegyzesCell.appendChild(megjegyzesInput);
                row.appendChild(megjegyzesCell);

                oraterv.appendChild(row);
                if (feladat.f_kep_url) {
                    const img = document.createElement('img');
                    img.src = `http://${url}/assets/feladat_kepek/${feladat.f_kep_url}`;  
                    img.alt = `Image for task ${feladat.f_id}`;
                    img.style.width = '70%'; 

                    kepek.appendChild(img);
                }
            });
        })
        .catch(error => {
            console.error('Error loading tasks:', error);
        });
}

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

