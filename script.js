const noteForm = document.querySelector('#note-form');
const noteInput = document.querySelector('#note-input');
const noteCategory = document.querySelector('#note-category');
const searchInput = document.querySelector('#search-input');
const notesList = document.querySelector('#notes-list');
const noteCount = document.querySelector('#note-count');
const errorMessage = document.querySelector('#error-message');

let notes = [];

function render() {
  const searchWords = searchInput.value.trim().toLowerCase().split(/\s+/).filter(Boolean);
  const filteredNotes = notes.filter((note) => {
    const noteText = note.text.toLowerCase();
    return searchWords.every((word) => noteText.includes(word));
  });

  notesList.replaceChildren();

  if (filteredNotes.length === 0) {
    const emptyItem = document.createElement('li');
    emptyItem.className = 'empty-message';
    emptyItem.textContent = searchWords.length > 0
      ? 'No notes match your search.'
      : 'No notes to display.';
    notesList.appendChild(emptyItem);
  } else {
    filteredNotes.forEach((note) => {
      const noteItem = document.createElement('li');
      const categoryClass = `category-${note.category.toLowerCase()}`;
      noteItem.className = `note-card ${categoryClass}`;
      noteItem.dataset.id = note.id;

      const noteText = document.createElement('p');
      noteText.className = 'note-content';
      noteText.textContent = note.text;

      const meta = document.createElement('div');
      meta.className = 'note-meta';

      const categoryLabel = document.createElement('span');
      categoryLabel.className = 'category-label';
      categoryLabel.textContent = note.category;

      const date = document.createElement('time');
      date.dateTime = note.createdAt;
      date.textContent = new Date(note.createdAt).toLocaleString();

      const deleteButton = document.createElement('button');
      deleteButton.type = 'button';
      deleteButton.className = 'delete-button';
      deleteButton.textContent = 'Delete';
      deleteButton.dataset.id = note.id;
      deleteButton.setAttribute('aria-label', `Delete note: ${note.text}`);

      deleteButton.addEventListener('click', () => deleteNote(note.id));

      meta.append(categoryLabel, date, deleteButton);
      noteItem.append(noteText, meta);
      notesList.appendChild(noteItem);
    });
  }

  updateCount();
}

function updateCount() {
  if (notes.length === 0) {
    noteCount.textContent = 'You have no notes yet.';
  } else if (notes.length === 1) {
    noteCount.textContent = 'You have 1 note.';
  } else {
    noteCount.textContent = `You have ${notes.length} notes.`;
  }
}

function saveNotes() {
  localStorage.setItem('quicknotes-notes', JSON.stringify(notes));
}

function loadNotes() {
  try {
    const storedNotes = localStorage.getItem('quicknotes-notes');
    const parsedNotes = storedNotes ? JSON.parse(storedNotes) : [];
    notes = Array.isArray(parsedNotes)
      ? parsedNotes.filter((note) =>
          note &&
          typeof note.id === 'string' &&
          typeof note.text === 'string' &&
          typeof note.category === 'string' &&
          typeof note.createdAt === 'string'
        )
      : [];
  } catch (error) {
    notes = [];
  }
}

function addNote(event) {
  event.preventDefault();
  const text = noteInput.value.trim();

  if (!text) {
    errorMessage.textContent = 'Please type a note first.';
    noteInput.focus();
    return;
  }

  if (text.length > 200) {
    errorMessage.textContent = 'Notes must be 200 characters or fewer.';
    noteInput.focus();
    return;
  }

  const note = {
    id: Date.now().toString(),
    text,
    category: noteCategory.value,
    createdAt: new Date().toISOString()
  };

  notes.push(note);
  noteInput.value = '';
  errorMessage.textContent = '';
  saveNotes();
  render();
  noteInput.focus();
}

function deleteNote(id) {
  notes = notes.filter((note) => note.id !== id);
  saveNotes();
  render();
}

noteForm.addEventListener('submit', addNote);
searchInput.addEventListener('input', render);

loadNotes();
render();
