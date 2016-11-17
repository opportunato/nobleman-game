import React from 'react';
import notes from '../../notes.json';
import Modal from '../modal/Modal';

const Note = ({ noteId, onClose }) => {
  const currentNote = notes.find(note => note.title === noteId);

  if (!currentNote) return null;

  return (
    <Modal onClose={onClose}>
      <div className="xx-note">
        <div className="xx-note__title">
          { currentNote.title }
        </div>
        <div className="xx-note__text">
          { currentNote.text }
        </div>
      </div>
    </Modal>
  );
};

export default Note;
