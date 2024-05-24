import React, { useState } from 'react';

function UpdateForm({ formData }) {
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [amount, setAmount] = useState(null);


  function handleSubmit() {
    const data = { name: name, type: type, amount: amount };
    formData(data);
    setName('');
    setType('');
    setAmount(null)
  }

  return (
    <form>
      <label>
        Name:
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <label>
        Type:
        <input type="text" value={type} onChange={(e) => setType(e.target.value)} />
      </label>
      <label>
        Amount:
        <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
      </label>
      <button type="submit" onClick={handleSubmit}>Submit</button>
    </form>
  );
}

export default UpdateForm;
