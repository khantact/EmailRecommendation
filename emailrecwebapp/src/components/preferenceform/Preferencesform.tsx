/* eslint-disable react-hooks/rules-of-hooks */
"use client"
import React, { useEffect, useState } from 'react';
import { auth, db } from '../../utils/firebase.js';
import { setDoc, doc } from "firebase/firestore";
const Preferencesform = () => {
  const [preferences, setPreferences] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [errormessage, setErrormessage] = useState('');
  const userId = auth.currentUser?.uid;

  useEffect(() => {
    if (userId) {
      // const unsubscribe = db.collection('users').doc(userId).onSnapshot((snapshot) => {
      //     if (snapshot.exists) {
      //       const userData = snapshot.data();
      //       setPreferences(userData.preferences || []);
      //     }
      //   });

      // return () => unsubscribe();
    }
  }, [userId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleAddPreference = () => {
    if (inputValue.trim() === '') {
      return;
    }

    if (preferences.length >= 5) {
      setErrormessage('You can only add 5 preferences');
      return;
    }

    setPreferences((prevPreferences) => [...prevPreferences, inputValue]);
    setInputValue('');
    setErrormessage('');
  };

  const handleDeletePreference = (index: number) => {
    setPreferences((prevPreferences) =>
      prevPreferences.filter((_, i) => i !== index)
    );
  };

  return (
    <div>
      <div className="flex">
        <input
          type="text"
          placeholder="Enter preference"
          value={inputValue}
          onChange={handleInputChange}
          className="px-2 py-1 mr-2 rounded border border-gray-300 text-black"
        />
        <button
          onClick={handleAddPreference}
          className="px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Add
        </button>
      </div>
      {errormessage && (
      <p className="text-red-500 mb-2">{errormessage}</p>
      )}
      <ul className="mt-4">
        {preferences.map((preference, index) => (
          <li
            key={index}
            className="flex items-center cursor-pointer hover:text-red-500"
            onClick={() => handleDeletePreference(index)}
          >
            <span className="mr-2">{preference}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 fill-current text-red-500"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M13.586 10L19 15.414l-4.243 4.243-5.414-5.414L3.93 19 0 15.071l5.414-5.414L0 4.243 3.93 0l4.243 4.243L13.586 0 19 3.93l-4.243 4.243L19 13.586 15.071 19l-4.243-4.243L6.586 19 10 15.071l4.243 4.243L19 13.586 15.071 10z"
              />
            </svg>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Preferencesform;
