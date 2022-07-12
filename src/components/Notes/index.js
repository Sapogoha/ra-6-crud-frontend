import React, { useState, useEffect } from 'react';

import styles from './index.module.css';

import Form from '../Form';
import NoteItem from '../NoteItem';

function Notes() {
  const [data, addData] = useState([]);
  const url = process.env.REACT_APP_URL;
  const placeholder = 'Add your first Note, then you will see it here.';

  const loadNotes = () => {
    fetch(url)
      .then((response) => response.json())
      .then((notes) => {
        addData(notes);
      });
  };

  useEffect(() => {
    loadNotes();
  });

  const handleAdd = async (item) => {
    const note = JSON.stringify(item);
    await fetch(url, {
      method: 'POST',
      body: note,
    });
    loadNotes();
  };

  const handleRemove = async (id) => {
    await fetch(`${url}/${id}`, {
      method: 'DELETE',
    });
    handleRefresh();
  };

  const handleRefresh = () => {
    loadNotes();
  };

  return (
    <div className={styles.app}>
      <div className={styles.top}>
        <h2 className={styles.header}>Notes</h2>
        <button
          className={styles.refresh}
          onClick={() => {
            handleRefresh();
          }}
        >
          Refresh
        </button>
      </div>

      <ul className={styles.notes}>
        {data.length > 0 ? (
          data.map((item) => (
            <NoteItem
              key={item.id}
              content={item.content}
              id={item.id}
              onRemove={handleRemove}
            />
          ))
        ) : (
          <li className={styles.placeholder}>{placeholder}</li>
        )}
      </ul>
      <Form onAdd={handleAdd} />
    </div>
  );
}

export default Notes;
