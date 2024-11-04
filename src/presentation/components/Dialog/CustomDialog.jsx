import { Dialog } from 'primereact/dialog'
import "./CustomDialog.css"

const CustomDialog = ({footer,visible,onhide,children,title,iconClassName}) => {
    const headerTemplate = () => {
        return (
            <div className='flex flex-row gap-2'>
                <span className={iconClassName} style={{fontSize:"40px",fontWeight:"500",color:"#85C226"}}></span>
                <span style={{fontSize:"28px",fontWeight:"700"}}>{title}</span>
            </div>
        )
    }
    return (
        <Dialog visible={visible} style={{ width: "500px" }} header={headerTemplate} onHide={onhide}footer={footer}>
            {children}
        </Dialog>
    )
}

export default CustomDialog
