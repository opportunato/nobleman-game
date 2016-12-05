import React from 'react';
import notes from '../../notes.json';
import Modal from '../modal/Modal';

const getImgDimensions = (width, height) => {
  let newHeight, newWidth;
  if (height > 500) {
    newHeight = 500;
    newWidth = width/height * 500;
  }
  if (newWidth > 655) {
    newWidth = 655;
    newHeight = height/width * 655;
  }
  return { width: newWidth, height: newHeight };
};

const Note = ({ noteId, onClose }) => {
  const currentNote = notes.find(note => note.title === noteId);
  if (!currentNote) return null;
  const {title, text, img} = currentNote;

  return (
    <Modal onClose={onClose}>
      <div className="xx-note">
        <div className="xx-note__title">
          { title }
        </div>
        {
          img &&
          <figure
            className="xx-note__img"
            style={{
              width: getImgDimensions(img.width, img.height).width
            }}
          >
            <img
              style={{
                height: getImgDimensions(img.width, img.height).height
              }}
              src={`https://s3.eu-central-1.amazonaws.com/arzamas-static/x/334-school-w9gxEU0N22MfiGAcrMoZs7TAa3/1200/notes/${img.name}.jpg`}
            />
            <figcaption>
              <div className="xx-note__caption">{img.caption}</div>
              <div className="xx-note__copyright">© {img.copyright}</div>
            </figcaption>
          </figure>
        }
        <div
          className="xx-note__text"
          dangerouslySetInnerHTML={{__html: text}}>
        </div>
      </div>
    </Modal>
  );
};

export default Note;
