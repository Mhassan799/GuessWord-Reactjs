import React, { useState, useRef, useEffect } from 'react';

const App = () => {
  const declaredWord = "apple";
  const [inputValues, setInputValues] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef([]);

  const handleInputChange = (e, index) => {
    const newInputValues = [...inputValues];
    newInputValues[index] = e.target.value;
    setInputValues(newInputValues);

    // Move cursor to the next input field
    if (index < inputRefs.current.length - 1 && e.target.value !== '') {
      inputRefs.current[index + 1].focus();
    }
  };
  useEffect(() => {
    // Check if all input fields are filled
    const allFieldsFilled = inputValues.every(value => value !== '');

    // Check the entered word when all input fields are filled
    if (allFieldsFilled) {
      const enteredWord = inputValues.join('');
      if (enteredWord === declaredWord) {
        alert('Congratulations! The word is correct.');
      } else {
        alert(`sorry  the word was ${declaredWord}`);
      }
    }
  }, [inputValues, declaredWord]);

  return (
    <div className='container'>
      <h2>Enter word</h2>
      {inputValues.map((inputValue, index) => (
        
        <label key={index}>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => handleInputChange(e, index)}
            maxLength={1}
            ref={(input) => (inputRefs.current[index] = input)}
            style={{
              backgroundColor:
                inputValue === declaredWord[index]
                  ? 'green'
                  : inputValue === ''
                  ? 'grey'
                  : inputValue !== declaredWord[index]
                  ? 'red'
                  : 'white',
              color: 'white',
              padding: '10px',
              margin: '2px',
              width: '15px',
              border: "1px solid white", // Add border for better visibility
            }}
          />
        </label>
      ))}
    </div>
  );
};

export default App;
