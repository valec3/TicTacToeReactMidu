// eslint-disable-next-line react/prop-types
export const Square = ({children,updateBoard,index, isSelected})=>{

    const turnCurrent = `square ${isSelected ? "is-selected" : ""}`
    const handleClick = ()=>{
        updateBoard(index);
    }
    return(
        <div className={turnCurrent} onClick={handleClick}>
            <span className="cell_content">
            {children}
            </span>
        </div>
    )
}