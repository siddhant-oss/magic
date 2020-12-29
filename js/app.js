showNotes();
let alr = document.getElementById("alert");

// If user adds a note, add it to the localStorage
let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function () {
  let addTxt = document.getElementById("addTxt");
  let addTitle = document.getElementById("addTitle");
  let notes = localStorage.getItem("notes");
  let notesObj = [];
  if (addTxt.value.length > 10000) {
    alr.innerHTML = `<div class="alert alert-warning alert-dismissible fade show" role="alert">
        <strong>Sorry the description was too long</strong> 
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>`;
    return;
  } else if (addTitle.value.length > 100) {
    alr.innerHTML = `<div class="alert alert-warning alert-dismissible fade show" role="alert">
        <strong>Sorry the title was too long</strong> 
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>`;
    return;
  } else if (addSubtitle.value.length > 100) {
    alr.innerHTML = `<div class="alert alert-warning alert-dismissible fade show" role="alert">
        <strong>Sorry the title was too long</strong> 
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>`;
    return;
  } else if (
    addTxt.value.length > 10000 &&
    addTitle.value.length > 100 &&
    addSubtitle.value.length > 100
  ) {
    alr.innerHTML = `<div class="alert alert-warning alert-dismissible fade show" role="alert">
        <strong>Sorry the title and description was too long</strong> 
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>`;
  }
  console.log("Welcome to notes app. This is app.js");

  if (notes == null) {
  } else {
    notesObj = JSON.parse(notes);
  }
  let myObj = {
    title: addTitle.value,
    text: addTxt.value,
    subtitle: addSubtitle.value,
  };
  if (addTitle.value == "") {
    alr.innerHTML = `<div class="alert alert-warning alert-dismissible fade show" role="alert">
        <strong>You must have missed out a field</strong> 
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>`;

    return;
  } else if (addTitle.value == "") {
    alr.innerHTML = `<div class="alert alert-warning alert-dismissible fade show" role="alert">
        <strong>You must have missed out a field</strong> 
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>`;
    return;
  } else if (addTxt.value == "" && addTxt.value == "") {
    alr.innerHTML = `<div class="alert alert-warning alert-dismissible fade show" role="alert">
        <strong>You must have missed out a field</strong> 
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>`;
    return;
  } else {
    // $('.alert').alert('close');
    alr.innerHTML = `<div class="alert alert-success alert-dismissible fade show" role="alert">
        <strong>Success!</strong> Note added to list
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>`;
  }

  notesObj.push(myObj);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  addTxt.value = "";
  addTitle.value = "";
  addSubtitle.value = "";
  //   console.log(notesObj);
  showNotes();
});

// Function to show elements from localStorage
function showNotes() {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  let html = "";
  notesObj.forEach(function (element, index) {
    html += `
            <div class="noteCard my-2 mx-2 card" style="width: 18rem;">
                    <div class="card-body">
                        <h3 class="card-title">${element.title}</h3>
                        <h5 class="card-title">${element.subtitle}</h5>
                        <p class="card-text"> ${element.text}</p>
                        <button id="${index}"onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
                    </div>
                </div>`;
  });
  let notesElm = document.getElementById("notes");
  if (notesObj.length != 0) {
    notesElm.innerHTML = html;
  } else {
    notesElm.innerHTML = `Nothing to show! Use "Add a Note" section above to add notes.`;
  }
}

// Function to delete a note
function deleteNote(index) {
  alr.innerHTML = `<div class="alert alert-warning alert-dismissible fade show" role="alert">
     Note deleted
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>`;
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }

  notesObj.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  showNotes();
}

function clearStorage() {
  if (confirm("Do you really want to clear?")) {
    console.log("Clearing the storage");
    const str = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
        <strong>Success!</strong> List cleared successfully
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>`;
    alr.innerHTML = str;
    localStorage.clear();
    showNotes();
  }
}