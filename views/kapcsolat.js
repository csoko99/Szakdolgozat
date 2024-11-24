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

let aktualisFeladatok = [];

function oratervGeneralas() {
    const tema = document.getElementById('tema').value;
    fetch(`http://${url}/feladatok//tema/${encodeURIComponent(tema)}`)
        .then(response => response.json())
        .then(data => {
            const oraterv = document.getElementById('oraterv-tabla');
            const kepek = document.getElementById('feladat_kepek');

            const feladatok = data.slice(0, 6);
            feladatok.forEach(feladat => {
                const row = document.createElement('tr');

                function createEditableCell(content) {
                    const cell = document.createElement('td');
                    const celldiv = document.createElement('div');
                    celldiv.classList = "cella";
                    const contentSpan = document.createElement('span');
                    contentSpan.textContent = content;
                    contentSpan.classList = "cellaTartalom";

                    const input = document.createElement('input');
                    input.type = 'text';
                    input.value = content;
                    input.style.display = 'none';

                    const editButton = document.createElement('button');
                    editButton.classList = "tablaGombok";
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
                    cell.appendChild(celldiv);
                    celldiv.appendChild(contentSpan);
                    celldiv.appendChild(input);
                    celldiv.appendChild(editButton);
                    return cell;
                }

                const timeCell = document.createElement('td');
                const timeInput = document.createElement('input');
                timeInput.type = 'text';
                timeCell.appendChild(timeInput);
                row.appendChild(createEditableCell('Adj meg időkeretet.'));

                row.appendChild(createEditableCell(feladat.f_leiras));
                row.appendChild(createEditableCell(feladat.f_modszerek));
                row.appendChild(createEditableCell(feladat.f_munkaformak));
                row.appendChild(createEditableCell(feladat.f_eszkozok));

                aktualisFeladatok += feladat.f_id + ",";

                const megjegyzesCell = document.createElement('td');
                const megjegyzesInput = document.createElement('input');
                megjegyzesInput.type = 'text';
                megjegyzesCell.appendChild(megjegyzesInput);
                row.appendChild(megjegyzesCell);

                // Törlés gomb hozzáadása
                const deleteCell = document.createElement('td');
                const deleteButton = document.createElement('button');
                deleteButton.classList = "tablaGombok"
                deleteButton.innerHTML = '<span class="material-icons">delete</span>';
                deleteButton.onclick = () => {
                    // Táblázatsor eltávolítása
                    row.remove();

                    // Aktualis feladatok listából eltávolítás
                    aktualisFeladatok = aktualisFeladatok
                        .split(',')
                        .filter(id => id !== String(feladat.f_id))
                        .join(',');

                    const kepekContainer = document.getElementById('feladat_kepek');
                    const taskImage = kepekContainer.querySelector(`img[src*="${feladat.f_kep_url}"]`);
                    if (taskImage) {
                        taskImage.remove();
                    }
                    // Debug log az aktuális feladatokról
                    console.log(aktualisFeladatok);
                };
                deleteCell.appendChild(deleteButton);
                row.appendChild(deleteCell);

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



