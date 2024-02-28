import React from "react";
import styles from "./rounds-ui.module.css";

interface RoundUIProps {
    items: string[];
}

const RoundUI: React.FC<RoundUIProps> = ({ items }) => {
    return (
        <div>
            <ul className={styles.nodeList}>
                {items.map((item, index) => (
                    <li key={index} className={styles.nodeItem}>
                        <div className={styles.node}></div>
                        <span className={styles.text}>{item}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RoundUI;
