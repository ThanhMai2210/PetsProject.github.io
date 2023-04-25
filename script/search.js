"use strict";

const idInput = document.getElementById("input-id");
const nameInput = document.getElementById("input-name");
const ageInput = document.getElementById("input-age");
const typeInput = document.getElementById("input-type");
const weightInput = document.getElementById("input-weight");
const lengthInput = document.getElementById("input-length");
const colorInput = document.getElementById("input-color-1");
const breedInput = document.getElementById("input-breed");
const vaccinatedInput = document.getElementById("input-vaccinated");
const dewormedInput = document.getElementById("input-dewormed");
const sterilizedInput = document.getElementById("input-sterilized");

const tableBodyEl = document.getElementById("tbody");
const findBtn = document.getElementById("find-btn");

// Tạo mảng lấy dữ liệu từ LocalStorage
let breedArr = getFromStorage("breedArr");
let petArr = getFromStorage("petArr");

// Hàm hiển thị danh sách thú cưng
function renderTableData(petArr) {
  tableBodyEl.innerHTML = "";

  petArr.forEach((pet) => {
    const row = document.createElement("tr");
    row.innerHTML = `
    <th scope="row">${pet.PetID}</th>
    <td>${pet.Petname}</td>
    <td>${pet.Petage}</td>
    <td>${pet.Pettype}</td>
    <td>${pet.Petweight} kg</td>
    <td>${pet.Petlength} cm</td>
    <td>${pet.Petbreed}</td>
    <td>
      <i class="bi bi-square-fill" style="color: ${pet.Petcolor}"></i>
    </td>
    <td><i class="bi ${
      pet.Petvaccin ? "bi-check-circle-fill" : "bi-x-circle-fill"
    }"></i></td>
    <td><i class="bi ${
      pet.Petdeworm ? "bi-check-circle-fill" : "bi-x-circle-fill"
    }"></i></td>
    <td><i class="bi ${
      pet.Petsteriliz ? "bi-check-circle-fill" : "bi-x-circle-fill"
    }"></i></td>
    <td>${pet.AddedDate}</td>`;
    tableBodyEl.appendChild(row);
  });
}
renderTableData(petArr); // Hiển thị danh sách thú cưng

// Bắt sự kiện tìm kiếm
findBtn.addEventListener("click", function () {
  // Tạo mảng petArrFind = petArr để tránh thay đổi dữ liệu của mảng petArr
  let petArrFind = petArr;
  // Tìm kiếm theo id
  if (idInput.value) {
    // Lọc các đối tượng có id trùng với 1 phần hoặc toàn bộ giá trị được nhập vào
    petArrFind = petArrFind.filter((pet) =>
      String(pet.PetID).includes(idInput.value)
    );
  }
  // Tìm kiếm theo name
  if (nameInput.value) {
    // Lọc các đối tượng có name trùng với 1 phần hoặc toàn bộ giá trị được nhập vào
    petArrFind = petArrFind.filter((pet) =>
      pet.Petname.includes(nameInput.value)
    );
  }
  // Tìm kiếm theo type
  if (typeInput.value !== "Select Type") {
    // Lọc các đối tượng có type trùng với giá trị được nhập vào
    petArrFind = petArrFind.filter((pet) => pet.Pettype === typeInput.value);
  }
  // Tìm kiếm theo breed
  if (breedInput.value !== "Select Breed") {
    // Lọc các đối tượng có breed trùng với giá trị được nhập vào
    petArrFind = petArrFind.filter((pet) => pet.Petbreed === breedInput.value);
  }
  // Tìm kiếm theo Vacxin
  if (vaccinatedInput.checked === true) {
    // Lọc các đối tượng đã được tiêm Vacxin
    petArrFind = petArrFind.filter((pet) => pet.Petvaccin === true);
  }
  // Tìm kiếm theo Dewormed
  if (dewormedInput.checked === true) {
    // Lọc các đối tượng đã được tẩy giun
    petArrFind = petArrFind.filter((pet) => pet.Petdeworm === true);
  }
  // Tìm kiếm theo Sterilized
  if (sterilizedInput.checked === true) {
    // Lọc các đối tượng đã được triệt sản
    petArrFind = petArrFind.filter((pet) => pet.Petsteriliz === true);
  }
  renderTableData(petArrFind); // Hiển thị danh sách thú cưng phù hợp với điều kiện tìm kiếm
});

renderBreed(); // Hiển thị toàn bộ danh sách breed

// Hàm hiển thị toàn bộ danh sách breed
function renderBreed() {
  breedArr.forEach(function (breedItem) {
    const option = document.createElement("option");
    option.innerHTML = `${breedItem.breed}`;
    breedInput.appendChild(option);
  });
}
