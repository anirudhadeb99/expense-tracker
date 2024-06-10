
import { useEffect, useState } from "react";
const calculateRange = (data,rowsPerPage)=>{

    let pageRange = [];
    const size = Math.ceil(data.length/rowsPerPage);
    for(let i=1;i<=size;i++)
       pageRange.push(i);

   return pageRange;

   }

    const sliceData = (data,page,rowsPerPage)=>{

       return data.slice((page-1)*rowsPerPage, page*rowsPerPage );
    }

const useTable = (data,page,rowsPerPage)=>{

    const [tableRange,setTableRange] = useState([]);
    const [slice,setSlice] = useState([]);

    useEffect(()=>{
    const range = calculateRange(data,rowsPerPage);
    setTableRange([...range]);
    const slice = sliceData(data,page,rowsPerPage);
    setSlice([...slice]);

    },[page]);

    return {slice, range : tableRange};


}

export default useTable;