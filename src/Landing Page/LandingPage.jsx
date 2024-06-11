import VerticalChart from "../components/VerticalChart/VerticalChart";
import ExpenseTracker from "../components/ExpenseTracker/ExpenseTracker";
import Table from "../components/Table/Table";
import styles from "./LandingPage.module.css";
import { useEffect, useState } from "react";

export const calculateData = (data) => {
  let food = 0,
    entertainment = 0,
    travel = 0;

  data.map((item) => {
    if (item.category === "food") food += parseInt(item.price);
    else if (item.category === "entertainment") entertainment += parseInt(item.price);
    else if (item.category === "travel") travel += parseInt(item.price);
  });
  return [
    { name: "Travel", value: travel },
    { name: "Entertainment", value: entertainment },
    { name: "Food", value: food },
  ];
};

const LandingPage = () => {
  const [data,setData] = useState([])
  const [chartData,setChartData] = useState([]);


  useEffect(()=> {
    if(localStorage.getItem("data")!==null)
      {
        const parsedData = JSON.parse(localStorage.getItem("data"));
        setData(parsedData);}
    if(data.length>0)
  {  const chart = calculateData(data);
    setChartData(chart);
  }
  },[data])

  return (
    <div>
    <div className={styles.container}>
      <ExpenseTracker data={data} setData={setData} chartData={chartData} setChartData={setChartData} />
      <div className={styles.wrapper}>
      <Table data={data} />
        <VerticalChart data={chartData}/>
      </div>
    </div>
    </div>
  );
};
export default LandingPage;
