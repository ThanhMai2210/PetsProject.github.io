"use strict";

const submitBtn = document.getElementById("submit-btn");
const breedInput = document.getElementById("input-breed");
const typeInput = document.getElementById("input-type");

const tableBodyEl = document.getElementById("tbody");

// Tạo mảng breedArr lấy dữ liệu từ LocalStorage
let breedArr = getFromStorage("breedArr") ? getFromStorage("breedArr") : [];

// Tạo ID tự động theo thời gian thực
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

// Hàm check điều kiện
const validateBreed = function (petBreed) {
  let checkvalid = true;
  // Nếu breed trống, yêu cầu người dùng nhập giá trị
  if (petBreed.breed.trim() === "") {
    alert("Please input breed");
    checkvalid = false;
  }
  // Nếu chưa chọn type, yêu cầu người dùng chọn
  if (petBreed.type === "Select Type") {
    alert("Please select Type!");
    checkvalid = false;
  }
  // Check xem giá trị breed đang nhập đã tồn tại trong cơ sở dữ liệu hay chưa?
  breedArr.forEach((pet) => {
    if (pet.type === typeInput.value && pet.breed === breedInput.value) {
      alert(`Giống ${typeInput.value} này đã có trong cơ sở dữ liệu`);
      breedInput.value = "";
      checkvalid = false;
    }
  });
  return checkvalid;
};

// Đặt form nhập về mặc định
const clearData = function () {
  breedInput.value = "";
  typeInput.value = "Select Breed";
};

// Hiển thị danh sách breed
function renderTableBreed() {
  tableBodyEl.innerHTML = "";
  if (breedArr) {
    for (let i = 0; i < breedArr.length; i++) {
      const row = document.createElement("tr"); // Tạo thẻ tr
      row.innerHTML = `
      <th scope="row">${breedArr[i].id}</th>
      <td>${breedArr[i].breed}</td>
      <td>${breedArr[i].type}</td>
      <td><button class="btn btn-danger" onclick="deleteBreed('${breedArr[i].id}')">Delete</button></td>`;
      tableBodyEl.appendChild(row); // Add các giá trị vào cột tương ứng
    }
  }
}
renderTableBreed();

// Bắt sự kiện submit breed
submitBtn.addEventListener("click", function () {
  // Tạo Object chứa các thuộc tính của breed
  const petBreed = {
    id: parseInt(DatetimeID1()),
    breed: breedInput.value,
    type: typeInput.value,
  };
  const validate = validateBreed(petBreed); // Kiểm tra giá trị nhập vào có thỏa mãn điều kiện hay không
  if (validate) {
    breedArr.push(petBreed); // Nếu thỏa mãn điểu kiện, đẩy giá trị nhập vào mảng breedArr
    clearData(); // Reset form nhập
    saveToStorage("breedArr", breedArr); // Lưu dữ liệu vào LocalStorage
  }
  renderTableBreed(); // Hiển thị danh sách breed
});

// Xóa breed
function deleteBreed(id) {
  const deleteData = confirm("Are you sure to detele this breed?"); // Xác nhận có muốn xóa breed này hay không
  if (deleteData) {
    // Nếu đúng breed muốn xóa, trước tiên ta tạo 1 biến i chạy trong mảng breedArr
    for (let i = 0; i < breedArr.length; i++) {
      if (id == breedArr[i].id) {
        // Nếu id của đối tượng i trùng với id muốn xóa, xóa đối tượng i đó
        breedArr.splice(i, 1);
        // Cập nhật lại LocalStorage sau khi xóa breed
        saveToStorage("breedArr", breedArr);
        // Load lại danh sách thú cưng
        renderTableBreed();
      }
    }
  }
}
