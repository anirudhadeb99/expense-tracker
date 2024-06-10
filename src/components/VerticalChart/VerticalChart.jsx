import styles from "./VerticalChart.module.css";
import { BarChart,XAxis,YAxis,Bar } from "recharts";
const VerticalChart = ({data})=>{
return (
    <div>
    <h1 className={styles.italic}>Top Expenses</h1>
    <div className={styles.container}>
    <BarChart width={580} height={290} data={data} barCategoryGap={70}>
   <XAxis dataKey="name" />
   <YAxis/>
  <Bar dataKey="value" fill="#8884d8" />
 </BarChart>
    </div>
    </div>
)
}

export default VerticalChart;