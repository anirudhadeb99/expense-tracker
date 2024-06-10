import TableFooter from "./TableFooter";
import useTable from "../../hooks/useTable";
import styles from "./Table.module.css";
import { GoXCircle } from "react-icons/go";
import { SlPencil } from "react-icons/sl";
import { IoPizzaOutline } from "react-icons/io5";
import { MdCardTravel } from "react-icons/md";
import { IoGiftOutline } from "react-icons/io5";
import { useState,useEffect } from "react";

const Table = ({ data, rowsPerPage }) => {
  
  const [page, setPage] = useState(1);
  const { slice, range } = useTable(data, page, (rowsPerPage = 3));
  
  const icon = (category) => {
    if (category === "food")
      return (
        <IoPizzaOutline style={{ fontSize: "25px", padding: "8px 8px 5px" }} />
      );
    if (category === "travel")
      return (
        <MdCardTravel style={{ fontSize: "23px", padding: "8px 8px 5px" }} />
      );
    if (category === "entertainment")
      return (
        <IoGiftOutline style={{ fontSize: "23px", padding: "8px 8px 5px" }} />
      );
  };
  return (
    <div>
    <h1 className={styles.italic}>Recent Transactions</h1>
    <div className={styles.container}>
      {slice.map((item) => {
        return (
          <div className={styles.list_wrapper}>
            <div className={styles.row_wrapper} style={{ gap: "20px" }}>
              <div className={styles.icon}>{icon(item.category)}</div>
              <div className={styles.col_wrapper}>
                <div className={styles.text}>{item.name}</div>
                <div className={styles.text} style={{ color: "#9B9B9B" }}>
                  {item.date}
                </div>
              </div>
            </div>
            <div className={styles.row_wrapper}>
              <div className={styles.price}>₹{item.price}</div>
              <button
                className={styles.button}
                style={{ backgroundColor: "#FF3E3E" }}
              >
                <GoXCircle
                  style={{
                    color: "white",
                    fontSize: "25px",
                    paddingTop: "2px",
                  }}
                />
              </button>
              <button
                className={styles.button}
                style={{ backgroundColor: "#F4BB4A" }}
              >
                <SlPencil style={{ color: "white", fontSize: "22px" }} />
              </button>
            </div>
          </div>
        );
      })}
      <TableFooter page={page} range={range} setPage={setPage} slice={slice} />
    </div>
    </div>
  );
};

export default Table;
