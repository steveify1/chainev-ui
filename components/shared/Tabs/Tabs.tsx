import { useState } from "react";
import styles from "./Tabs.module.scss";

interface TabData {
  name: string;
  value?: any;
}

export interface TabChangeEvent {
  activeTabIndex: number;
  data: TabData;
}

export interface TabProps {
  className?: string;
  tabs: TabData[];
  onChange?: (e: TabChangeEvent) => void;
}

export const Tabs = (props: TabProps) => {
  const [activeTabIndex, setActiveTabIndex] = useState<number>(0);

  const handleChange = (index: number) => {
    if (index === activeTabIndex) return;
    setActiveTabIndex(index);

    if (typeof props.onChange === "function") {
      props.onChange({ activeTabIndex, data: props.tabs[index] });
    }
  };

  return (
    <ul className={`${styles.tabs} ${props.className}`}>
      {props.tabs.map((tab, i) => (
        <li
          key={`tab-${tab.value}-${i}`}
          className={`${styles.tab} ${
            activeTabIndex === i ? styles.activeTab : null
          }`}
          onClick={() => handleChange(i)}
        >
          {tab.name}
        </li>
      ))}
    </ul>
  );
};
