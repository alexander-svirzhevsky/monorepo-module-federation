import { useState } from "react";
import styles from "./App.module.scss";
import { Link, Outlet } from "react-router-dom";

const App = () => {
  const [count, setCount] = useState(0);

  const onClick = () => {
    setCount((prev) => prev + 1);
  };

  return (
    <>
      <div>Count {count}</div>
      <button className={styles["button"]} onClick={onClick}>
        <span>add one</span>
      </button>
      <Link to='about'>go to about </Link>
      <Link to='login'>go to login</Link>
      <Outlet />
    </>
  );
};

export default App;
