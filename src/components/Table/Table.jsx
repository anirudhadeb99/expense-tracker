import TableFooter from "./TableFooter";
import useTable from "../../hooks/useTable";
import styles from "./Table.module.css";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Backdrop from "@mui/material/Backdrop";
import { GoXCircle } from "react-icons/go";
import { SlPencil } from "react-icons/sl";
import { IoPizzaOutline } from "react-icons/io5";
import { MdCardTravel } from "react-icons/md";
import { IoGiftOutline } from "react-icons/io5";
import { useState } from "react";
import { calculateData } from "../../Landing Page/LandingPage";
import { useSnackbar } from "notistack";

const Table = ({ data, rowsPerPage, setData, setChartData }) => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [page, setPage] = useState(1);
  const [id, setId] = useState();
  const { slice, range } = useTable(data, page, (rowsPerPage = 3));
  const [expense, setExpense] = useState();
  const [balance, setBalance] = useState();
  const [openExpense, setOpenExpense] = useState(false);
  const handleOpenExpense = () => setOpenExpense(true);
  const handleCloseExpense = () => setOpenExpense(false);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");

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

  const handleDelete = (idx, page, rowsPerPage) => {
    const find = (page - 1) * rowsPerPage + idx;
    const item = data.slice(find,find+1);
    const price = parseInt(item[0].price);
    const balance = localStorage.getItem("balance");
    const expense = localStorage.getItem("expense");
    const res = data.filter((item, index) => index !== find);
    setData(res);
    localStorage.setItem("data", JSON.stringify(res));
    localStorage.setItem("balance", JSON.stringify(parseInt(balance)+price));
    localStorage.setItem("expense", JSON.stringify(parseInt(expense)-price));
    const chart = calculateData(res);
    setChartData(chart);
  };

  const handleEdit = (idx, page, rowsPerPage) => {
    const find = (page - 1) * rowsPerPage + idx;
    const res = data.filter((item, index) => index === find);
    setTitle(res[0].name);
    setPrice(parseInt(res[0].price));
    setCategory(res[0].category);
    setDate(res[0].date);
    setId(idx);
    setOpenExpense(true);
  };

  const handleSubmit = (idx) => {
     const  balance = localStorage.getItem("balance");
     const expense =  localStorage.getItem("expense");
    if (price > balance) {
      enqueueSnackbar("You dont have sufficient balance");
    } else {
      const obj = {
        name: title,
        date: date,
        price: price,
        category: category,
      };
      const res = data.filter((item, index) => index !== idx);
      res.splice(idx,0,obj);
      localStorage.setItem("data", JSON.stringify(res));
      const chart = calculateData(res);
      setData([...res]);
      setChartData(chart);
      const tempExpense = parseInt(price) + parseInt(expense);
      const tempBalance = parseInt(balance) - parseInt(price);
      localStorage.setItem("expense", tempExpense);
      localStorage.setItem("balance", tempBalance);
      handleCloseExpense();
    }
  };
  return (
    <div>
      <h1 className={styles.italic}>Recent Transactions</h1>
      <div className={styles.container}>
        <table>
          <tbody>
            {slice.length > 0
              ? slice.map((item, idx) => {
                  return (
                    <tr key={idx}>
                      <div className={styles.list_wrapper}>
                        <div
                          className={styles.row_wrapper}
                          style={{ gap: "20px" }}
                        >
                          <div className={styles.icon}>
                            {icon(item.category)}
                          </div>
                          <div className={styles.col_wrapper}>
                            <div className={styles.text}>{item.name}</div>
                            <div
                              className={styles.text}
                              style={{ color: "#9B9B9B" }}
                            >
                              {item.date}
                            </div>
                          </div>
                        </div>
                        <div className={styles.row_wrapper}>
                          <div className={styles.price}>₹{item.price}</div>
                          <button
                            className={styles.button}
                            onClick={() => handleDelete(idx, page, rowsPerPage)}
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
                            onClick={() => handleEdit(idx, page, rowsPerPage)}
                          >
                            <SlPencil
                              style={{ color: "white", fontSize: "22px" }}
                            />
                          </button>
                          <Modal
                            aria-labelledby="expense"
                            aria-describedby="add-expense"
                            open={openExpense}
                            onClose={handleCloseExpense}
                            closeAfterTransition
                            slots={{ backdrop: Backdrop }}
                            slotProps={{
                              backdrop: {
                                timeout: 500,
                              },
                            }}
                          >
                            <Fade in={openExpense}>
                              <Box className={styles.modal}>
                                <div
                                  className={styles.ubuntu}
                                  style={{
                                    marginBottom: "20px",
                                    marginLeft: "5px",
                                  }}
                                >
                                  Add Expenses
                                </div>
                                <div
                                  className={styles.modalContainer}
                                  style={{
                                    gap: "20px",
                                    justifyContent: "flex-start",
                                  }}
                                >
                                  <input
                                    type="text"
                                    className={styles.input}
                                    placeholder="Title"
                                    value={title}
                                    onChange={(e) => {
                                      setTitle(e.target.value);
                                    }}
                                  ></input>
                                  <input
                                    type="text"
                                    className={styles.input}
                                    placeholder="Price"
                                    value={price}
                                    onChange={(e) => {
                                      setPrice(parseInt(e.target.value));
                                    }}
                                  ></input>
                                  <input
                                    type="text"
                                    className={styles.input}
                                    placeholder="Select Category"
                                    value={category}
                                    onChange={(e) => {
                                      setCategory(e.target.value);
                                    }}
                                  ></input>
                                  <input
                                    type="text"
                                    className={styles.input}
                                    placeholder="dd/mm/yyyy"
                                    value={date}
                                    onChange={(e) => {
                                      setDate(e.target.value);
                                    }}
                                  ></input>
                                  <button
                                    className={styles.shadowButton}
                                    style={{
                                      backgroundColor: "#F4BB4A",
                                      width: "220px",
                                    }}
                                    onClick={()=>handleSubmit(id)}
                                  >
                                    Add Expense
                                  </button>
                                  <button
                                    className={styles.shadowButton}
                                    style={{
                                      backgroundColor: "#E3E3E3",
                                      color: "black",
                                      fontWeight: "400",
                                      width: "110px",
                                    }}
                                    onClick={handleCloseExpense}
                                  >
                                    Cancel
                                  </button>
                                </div>
                              </Box>
                            </Fade>
                          </Modal>
                        </div>
                      </div>
                    </tr>
                  );
                })
              : null}
          </tbody>
        </table>

        {slice.length > 0 ? (
          <TableFooter
            page={page}
            range={range}
            setPage={setPage}
            slice={slice}
          />
        ) : null}
      </div>
    </div>
  );
};

export default Table;
