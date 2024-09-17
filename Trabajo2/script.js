let students = [];
let currentPage = 1;
const itemsPerPage = 3;

const addStudent = (event) => {

    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const id = document.getElementById('id').value;

    students.push({ name, email, phone, id });

    renderTable(students, currentPage);

    clearForm();

};

const renderTable = (studentList,page) => {
    
    const tbody = document.getElementById('student_table');
    tbody.innerHTML = '';

    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedStudents = studentList.slice(startIndex, endIndex);

    paginatedStudents.forEach((student) => {
        let row = document.createElement('tr');
        row.innerHTML = `<td>${student.name}</td><td>${student.email}</td><td>${student.phone}</td><td>${student.id}</td>`;
        tbody.appendChild(row);
    });

    document.getElementById('pageNumber').innerText = page;  // Actualizar número de página
    updateButtons(studentList.length);
};

const filteredStudents = () => {
    const searchValue = document.getElementById('searching').value.toLowerCase();
    const filteredStudents = students.filter(student =>
        student.name.toLowerCase().includes(searchValue));
        currentPage = 1;  // Reiniciar la paginación al filtrar
        renderTable(filteredStudents, currentPage);
}

const resetTable = () => {
    document.getElementById('searching').value = ''; // Limpia el campo de búsqueda
    currentPage = 1;  // Reiniciar la paginación al restablecer
    renderTable(students, currentPage); // Vuelve a mostrar la tabla completa
};

// Funciones para manejar los botones de paginación
const nextPage = () => {
    const totalPages = Math.ceil(students.length / itemsPerPage);
    if (currentPage < totalPages) {
        currentPage++;
        renderTable(students, currentPage);
    }
};

const prevPage = () => {
    if (currentPage > 1) {
        currentPage--;
        renderTable(students, currentPage);
    }
};

const updateButtons = (totalItems) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    document.getElementById('nextButton').disabled = currentPage === totalPages;
    document.getElementById('prevButton').disabled = currentPage === 1;
};

document.querySelector('form').addEventListener('submit', addStudent);
document.getElementById('searchButton').addEventListener('click',filteredStudents);
document.getElementById('resetButton').addEventListener('click', resetTable);
document.getElementById('nextButton').addEventListener('click', nextPage);
document.getElementById('prevButton').addEventListener('click', prevPage);




















const clearForm = () => {
    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('phone').value = '';
    document.getElementById('id').value = '';
};
