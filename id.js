function generateID() {
  let name = document.getElementById("name").value.trim();
  let Rno = document.getElementById("Rno").value.trim();
  let dob = document.getElementById("dob").value;
  let year = document.getElementById("year").value.trim();
  let branch = document.getElementById("branch").value;
  let address = document.getElementById("address").value.trim();
  let phone = document.getElementById("phone").value.trim();
  let validity = document.getElementById("validity").value.trim();

  let errors = [];

  // Name: required
  if (name === "") {
    errors.push("Name is required.");
  }

  // Roll No: must be numeric
  if (!/^\d+$/.test(Rno)) {
    errors.push("Roll No. must be numeric.");
  }

  // DOB: must be 16+
  if (dob) {
    let birthDate = new Date(dob);
    let today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    let m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    if (age < 16) {
      errors.push("Age must be 16 years or older.");
    }
  } else {
    errors.push("Please enter Date of Birth.");
  }

  // Admission Year: must be >= 2022
  if (!/^\d{4}$/.test(year) || parseInt(year) < 2022) {
    errors.push("Year of admission must be 2022, 2023, 2024 or later.");
  }

  // Branch required
  if (branch === "") {
    errors.push("Please select a branch.");
  }

  // Address required (max handled by maxlength in HTML)
  if (address === "") {
    errors.push("Address is required.");
  }

  // Phone: must be 10 digits
  if (!/^\d{10}$/.test(phone)) {
    errors.push("Phone number must be 10 digits.");
  }

  // Validity: must be year, and must be <= 2028
  if (!/^\d{4}$/.test(validity)) {
    errors.push("Validity must be a valid year (e.g., 2028).");
  } else if (parseInt(validity) > 2028) {
    errors.push("Validity cannot exceed 2028.");
  }

  // Show errors
  let errorBox = document.getElementById("errorBox");
  if (errors.length > 0) {
    errorBox.innerHTML = errors.join("<br>");
    return; // stop ID generation
  } else {
    errorBox.innerHTML = ""; // clear errors if all valid
  }

  // If validation passes → fill ID Card
  document.getElementById("idName").innerText = name;
  document.getElementById("iRno").innerText = Rno;
  document.getElementById("idDob").innerText = dob;
  document.getElementById("iyear").innerText = year;
  document.getElementById("idBranch").innerText = branch;
  document.getElementById("idAddress").innerText = address;
  document.getElementById("idPhone").innerText = phone;
  document.getElementById("idValidity").innerText = validity;
}

// Handle photo upload immediately
const fileInput = document.getElementById("photo");
const idPhoto = document.getElementById("idPhoto");

fileInput.addEventListener("change", function () {
  const file = fileInput.files[0];
  if (file) {
    idPhoto.src = URL.createObjectURL(file);
  }
}); 
document.getElementById("downloadBtn").addEventListener("click", function () {
  const idCard = document.getElementById("idCard");
  
  html2canvas(idCard, { scale: 2 }).then(canvas => {
    let link = document.createElement("a");
    link.download = "Student_ID_Card.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  });
});
