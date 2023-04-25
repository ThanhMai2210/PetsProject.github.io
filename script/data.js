"use strict";

const btnImport = document.getElementById("import-btn");
const btnExport = document.getElementById("export-btn");
const fileInput = document.getElementById("input-file");

//Export dữ liệu
btnExport.addEventListener("click", function () {
  const isExport = confirm("Bạn có muốn export file này ?"); //Xác nhận lại có muốn export file này hay không
  if (isExport) {
    saveStaticDataToFile();
  }
});

// Sử dụng thư viện FileSaver.js để lưu file
function saveStaticDataToFile() {
  const blob = new Blob([JSON.stringify(getFromStorage("petArr"), null, 2)], {
    type: "application/json",
  });

  saveAs(blob, "petData.json");
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////

//Import dữ liệu
btnImport.addEventListener("click", function () {
  // Nếu chưa chọn file import, sẽ hiện thông báo
  if (!fileInput.value) {
    alert("Hãy chọn file muốn Import !");
  } else {
    const isImport = confirm("Bạn có muốn import file này ?"); // Xác nhận lại file muốn import
    if (isImport) {
      const file = fileInput.files[0];
      const reader = new FileReader();

      // Load dữ liệu từ file import
      reader.addEventListener(
        "load",
        function () {
          // Kiểm tra file import có hợp lệ không. Nếu hợp lệ, lưu file vào LocalStorage
          const isValidateFile = checkFile(JSON.parse(reader.result));
          if (isValidateFile) {
            saveToStorage("petArr", JSON.parse(reader.result));
            alert("Import thành công !");
          }
        },
        false
      );
      // Đọc file
      if (file) {
        reader.readAsText(file);
      }
      // Reset file input
      fileInput.value = "";
    }
  }
});

// Hàm check file import
function checkFile(data) {
  if (!isValidate(data)) {
    // Nếu file không thỏa mãn điều kiện, trả về false, ngược lại trả về true
    return false;
  }
  return true;
}

// Hàm kiểm tra tính hợp lệ của dữ liệu import
function isValidate(data) {
  return data.every(function (pet) {
    // Nếu petID trống=> báo lỗi
    if (String(pet.PetID).trim().length === 0) {
      alert("File có thuộc tính PetID không hợp lệ");
      return false;
    }
    // Nếu petname trống=> báo lỗi
    if (pet.Petname.trim().length === 0) {
      alert("File có thuộc tính Petname không hợp lệ");
      return false;
    }
    pet.Petage = parseInt(pet.Petage);
    // Nếu petage trống, <1 hoặc >15 => báo lỗi
    if (isNaN(pet.Petage) || pet.Petage < 1 || pet.Petage > 15) {
      alert("File có thuộc tính Petage không hợp lệ");
      return false;
    }
    pet.Petweight = parseInt(pet.Petweight);
    // Nếu petweight trống, <1 hoặc >15 => báo lỗi
    if (isNaN(pet.Petweight) || pet.Petweight < 1 || pet.Petweight > 15) {
      alert("File có thuộc tính Petweight không hợp lệ");
      return false;
    }
    pet.Petlength = parseInt(pet.Petlength);
    // Nếu petlength trống, <1 hoặc >100 => báo lỗi
    if (isNaN(pet.Petlength) || pet.Petlength < 1 || pet.Petlength > 100) {
      alert("File có thuộc tính Petlength không hợp lệ");
      return false;
    }
    // Nếu pettype trống=> báo lỗi
    if (pet.Pettype.trim().length === 0) {
      alert("File có thuộc tính Pettype không hợp lệ");
      return false;
    }
    // Nếu petcolor trống=> báo lỗi
    if (pet.Petcolor.trim().length === 0) {
      alert("File có thuộc tính Petcolor không hợp lệ");
      return false;
    }
    // Nếu petbreed trống=> báo lỗi
    if (pet.Petbreed.trim().length === 0) {
      alert("File có thuộc tính Petbreed không hợp lệ");
      return false;
    }
    // Nếu date trống=> báo lỗi
    if (pet.AddedDate.trim().length === 0) {
      alert("File có thuộc tính AddedDate không hợp lệ");
      return false;
    }
    // Nếu Petvaccin không phải là giá trị true hoặc false=> báo lỗi
    if (typeof pet.Petvaccin !== "boolean") {
      alert("File có thuộc tính Petvaccin không hợp lệ");
      return false;
    }
    // Nếu Petdeworm không phải là giá trị true hoặc false=> báo lỗi
    if (typeof pet.Petdeworm !== "boolean") {
      alert("File có thuộc tính Petdeworm không hợp lệ");
      return false;
    }
    // Nếu Petsteriliz không phải là giá trị true hoặc false=> báo lỗi
    if (typeof pet.Petsteriliz !== "boolean") {
      alert("File có thuộc tính Petsteriliz không hợp lệ");
      return false;
    }

    // Check id trong file import có bị trùng với id trong LocalStorage không

    let petArr = getFromStorage("petArr");
    const petCount = petArr.map((e) => e.PetID);
    for (let i = 0; i < petCount.length; i++) {
      if (pet.PetID === petCount[i]) {
        alert("PetID này đã có trong cơ sở dữ liệu");
        return false;
      }
    }

    return true;
  });
}
