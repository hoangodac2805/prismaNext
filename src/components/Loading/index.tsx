import React from "react";
import styles from "./_Loading.module.scss";
import { Spin } from "antd";

const Loading = () => {
  return (
    <div className={styles.wrapper}>
      <Spin size="large" />
    </div>
  );
};

export default Loading;
