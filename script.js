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
const healthcheckBtn = document.getElementById("healthy-btn");
const caculateBMIBtn = document.getElementById("bmi-btn");

const tableBodyEl = document.getElementById("tbody");

//Tạo ID dựa trên thời gian thực
let DatetimeID1 = function () {
  let date = new Date();
  return (
    String(date.getFullYear()) +
    String(date.getMonth() + 1) +
    String(date.getDate()) +
    String(date.getHours()) +
    String(date.getMinutes()) +
    String(date.getSeconds()) +
    String(date.getMilliseconds())
  );
};

// Hàm ngày tháng
let DatetimeID2 = function () {
  let date = new Date();
  return (
    String(date.getDate()) +
    "/" +
    String(date.getMonth() + 1) +
    "/" +
    String(date.getFullYear())
  );
};

//Check điều kiện
const validateData = function (Petinfo) {
  let checkvalid = true;
  // Vì ID được tạo tự động chính xác đến mili giây nên không cần check trùng ID
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

// Hàm đặt lại giá trị của form về mặc định sau khi đã submit
const clearData = function () {
  nameInput.value = "";
  ageInput.value = "";
  typeInput.value = "Select Type";
  weightInput.value = "";
  lengthInput.value = "";
  colorInput.value = "#000000";
  breedInput.value = "Select Breed";
  vaccinatedInput.checked = false;
  dewormedInput.checked = false;
  sterilizedInput.checked = false;
};

// Tạo mảng petArr lấy dữ liệu từ LocalStorage
let petArr = getFromStorage("petArr") ? getFromStorage("petArr") : [];

// Hàm hiển thị danh sách thú cưng
function renderTableData(petArr) {
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
    <button class="btn btn-danger" onclick="deletePet('${
      pet.PetID
    }')">Delete</button>
    </td>`;
    tableBodyEl.appendChild(row); // Add các giá trị vào cột tương ứng
  });
}
renderTableData(petArr);

// Bắt sự kiện submit thú cưng
submitBtn.addEventListener("click", function () {
  // Tạo 1 Object Petinfo chứa toàn bộ thông tin của thú cưng với mỗi giá trị tương ứng được lấy từ form
  const Petinfo = {
    PetID: parseInt(DatetimeID1()),
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
    AddedDate: DatetimeID2(),
  };

  // Check xem các giá trị được nhập vào đã thỏa mãn điều kiện hay chưa
  const validate = validateData(Petinfo);

  if (validate) {
    // Nếu thỏa mãn điều kiện thì đẩy thông tin thú cưng vào mảng petArr
    petArr.push(Petinfo);
    // Đặt form nhập thông tin về mặc định
    clearData();
    // Lưu thông tin thú cưng vào LocalStorage
    saveToStorage("petArr", petArr);
  }
  // Hiển thị danh sách thú cưng
  renderTableData(petArr);
});

// Hàm xóa thú cưng
function deletePet(petID) {
  // Xác nhận bạn có muốn xóa thú cưng này không
  const deleteData = confirm("Are you sure to detele this Pet?");
  if (deleteData) {
    // Nếu đúng thú cưng muốn xóa, trước tiên ta tạo 1 biến i chạy trong mảng petArr
    for (let i = 0; i < petArr.length; i++) {
      if (petID == petArr[i].PetID) {
        // Nếu id của đối tượng i trùng với id muốn xóa, xóa đối tượng i đó
        petArr.splice(i, 1);
        // Cập nhật lại LocalStorage sau khi xóa thú cưng
        saveToStorage("petArr", petArr);
        // Load lại danh sách thú cưng
        renderTableData(petArr);
      }
    }
  }
}

// Hàm check các thú cưng khỏe mạnh
let healthyCheck = true;

// Bắt sự kiện click
healthcheckBtn.addEventListener("click", function () {
  if (healthyCheck) {
    // Lọc các thú cưng mà 3 thuộc tính Vaccinated,Dewormed,Sterilized = true
    const healthyPetArr = petArr.filter(function (e) {
      return e.Petvaccin && e.Petdeworm && e.Petsteriliz;
    });
    // Load danh sách thú cưng khỏe mạnh
    renderTableData(healthyPetArr);
    // Đổi tên button từ Show Healthy Pet=>Show All Pet
    healthcheckBtn.textContent = "Show All Pet";
    healthyCheck = false;
  } else {
    // Nếu đang trong trạng thái thú cưng khỏe mạnh, khi click vào button sẽ Load danh sách toàn bộ thú cưng
    renderTableData(petArr);
    // Đổi tên button từ Show All Pet=> Show Healthy Pet
    healthcheckBtn.textContent = "Show Healthy Pet";
    healthyCheck = true;
  }
});

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
