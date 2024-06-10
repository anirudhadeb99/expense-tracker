import VerticalChart from "../components/VerticalChart/VerticalChart";
import ExpenseTracker from "../components/ExpenseTracker/ExpenseTracker";
import Table from "../components/Table/Table";
import styles from "./LandingPage.module.css";
import { useEffect, useState } from "react";
const LandingPage = () => {
  const data = [
    {
      name: "Samosa",
      date: "20/12/2024",
      price: 150,
      category: "food",
    },

    {
      name: "Movie",
      date: "20/12/2024",
      price: 300,
      category: "entertainment",
    },

    {
      name: "Auto",
      date: "20/12/2024",
      price: 50,
      category: "travel",
    },
    {
      name: "Pizza",
      date: "20/12/2024",
      price: 400,
      category: "food",
    },

    {
      name: "Cricket",
      date: "20/12/2024",
      price: 300,
      category: "entertainment",
    },

    {
      name: "Plane",
      date: "20/12/2024",
      price: 1000,
      category: "travel",
    },
  ];

  const calculateData = () => {
    let food = 0,
      entertainment = 0,
      travel = 0;

    data.map((item) => {
      if (item.category === "food") food += item.price;
      else if (item.category === "entertainment") entertainment += item.price;
      else if (item.category === "travel") travel += item.price;
    });
    return [
      { name: "Travel", value: travel },
      { name: "Entertainment", value: entertainment },
      { name: "Food", value: food },
    ];
  };

  return (
    <div>
    <div className={styles.container}>
      <ExpenseTracker chartData={calculateData()} />
      <div className={styles.wrapper}>
      <Table data={data} />
        <VerticalChart data={calculateData()}/>
      </div>
    </div>
    </div>
  );
};
export default LandingPage;
