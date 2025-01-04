import styles from "./borderAndBackground.module.css"

export default function BackgroundComponent({childComp}) {
    return (
        <div className={styles.main}>
            <div className={styles.bubbles}>
                <span style={{ '--i': 11 }}></span>
                <span style={{ '--i': 12 }}></span>
                <span style={{ '--i': 23 }}></span>
                <span style={{ '--i': 21 }}></span>
                <span style={{ '--i': 10 }}></span>
                <span style={{ '--i': 9 }}></span>
                <span style={{ '--i': 16 }}></span>
                <span style={{ '--i': 23 }}></span>
                <span style={{ '--i': 8 }}></span>
                <span style={{ '--i': 19 }}></span>
                <span style={{ '--i': 24 }}></span>
                <span style={{ '--i': 21 }}></span>
                <span style={{ '--i': 23 }}></span>
                <span style={{ '--i': 16 }}></span>
                <span style={{ '--i': 8 }}></span>
                <span style={{ '--i': 9 }}></span>
                <span style={{ '--i': 20 }}></span>
                <span style={{ '--i': 25 }}></span>
                <span style={{ '--i': 16 }}></span>
                <span style={{ '--i': 12 }}></span>
                <span style={{ '--i': 23 }}></span>
                <span style={{ '--i': 15 }}></span>
                <span style={{ '--i': 21 }}></span>
                <span style={{ '--i': 17 }}></span>
                <span style={{ '--i': 11 }}></span>
                <span style={{ '--i': 24 }}></span>
                <span style={{ '--i': 21 }}></span>
                <span style={{ '--i': 23 }}></span>
                <span style={{ '--i': 16 }}></span>
                <span style={{ '--i': 8 }}></span>
                <span style={{ '--i': 9 }}></span>
                <span style={{ '--i': 20 }}></span>
                <span style={{ '--i': 11 }}></span>
                <span style={{ '--i': 12 }}></span>
                <span style={{ '--i': 23 }}></span>
                <span style={{ '--i': 21 }}></span>
                <span style={{ '--i': 10 }}></span>
                <span style={{ '--i': 9 }}></span>
                <span style={{ '--i': 16 }}></span>
                <span style={{ '--i': 23 }}></span>
                <span style={{ '--i': 8 }}></span>
                <span style={{ '--i': 19 }}></span>
                {childComp}
            </div>
        </div>
    )
}