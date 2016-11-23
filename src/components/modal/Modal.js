import React from 'react';
import debounce from 'lodash.debounce';

const fixCloseButton = debounce(() => {
  const closeButton = document.querySelector('.xx-modal__close-btn');
  const modal = document.querySelector('.xx-modal');
  const body = document.querySelector('.xx-modal__body');

  if (modal.scrollTop > (body.offsetTop - 20)) {
    closeButton.style.top = (modal.scrollTop - body.offsetTop + 20) + 'px';
  } else {
    closeButton.style.top = '0';
  }
});

class Modal extends React.Component {
  componentDidMount() {
    if (this.props.onClose) {
      document.querySelector('.xx-modal').addEventListener('scroll', fixCloseButton);
    }
  }

  componentWillUnmount() {
    if (this.props.onClose) {
      document.querySelector('.xx-modal').removeEventListener('scroll', fixCloseButton);
    }
  }

  render() {
    const { children, onClose } = this.props;

    return (
      <div className="xx-modal">
        <div
          className="xx-modal__overlay"
          onClick={onClose}
        >
          <div
            className="xx-modal__body"
            onClick={e => e.stopPropagation()}
          >
            { children }
            {
              onClose &&
              <button className="xx-modal__close-btn xx-btn-unstyled" onClick={onClose}>
                <i className="xx-icon xx-icon--cross" />
              </button>
            }
          </div>
        </div>
      </div>
    );
  }
}

export default Modal;
