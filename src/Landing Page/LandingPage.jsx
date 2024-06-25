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
    else if (item.category === "entertainment")
      entertainment += parseInt(item.price);
    else if (item.category === "travel") travel += parseInt(item.price);
  });
  return [
    { name: "Travel", value: travel },
    { name: "Entertainment", value: entertainment },
    { name: "Food", value: food },
  ];
};
const LandingPage = () => {
  const [data, setData] = useState([]);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("data") === null) {
      const tempData = [
        {
          name: "Samosa",
          date: "11/06/2024",
          price: 150,
          category: "food",
        },
        {
          name: "Movie",
          date: "08/06/2024",
          price: 300,
          category: "entertainment",
        },
        { name: "Auto", date: "05/06/2024", price: 50, category: "travel" },
      ];
      localStorage.setItem("data",JSON.stringify(tempData));
    }
      const data = JSON.parse(localStorage.getItem("data"));
      setData(data);
      const chart = calculateData(data);
      setChartData(chart);
    
  }, []);

  return (
    <div>
      <div className={styles.container}>
        <ExpenseTracker
          data={data}
          setData={setData}
          chartData={chartData}
          setChartData={setChartData}
        />
        <div className={styles.wrapper}>
          <Table data={data} setData={setData}
          setChartData={setChartData}/>
          <VerticalChart data={chartData} />
        </div>
      </div>
    </div>
  );
};
export default LandingPage;
