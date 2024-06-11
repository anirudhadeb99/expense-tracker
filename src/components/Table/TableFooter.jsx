import { FaArrowLeft,FaArrowRight } from "react-icons/fa6";
import styles from "./TableFooter.module.css"
import { useEffect } from "react";

const TableFooter = ({page,setPage,range,slice})=>{

    useEffect(()=>{
        if(slice.length<1 && page!==1)
            setPage(page-1);
    },
[slice,page,setPage]);

    const handlePrevPage = ()=>{
        if(page>1)
            setPage(page-1);
    }
    const handleNextPage = ()=>{
        if(page<range.length)
            setPage(page+1);
    }
    return (
        <div className={styles.container}> 
        <button className={styles.button} onClick={handlePrevPage}> <FaArrowLeft /></button>
        <div className={styles.page_button}>{page}</div>
        <button className={styles.button} onClick={handleNextPage}><FaArrowRight/></button>
        </div>

    );
}

export default TableFooter;