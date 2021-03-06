var $noteTitle = $(".note-title"),
  $noteText = $(".note-textarea"),
  $saveNoteBtn = $(".save-note"),
  $newNoteBtn = $(".new-note"),
  $noteList = $(".list-container .list-group"),
  activeNote = {},
  getNotes = function () {
    return $.ajax({ url: "/api/notes", method: "GET" });
  },
  saveNote = function (a) {
    return $.ajax({ url: "/api/notes", data: a, method: "POST" });
  },
  deleteNote = function (a) {
    return $.ajax({ url: "api/notes/" + a, method: "DELETE" });
  },
  renderActiveNote = function () {
    $saveNoteBtn.hide(),
      activeNote.id
        ? ($noteTitle.attr("readonly", !0),
          $noteText.attr("readonly", !0),
          $noteTitle.val(activeNote.title),
          $noteText.val(activeNote.text))
        : ($noteTitle.attr("readonly", !1),
          $noteText.attr("readonly", !1),
          $noteTitle.val(""),
          $noteText.val(""));
  },
  handleNoteSave = function () {
    var a = { title: $noteTitle.val(), text: $noteText.val() };
    saveNote(a).then(function () {
      getAndRenderNotes(), renderActiveNote();
    });
  },
  handleNoteDelete = function (a) {
    a.stopPropagation();
    var b = $(this).parent(".list-group-item").data();
    activeNote.id === b.id && (activeNote = {}),
      deleteNote(b.id).then(function () {
        getAndRenderNotes(), renderActiveNote();
      });
  },
  handleNoteView = function () {
    (activeNote = $(this).data()), renderActiveNote();
  },
  handleNewNoteView = function () {
    (activeNote = {}), renderActiveNote();
  },
  handleRenderSaveBtn = function () {
    $noteTitle.val().trim() && $noteText.val().trim()
      ? $saveNoteBtn.show()
      : $saveNoteBtn.hide();
  },
  renderNoteList = function (a) {
    $noteList.empty();
    for (var b = [], c = 0; c < a.length; c++) {
      var d = a[c],
        e = $("<li class='list-group-item'>").data(d),
        f = $("<span>").text(d.title),
        g = $(
          "<i class='fas fa-trash-alt float-right text-danger delete-note'>"
        );
      e.append(f, g), b.push(e);
    }
    $noteList.append(b);
  },
  getAndRenderNotes = function () {
    return getNotes().then(function (a) {
      renderNoteList(a);
    });
  };
$saveNoteBtn.on("click", handleNoteSave),
  $noteList.on("click", ".list-group-item", handleNoteView),
  $newNoteBtn.on("click", handleNewNoteView),
  $noteList.on("click", ".delete-note", handleNoteDelete),
  $noteTitle.on("keyup", handleRenderSaveBtn),
  $noteText.on("keyup", handleRenderSaveBtn),
  getAndRenderNotes();
