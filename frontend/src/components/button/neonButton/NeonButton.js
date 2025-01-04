import styles from "./NeonButton.module.css"
export default function NeonButton(props) {
    return (
        <div>
            <div className={styles.neonButton}>
                <button {...props}>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    {props.name}
                </button>
            </div>
        </div>
    )
}