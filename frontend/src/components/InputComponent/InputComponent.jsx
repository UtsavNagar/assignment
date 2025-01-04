import styles from "./inputComp.module.css"

export default function InputComponent(props) {
    return (
        <div className={styles.inputBox}>
            <input  {...props} required="required"/>
            {props.lable && <span>{props.lable}</span>}
        </div>
    )
}