import React from 'react';
import notes from '../../notes.json';
import Modal from '../modal/Modal';

const Note = ({ noteId, onClose }) => {
  const currentNote = notes.find(note => note.title === noteId);

  if (!currentNote) return null;

  return (
    <Modal onClose={onClose}>
      <div className="xx-note">
        <h2 className="xx-note__title">
          { currentNote.title }
        </h2>
        <p className="xx-note__text">
          { currentNote.text }
        </p>
      </div>
    </Modal>
  );
};

export default Note;
