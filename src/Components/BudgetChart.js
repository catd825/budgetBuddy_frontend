
import React, { PureComponent } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';




class CustomizedLabel extends PureComponent {

  render() {
    const {
      x, y, stroke, value,
    } = this.props;

    return <text x={x} y={y} dy={-4} fill={stroke} fontSize={10} textAnchor="middle">{value}</text>;
  }
}

class CustomizedAxisTick extends PureComponent {
  render() {
    const {
      x, y, stroke, payload,
    } = this.props;

    return (
      <g transform={`translate(${x},${y})`}>
        <text x={0} y={0} dy={16} textAnchor="end" fill="#666" transform="rotate(-35)">{payload.value}</text>
      </g>
    );
  }
}




// const data = [
//   {
//     name: 'January', income: 4000, expense: 2400, amt: 2400,
//   },
//   {
//     name: 'February', income: 3000, expense: 1398, amt: 2210,
//   },
//   {
//     name: 'March', income: 2000, expense: 9800, amt: 2290,
//   },
//   {
//     name: 'April', income: 2780, expense: 3908, amt: 2000,
//   },
//   {
//     name: 'May', income: 1890, expense: 4800, amt: 2181,
//   },
//   {
//     name: 'June', income: 2390, expense: 3800, amt: 2500,
//   },
//   {
//     name: 'July', income: 3490, expense: 4300, amt: 2100,
//   },
//   {
//     name: 'August', income: 3490, expense: 4300, amt: 2100,
//   },
//   {
//     name: 'September', income: 3490, expense: 4300, amt: 2100,
//   },
//   {
//     name: 'October', income: 3490, expense: 4300, amt: 2100,
//   },
//   {
//     name: 'November', income: 3490, expense: 4300, amt: 2100,
//   },
//   {
//     name: 'December', income: 3490, expense: 4300, amt: 2100,
//   }
// ];

export default class Example extends PureComponent {


data = () => {






//  let data = {}
//     this.props.projectedBudgets.map(budget =>{
           
//             if (!([budget.month] in data)){
//                 console.log(1111, data)
//                 data[budget.month] = {}
//                 data[budget.month] = budget.amount
//                 console.log(1122, data)
//             } else {
//                 console.log(2222, data)
//                 data[budget.month] += budget.amount
//             }

//         })            
//     console.log(3333, data)
//     return data
//     console.log(data)


        return this.props.projectedBudgets.map(budget => {
           let data={}
            data["name"] = budget.category_name
            console.log("month", data)
            budget.trans_type === "Expense" ? data["expense"] = budget.amount : data["expense"] = 0
            // budget.trans_type === "Income" ? data["income"] = Math.abs(budget.amount) : data["income"] = 0
            console.log("amount", data)
            return data
        })
}



  static jsfiddleUrl = 'https://jsfiddle.net/alidingling/5br7g9d6/';

  render() {
    return (
      <>
      <h5>Monthly Budget Summary</h5>
      <LineChart
        width={1000}
        height={400}
        data={this.data()}
        margin={{
          top: 20, right: 30, left: 20, bottom: 10,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" height={60} tick={<CustomizedAxisTick />} />
        <YAxis />
        <Tooltip />
        {/* <Legend /> */}
        <Line type="monotone" dataKey="expense" stroke="#8884d8" label={<CustomizedLabel />} />
        {/* <Line type="monotone" dataKey="" stroke="#82ca9d" /> */}
      </LineChart>
      </>
    );
  }
}
