document.addEventListener("DOMContentLoaded", function () {
    const apiUrl = "http://localhost:3001/pemesan";
    const dataTable = document.getElementById("data-table");
    const searchInput = document.getElementById("searchInput");
    const searchBtn = document.getElementById("searchBtn");

    function readTable() {
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                dataTable.innerHTML = "";
                data.forEach((item, index) => {
                    const row = `
                    <tr>
                        <td>${index + 1}</td>
                        <td>${item.id_pemesan}</td>
                        <td>${item.nama}</td>
                        <td>${item.email}</td>
                        <td>${item.nomor_telepon}</td>
                        <td>
                            <a href="updatePemesan.html?id=${item.id_pemesan}" class="btn btn-primary btn-sm">Edit</a>
                            <a href="hapusPemesan.html?id=${item.id_pemesan}" class="btn btn-danger btn-sm">Hapus</a>
                        </td>
                    </tr>
                `;
                    dataTable.innerHTML += row;
                });
            })
            .catch(error => console.error("Error fetching data :", error));
    }

    function getLastID() {
        return fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                if (data.length > 0) {
                    const maxID = Math.max(...data.map(item => item.id_pemesan));
                    return maxID;
                } else {
                    return 1000;
                }
            })
            .catch(error => {
                console.error("Error fetching data :", error);
                return 1000;
            });
    }

    function readTableNama() {
        const searchNama = searchInput.value.trim();

        if (searchNama === "") {
            alert("Silakan masukkan Nama Pemesan terlebih dahulu!");
            return;
        }

        fetch(`${apiUrl}/${searchNama}`)
            .then(response => response.json())
            .then(data => {
                const modalBody = document.getElementById("modal-body-content");
                modalBody.innerHTML = "";

                if (data.length > 0) {
                    data.forEach(pemesan => {
                        modalBody.innerHTML += `
                        <p><strong>ID Pemesan :</strong> ${pemesan.id_pemesan}</p>
                        <p><strong>Nama :</strong> ${pemesan.nama}</p>
                        <p><strong>Email :</strong> ${pemesan.email}</p>
                        <p><strong>Nomor Telepon :</strong> ${pemesan.nomor_telepon}</p>
                        <a href="updatePemesan.html?id=${pemesan.id_pemesan}" class="btn btn-primary btn-sm">Edit</a>
                        <a href="hapusPemesan.html?id=${pemesan.id_pemesan}" class="btn btn-danger btn-sm">Hapus</a>
                        <hr>
                    `;
                    });
                } else {
                    modalBody.innerHTML = '<p class="text-danger">Data tidak ditemukan!</p>';
                }

                let searchModal = new bootstrap.Modal(document.getElementById('searchModal'));
                searchModal.show();
            })
            .catch(error => {
                alert(error.message);
            });
    }
    if (searchBtn) {
        searchBtn.addEventListener("click", readTableNama);
    }

    const addForm = document.getElementById('addForm');
    if (addForm)
        addForm.addEventListener('submit', function (event) {
            event.preventDefault();

            getLastID().then(lastID => {
                const newPemesan = {
                    id_pemesan: parseInt(lastID + 1),
                    nama: document.getElementById('nama').value,
                    email: document.getElementById('email').value,
                    nomor_telepon: document.getElementById('nomor_telepon').value
                };

                fetch(apiUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(newPemesan)
                })
                    .then(response => response.text())
                    .then(data => {
                        alert(data);
                        window.location.href = "main.html";
                    })
                    .catch(error => console.error('Error :', error));
            });
        })

    const editForm = document.getElementById('editForm');
    if (editForm) {
        let params = new URLSearchParams(window.location.search);
        let id = parseInt(params.get('id'));

        fetch(`${apiUrl}/id/${id}`)
            .then(response => response.json())
            .then(data => {
                if (data.length > 0) {
                    const pemesan = data[0]
                    document.getElementById('edit_id_pemesan').value = pemesan.id_pemesan;
                    document.getElementById('edit_nama').value = pemesan.nama;
                    document.getElementById('edit_email').value = pemesan.email;
                    document.getElementById('edit_nomor_telepon').value = pemesan.nomor_telepon;
                }
            })
            .catch(error => console.error('Error fetching data :', error));

        editForm.addEventListener('submit', function (event) {
            event.preventDefault();

            const updatedPemesan = {
                nama: document.getElementById('edit_nama').value,
                email: document.getElementById('edit_email').value,
                nomor_telepon: document.getElementById('edit_nomor_telepon').value
            };

            fetch(`${apiUrl}/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedPemesan)
            })
                .then(response => response.text())
                .then(data => {
                    alert(data);
                    window.location.href = "main.html"
                })
                .catch(error => console.error('Erorr :', error));
        })
    }

    const btnHapus = document.getElementById('btnHapus');
    if (btnHapus) {
        let params = new URLSearchParams(window.location.search);
        let id = parseInt(params.get('id'));

        btnHapus.addEventListener('click', function () {
            fetch(`${apiUrl}/${id}`, {
                method: 'DELETE'
            })
                .then(response => response.text())
                .then(data => {
                    alert(data);
                    window.location.href = "main.html";
                })
                .catch(error => console.error('Error :', error));
        })
    }

    readTable();
});

