import { useEffect, useState } from "react";
import Chart from "../Chart/Chart";
import styles from "./ExpenseTracker.module.css";
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import {calculateData} from "../../Landing Page/LandingPage"
import {useSnackbar } from 'notistack'
 

  const ExpenseTracker = ({data,setData,chartData,setChartData}) => {
  const localBalance = localStorage.getItem("balance")
  const [balance,setBalance] = useState((localBalance===null)?4500:localBalance);
  const [title,setTitle] = useState("");
  const [price,setPrice] = useState(0);
  const [category,setCategory] = useState("");
  const [date,setDate] = useState("");
  const [addbalance,setAddBalance] = useState(0);
  const [expense,setExpense] = useState(0);
  const [openBalance, setOpenBalance] = useState(false);
  const [openExpense, setOpenExpense] = useState(false);
  const handleOpenBalance = () => setOpenBalance(true);
  const handleCloseBalance = () => {setOpenBalance(false);setAddBalance(0)};
  const handleOpenExpense = () => setOpenExpense(true);
  const handleCloseExpense = () => setOpenExpense(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  
  const handleBalance = ()=>{
      setBalance((prev)=>parseInt(prev)+parseInt(addbalance));
      localStorage.setItem("balance",parseInt(balance)+parseInt(addbalance));
  }
  const handleSubmit = ()=>{

    if(price>balance){
      enqueueSnackbar('You dont have sufficient balance');
    }
   else
   {
   const obj = {
       "name":title,
       "date": date,
       "price":price,
       "category":category,
    }
    const tempData = [...data,obj];
    localStorage.setItem("data",JSON.stringify(tempData));
    const chart = calculateData(tempData);
    setData([...data,obj]);
    setChartData(chart);
    const tempExpense = parseInt(price)+parseInt(expense);
    localStorage.setItem("expense",tempExpense);
    setExpense(tempExpense);
    setPrice(0);
    setTitle("");
    setCategory("");
    setDate("");
    handleCloseExpense();
  }
  }

  useEffect(()=>{
    const bal =  localStorage.getItem("balance");
    if(bal!==null)
     setBalance(bal);
    const exp =  localStorage.getItem("expense");
    if(exp!==null)
      setExpense(exp);
  },[])
  
  return (
    <div>
    <h1 style={{fontSize:"32px",fontWeight:"700"}}>Expense Tracker</h1>
    <div className={styles.wrapper}>
      <div className={styles.cardWrapper}>
        <h1 style={{ fontFamily: "ubuntu-regular" }}>Wallet Balance:<span className={styles.amount} style={{color:"#9DFF5B"}}> ₹{balance}</span></h1>
        <button
          className={styles.button}
          style={{
            backgroundImage: "linear-gradient(90deg, #B5DC52 0%, #89E148 100%)",
          }}
          onClick={handleOpenBalance}
        >
          + Add Income
        </button>
        <Modal
        aria-labelledby="wallet-balance"
        aria-describedby="add-wallet-balance"
        open={openBalance}
        onClose={handleCloseBalance}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={openBalance}>
          <Box className={styles.modal}>
           <div className={styles.ubuntu} style={{marginBottom:"20px",marginLeft:"30px"}}>Add Balance</div>
           <div className={styles.container} style={{gap:"15px",justifyContent:"flex-end"}}> 
            <input type="text" className={styles.input} placeholder="Income Amount" onChange={(e)=>setAddBalance(e.target.value)}></input>
            <button className={styles.shadowButton} style={{backgroundColor:"#F4BB4A"}} onClick={handleBalance}>Add Balance</button>
            <button className={styles.shadowButton} style={{backgroundColor:"#E3E3E3",color:"black",fontWeight:"400",width:"110px"}} onClick={handleCloseBalance}>Cancel</button>
           </div>
          </Box>
        </Fade>
      </Modal>
      </div>
      <div className={styles.cardWrapper}>
        <h1>Expenses:<span className={styles.amount} style={{color:"#F4BB4A"}}> ₹{expense}</span></h1>
        <button
          className={styles.button}
          style={{
            backgroundImage:
              "linear-gradient(90deg, #FF9595 0%, #FF4747 80%, #FF3838 100%)",
          }}
          onClick={handleOpenExpense}
        >
          + Add Expense
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
           <div className={styles.ubuntu} style={{marginBottom:"20px",marginLeft:"5px"}}>Add Expenses</div>
           <div className={styles.container} style={{gap:"20px",justifyContent:"flex-start"}}> 
            <input type="text" className={styles.input} placeholder="Title" onChange={(e)=>{setTitle(e.target.value)}}></input>
            <input type="text" className={styles.input} placeholder="Price" onChange={(e)=>{setPrice(e.target.value)}}></input>
            <input type="text" className={styles.input} placeholder="Select Category" onChange={(e)=>{setCategory(e.target.value)}}></input>
            <input type="text" className={styles.input} placeholder="dd/mm/yyyy" onChange={(e)=>{setDate(e.target.value)}}></input>
            <button className={styles.shadowButton} style={{backgroundColor:"#F4BB4A",width:"220px"}} onClick={handleSubmit}>Add Balance</button>
            <button className={styles.shadowButton} style={{backgroundColor:"#E3E3E3",color:"black",fontWeight:"400",width:"110px"}} onClick={handleCloseExpense}>Cancel</button>
           </div>
          </Box>
        </Fade>
      </Modal>
      </div>
      <div className={styles.itemsWrapper}>
        <div className={styles.chart}>
          <Chart data={chartData} />
        </div>
        <div className={styles.container} style={{gap:"30px"}}>
          <div className={styles.container} style={{gap:"5px"}}>
            <div className={styles.box} style={{backgroundColor:"#A000FF"}}></div>
            <p>Food</p>
          </div>
          <div className={styles.container} style={{gap:"30px"}}>
          <div className={styles.container} style={{gap:"5px"}}>
            <div className={styles.box} style={{backgroundColor:"#FF9304"}}></div>
            <p>Entertainment</p>
            </div>
          </div>
          <div className={styles.container} style={{gap:"30px"}}>
          <div className={styles.container} style={{gap:"5px"}}>
            <div className={styles.box} style={{backgroundColor:"#FDE006"}}></div>
            <p>Travel</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>

  );
};

export default ExpenseTracker;
