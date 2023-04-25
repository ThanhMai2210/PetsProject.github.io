"use strict";

// Toggle class active when click on navbar
const sidebarEl = document.getElementById("sidebar");
sidebarEl.addEventListener("click", function () {
  this.classList.toggle("active");
});

// Hàm lấy dữ liệu từ LocalStorage
function getFromStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

// Hàm lưu dữ liệu vào LocalStorage
function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
