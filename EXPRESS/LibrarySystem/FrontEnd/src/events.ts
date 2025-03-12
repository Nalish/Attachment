import {fetchBooks} from "./fetch.js"

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM fully loaded");

  const roleSelect = document.getElementById("roleSelect") as HTMLSelectElement;
  const openModalBtn = document.getElementById("openModal") as HTMLButtonElement;
  const adminLibrarianModal = document.getElementById("adminLibrarianModal") as HTMLElement;
  const borrowerModal = document.getElementById("borrowerModal") as HTMLElement;
  const closeButtons = document.querySelectorAll(".close");

  if (!roleSelect || !openModalBtn || !adminLibrarianModal || !borrowerModal) {
      console.error("One or more elements are missing!");
      return;
  }

  openModalBtn.addEventListener("click", () => {
      console.log("Proceed button clicked");
      if (roleSelect.value === "admin" || roleSelect.value === "librarian") {
          adminLibrarianModal.style.display = "block";
      } else if (roleSelect.value === "borrower") {
          borrowerModal.style.display = "block";
      } else {
          alert("Please select a valid role!");
      }
  });

  closeButtons.forEach(btn => {
      btn.addEventListener("click", () => {
          console.log("Closing modal");
          adminLibrarianModal.style.display = "none";
          borrowerModal.style.display = "none";
      });
  });
});
