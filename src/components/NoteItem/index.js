import React from 'react';
import PropTypes from 'prop-types';

import styles from './index.module.css';

function NoteItem({ id, content, onRemove: handleRemove }) {
  return (
    <li className={styles.note}>
      <button
        className={styles.delete}
        onClick={() => {
          handleRemove(id);
        }}
      >
        x
      </button>
      <div className={styles.content}>{content}</div>
    </li>
  );
}

NoteItem.propTypes = {
  id: PropTypes.number.isRequired,
  content: PropTypes.string.isRequired,
  onRemove: PropTypes.func.isRequired,
};

export default NoteItem;
