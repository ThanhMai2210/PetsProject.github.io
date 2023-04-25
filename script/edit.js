"use strict";

const submitBtn = document.getElementById("submit-btn");
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

const formEl = document.getElementById("container-form");
const tableBodyEl = document.getElementById("tbody");

//Check điều kiện edit
const validateData = function (Petinfo) {
  let checkvalid = true;

  // Check thuộc tính name có để trống hay không. Nếu trống, yêu cầu người dùng nhập vào
  if (Petinfo.Petname.trim() === "") {
    alert("Please input pet's name");
    checkvalid = false;
  }
  // Check thuộc tính age có để trống hay không. Nếu trống, yêu cầu người dùng nhập vào
  if (isNaN(Petinfo.Petage)) {
    alert("Age can't be empty!");
    checkvalid = false;
  }
  // Check thuộc tính weight có để trống hay không. Nếu trống, yêu cầu người dùng nhập vào
  if (isNaN(Petinfo.Petweight)) {
    alert("Weight can't be empty!");
    checkvalid = false;
  }
  // Check thuộc tính length có để trống hay không. Nếu trống, yêu cầu người dùng nhập vào
  if (isNaN(Petinfo.Petlength)) {
    alert("Length can't be empty!");
    checkvalid = false;
  }
  // Check thuộc tính age >1 và <15
  if (Petinfo.Petage < 1 || Petinfo.Petage > 15) {
    alert("Age must be between 1 and 15!");
    checkvalid = false;
  }
  // Check thuộc tính type đã được chọn hay chưa
  if (Petinfo.Pettype === "Select Type") {
    alert("Please select Type!");
    checkvalid = false;
  }
  // Check thuộc tính weight >1 và <15 kg
  if (Petinfo.Petweight < 1 || Petinfo.Petweight > 15) {
    alert("Weight must be between 1 and 15!");
    checkvalid = false;
  }
  // Check thuộc tính length >1 và <100 cm
  if (Petinfo.Petlength < 1 || Petinfo.Petlength > 100) {
    alert("Length must be between 1 and 100!");
    checkvalid = false;
  }
  // Check thuộc tính breed đã được chọn hay chưa
  if (Petinfo.Petbreed === "Select Breed") {
    alert("Please select Breed!");
    checkvalid = false;
  }
  // Nếu tất cả các thuộc tính đều thỏa mãn điều kiện thì trả về true
  return checkvalid;
};

// Tạo mảng petArr lấy dữ liệu từ LocalStorage
let petArr = getFromStorage("petArr") ? getFromStorage("petArr") : [];

// Hàm hiển thị danh sách thú cưng
function renderTableData() {
  tableBodyEl.innerHTML = "";

  petArr.forEach((pet) => {
    const row = document.createElement("tr"); // Tạo thẻ tr
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
    <td>${pet.AddedDate}</td>
    <td>
    <button class="btn btn-warning" onclick="editPet('${
      pet.PetID
    }')">Edit</button>
    </td>`;
    tableBodyEl.appendChild(row); // Add các giá trị vào cột tương ứng
  });
}
renderTableData();

// Submit lại thú cưng đã edit
submitBtn.addEventListener("click", function () {
  const Petinfo = {
    PetID: parseInt(idInput.value),
    Petage: parseInt(ageInput.value),
    Petweight: parseInt(weightInput.value),
    Petlength: parseInt(lengthInput.value),
    Petname: nameInput.value,
    Pettype: typeInput.value,
    Petcolor: colorInput.value,
    Petbreed: breedInput.value,
    Petvaccin: vaccinatedInput.checked,
    Petdeworm: dewormedInput.checked,
    Petsteriliz: sterilizedInput.checked,
  };
  const validate = validateData(Petinfo); // Check giá trị edit có thỏa mãn điều kiện không

  if (validate) {
    // Nếu thỏa mãn điều kiện, trước tiên, tìm vị trí của thú cưng đang edit trong mảng petArr
    const index = petArr.findIndex(
      (pet) => Number(pet.PetID) === Number(Petinfo.PetID)
    );
    Petinfo.AddedDate = petArr[index].AddedDate; // Giữ nguyên ngày tháng ban đầu
    petArr[index] = Petinfo; // Ghi đè dữ liệu edit vào dữ liệu cũ
    saveToStorage("petArr", petArr); // Cập nhật lại LocalStorage
    formEl.classList.add("hide"); // Ẩn form edit
  }

  renderTableData(); // Hiển thị lại danh sách thú cưng
});

// Edit thú cưng
function editPet(id) {
  formEl.classList.remove("hide"); // Hiện form edit
  const pet = petArr.find((petItem) => petItem.PetID === Number(id)); // Tìm đối tượng trong mảng petArr có id trùng với id muốn edit
  // Hiện thông tin của đối tượng lên form edit
  idInput.value = id;
  nameInput.value = pet.Petname;
  ageInput.value = pet.Petage;
  typeInput.value = pet.Pettype;
  weightInput.value = pet.Petweight;
  lengthInput.value = pet.Petlength;
  colorInput.value = pet.Petcolor;
  vaccinatedInput.checked = pet.Petvaccin;
  dewormedInput.checked = pet.Petdeworm;
  sterilizedInput.checked = pet.Petsteriliz;

  renderBreed(); // Load danh sách breed tương ứng với type của đối tượng đang edit
  breedInput.value = `${pet.Petbreed}`;
}

// Hàm lọc breed dựa theo thuộc tính type: Dog, Cat
// Bắt sự kiện change option: Dog, Cat
typeInput.addEventListener("change", renderBreed);

function renderBreed() {
  breedInput.innerHTML = "<option>Select Breed</option>"; // Tạo thẻ option

  let breedArr = getFromStorage("breedArr"); // Lấy dữ liệu breed từ LocalStorage
  const breedDogs = breedArr.filter((breedItem) => breedItem.type === "Dog"); // Lọc các Object có type = Dog
  const breedCats = breedArr.filter((breedItem) => breedItem.type === "Cat"); // Lọc các Object có type = Cat

  // Nếu giá trị nhập vào là Dog, Lấy giá trị breed tương ứng
  if (typeInput.value === "Dog") {
    breedDogs.forEach(function (breedItem) {
      const option = document.createElement("option");
      option.innerHTML = `${breedItem.breed}`;
      breedInput.appendChild(option);
    });
  }
  // Nếu giá trị nhập vào là Cat, Lấy giá trị breed tương ứng
  if (typeInput.value === "Cat") {
    breedCats.forEach(function (breedItem) {
      const option = document.createElement("option");
      option.innerHTML = `${breedItem.breed}`;
      breedInput.appendChild(option);
    });
  }
}
