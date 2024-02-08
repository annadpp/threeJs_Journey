import React, { useState, useEffect, useRef } from "react";

export default function Clicker({ increment, keyName, color = "darkOrchid" }) {
  const [count, setCount] = useState(
    parseInt(localStorage.getItem(keyName) ?? 0)
  );
  const buttonRef = useRef();

  useEffect(() => {
    buttonRef.current.style.backgroundColor = "papayawhip";
    buttonRef.current.style.color = "salmon";

    return () => {
      localStorage.removeItem(keyName);
    };
  }, []);

  useEffect(() => {
    localStorage.setItem(keyName, count);
  }, [count]);

  const buttonClick = () => {
    setCount(count + 1);
    increment();
  };

  return (
    <div>
      <p style={{ color: color }}>Clicks count: {count}</p>
      <button ref={buttonRef} onClick={buttonClick}>
        Click me
      </button>
    </div>
  );
}
