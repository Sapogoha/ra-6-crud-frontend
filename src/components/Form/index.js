import React, { useState } from 'react';
import PropTypes from 'prop-types';

import styles from './index.module.css';

function Form({ onAdd }) {
  const emptyFormState = { id: '', content: '' };
  const [form, setForm] = useState(emptyFormState);

  const handleAdd = (evt) => {
    evt.preventDefault();
    if (form.content === '') {
      return;
    }

    onAdd({
      content: form.content,
    });
    setForm(emptyFormState);
  };

  const handleChange = (evt) => {
    const { id, value } = evt.target;
    setForm((prevForm) => ({ ...prevForm, [id]: value }));
  };

  return (
    <form className={styles.field} onSubmit={handleAdd}>
      <div className={styles.input}>
        <label htmlFor="title" className={styles.label}>
          New Note
        </label>
        <textarea
          className={styles.content}
          type="text"
          id="content"
          minLength="3"
          maxLength="2000"
          placeholder="Share your thoughts"
          onChange={handleChange}
          value={form.content}
          required
        />
        <button type="submit" className={styles.button}>
          Add
        </button>
      </div>
    </form>
  );
}

Form.propTypes = { onAdd: PropTypes.func.isRequired };

export default Form;
