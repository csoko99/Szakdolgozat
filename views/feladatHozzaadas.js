

function feladatHozzaadas() {
    document.getElementById('feladatModal').style.display = 'block';
}

function zarModalis() {
    document.getElementById('feladatModal').style.display = 'none';
    document.getElementById('modalForm').style.display = 'none';
    document.getElementById('adatbazisForm').style.display = 'none';
}

function sajatFeladatHozzaadas() {
    document.getElementById('modalForm').style.display = 'block';
    document.getElementById('adatbazisForm').style.display = 'none';
}

function adatbazisFeladatHozzaadas() {
    document.getElementById('adatbazisForm').style.display = 'block';
    document.getElementById('modalForm').style.display = 'none';

    // Töltse be az adatbázisból a legördülő menü elemeit
    fetch(`http://${url}/feladatok/tema/${encodeURIComponent(document.getElementById('tema').value)}`)
        .then(response => response.json())
        .then(data => {
            const dropdown = document.getElementById('feladatDropdown');
            dropdown.innerHTML = ''; // Előző elemek törlése
            
            data.forEach(feladat => {
                // Ellenőrizze, hogy a feladat ID már szerepel-e az aktualisFeladatok tömbben
                if (!aktualisFeladatok.includes(feladat.f_id)) {
                    const option = document.createElement('option');
                    option.value = feladat.f_id;
                    option.textContent = feladat.f_leiras;
                    dropdown.appendChild(option);
                }
            });

            // Ha a szűrés után nincs elérhető feladat
            if (dropdown.children.length === 0) {
                const noTasksOption = document.createElement('option');
                noTasksOption.textContent = 'Nincs elérhető új feladat';
                noTasksOption.disabled = true;
                dropdown.appendChild(noTasksOption);
            }
        })
        .catch(error => console.error('Error fetching tasks:', error));
}

function mentFeladat() {
    const leiras = document.getElementById('feladatLeiras').value;
    const modszerek = document.getElementById('feladatModszerek').value;
    const munkaformak = document.getElementById('feladatMunkaformak').value;
    const eszkozok = document.getElementById('feladatEszkozok').value;

    // Hozzáadja a feladatot az óraterv táblához
    hozzaadOratervhez({ leiras, modszerek, munkaformak, eszkozok });
    zarModalis();
}

function mentFeladatAdatbazisbol() {
    const dropdown = document.getElementById('feladatDropdown');
    const selectedOption = dropdown.options[dropdown.selectedIndex];
    const feladatId = selectedOption.value;

    // Ellenőrizd, hogy van-e kiválasztott feladat
    if (!feladatId) {
        console.error('No task selected.');
        alert('Please select a task.');
        return;
    }


    const apiURL = `http://${url}/feladatok/id/${feladatId}`;
    console.log('Fetching task from API:', apiURL);

    fetch(apiURL)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error fetching task: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (!data || data.length === 0) {
                console.error(`No task found with ID: ${feladatId}`);
                alert(`Task with ID ${feladatId} not found. Please check the task ID.`);
                return;
            }

            const feladat = data[0];
            hozzaadOratervhez(feladat);
            aktualisFeladatok += feladat.f_id;
        })
        .catch(error => {
            console.error('Error fetching selected task:', error);
            alert('An error occurred while fetching the task. Please try again.');
        });

    zarModalis();
}

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
    editButton.classList = "szerkesztesGomb";
    editButton.innerHTML = '<span class="material-icons">edit</span>';
    editButton.onclick = () => {
        const isEditing = input.style.display === 'none';
        if (isEditing) {
            input.style.display = 'inline';
            input.style.width = '100%';
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


function hozzaadOratervhez(feladat) {
    const oraterv = document.getElementById('oraterv-tabla');
    const row = document.createElement('tr');

    // Időkeret szerkeszthető cella
    const idokeretCell = createEditableCell('');
    idokeretCell.querySelector('input').placeholder = 'Időkeret';
    row.appendChild(idokeretCell);

    // Leírás szerkeszthető cella
    row.appendChild(createEditableCell(feladat.f_leiras || ''));

    // Módszerek szerkeszthető cella
    row.appendChild(createEditableCell(feladat.f_modszerek || ''));

    // Munkaformák szerkeszthető cella
    row.appendChild(createEditableCell(feladat.f_munkaformak || ''));

    // Eszközök szerkeszthető cella
    row.appendChild(createEditableCell(feladat.f_eszkozok || ''));

    // Megjegyzések szerkeszthető cella
    const megjegyzesCell = createEditableCell('');
    megjegyzesCell.querySelector('input').placeholder = 'Megjegyzés';
    row.appendChild(megjegyzesCell);

    // Új sor hozzáadása a táblázathoz
    oraterv.querySelector('tbody').appendChild(row);
}