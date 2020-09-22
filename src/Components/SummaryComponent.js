import React from 'react'
import { Table } from 'reactstrap';
import SummaryFilter from './SummaryFilter'

class SummaryComponent extends React.Component {

state={month: 0}


changeHandler = (e) => {
    this.setState({month: parseInt(e.target.value)})
}

filterBudgetsByMonth = () => {
    return this.props.budgets.filter(budgetObj => {
        // debugger
        return budgetObj.month === this.state.month ? this.state.month : 0

            })
    }

    filterTransactionsByMonth = () => {
        return this.props.transactions.filter(transObj => {
            return transObj.month === this.state.month ? this.state.month : 0
                })
        }

//create array of category IDs (will eventualy replace table w/category name)
categoryId = () => {
     return this.filterBudgetsByMonth().map(budget => {
         return this.renderRow(budget);
     })
 }

renderRow = ({ category_id, category_name, amount, trans_type }) => {
    let totalSpend = this.findTotalSpend(category_id) || 0
    let variance = Math.round((amount + this.findTotalSpend(category_id)), 2)
    let absValue = Math.abs(amount) + Math.abs(totalSpend)
    // debugger
    
    if(trans_type ==="Expense" && absValue>0){
    
    return (
        <>
            <tr>
                <td>{category_id}</td>
                <td>{category_name}</td>
                <td>${amount}</td> 
                <td>${totalSpend}</td> 
                <td>${variance}</td> 
            </tr>
        </>
        );
    }
}

    findTotalSpend = (categoryId) => {
        const categorySumById = this.totalCategorySpend();
        // debugger
        return categorySumById[categoryId] || 0
    }

    totalCategorySpend = () => {
        if (this.props.transactions){
            const categorySumById = {}
            this.props.transactions.map(transaction => {
                // check if object has key of category_id; if not, create that and set to transactionObj amount
                if (!(transaction.category_id in categorySumById)){
                    categorySumById[transaction.category_id] = transaction.amount
                } else {
                    // if key exists, sum existing value
                    categorySumById[transaction.category_id] += transaction.amount
                }

            })
            // debugger
            return categorySumById;
        }
    }


//populate table with category names
    budgetCategory = () => {
        return this.filterBudgetsByMonth().map(budget => {
            return budget.category_name 
            })
    }

//populate table with budgeted amounts
    budgetAmount = () => {
        return this.filterBudgetsByMonth().map(budget => {
            if(budget.trans_type ==="Expense"){
                return budget.amount}
            else{
                return 0
            }
        })
    }

//array of transaction objects
    transAmount = () => {
        return this.filterTransactionsByMonth().map(transObj => {
            if(transObj.trans_type === "Expense"){
            return transObj.amount}
            else{
                return 0
            }
        })
    }


    projectedIncome = () => {
        // return this.props.budgets.map(budget => {
        return this.filterBudgetsByMonth().map(budget => {
            if(budget.trans_type ==="Income" || budget.amount < 0){
                return budget.amount}
            else{
                return 0
            }
        })
    }

//array of transaction objects - this can be cleaned up
    actualIncome = () => {
        return this.filterTransactionsByMonth().map(transObj => {
            if(transObj.trans_type === "Income" || transObj.amount > 0){
            return transObj.amount}
            else{
                return 0
            }
        })
    }





    render() {
        // console.log(this.filterBudgetsByMonth())
        // console.log(this.filterTransactionsByMonth())


        return(
            <>
            {this.props.transactions === null || this.props.budgets === null || this.props.bank_accounts === null
            
            ?
            "" :
            <div className="homepage-div">
            <br/> <br/> <br/>
            <SummaryFilter month={this.state.month} filterBudget={this.filterBudgetsByMonth} filterTrans={this.filterTransactionsByMonth} changeHandler={this.changeHandler} />
            <br/> <br/> <br/>
            <h5>Earning Summary</h5>

            <Table>
                    <thead>
                    <tr>
                        <th>Category ID</th>
                        <th>Category Name</th>
                        <th>Projected Income</th> 
                        <th>Actual Income</th>
                        <th>Variance</th>
                        <th></th>
                    </tr>
                </thead>

                <tbody>
                    <tr>
                        <td></td>
                        <td>Income</td>
                        <td>${this.projectedIncome().reduce((a,b) => a+b, 0)}</td>
                        <td>${this.actualIncome().reduce((a,b) => a+b, 0)}</td>
                        <td>${this.projectedIncome().reduce((a,b) => a+b, 0) + this.actualIncome().reduce((a,b) => a+b, 0)}</td>
                    </tr>
                    </tbody>
                </Table>
                <br/> <br/> <br/>





            <h5>Spending Summary</h5>
                <Table>
                    <thead>
                    <tr>
                        <th>Category ID</th>
                        <th>Category Name</th>
                        <th>Expense Budget</th> 
                        <th>Spend by Category Amount</th>
                        <th>Variance</th>
                        <th></th>
                    </tr>
                </thead>

                <tbody>
                    {this.categoryId() || null}
                    <tr>
                        <td>Grand Total</td>
                        <td></td>
                        <td>${this.budgetAmount().reduce((a,b) => a+b, 0)}</td>
                        <td>${Math.round(this.transAmount().reduce((a,b) => a+b, 0),2)}</td>
                        <td>${this.budgetAmount().reduce((a,b) => a+b, 0) + Math.round(this.transAmount().reduce((a,b) => a+b, 0),2)}</td>
                    </tr>
                    </tbody>
                </Table>

            </div>
            }
            </>

        )
    }

}

export default SummaryComponent
















//move to new component and import here
// import { Chart } from 'react-charts'
 
// function MyChart(props) {
//     const data = React.useMemo(
//       () => [
//         {
//           label: 'Series 1',
//           data: [{ x: 1, y: 10 }, { x: 2, y: 10 }, { x: 3, y: 10 }]
//         },
//         {
//           label: 'Series 2',
//           data: [{ x: 1, y: 10 }, { x: 2, y: 10 }, { x: 3, y: 10 }]
//         },
//         {
//           label: 'Series 3',
//           data: [{ x: 1, y: 10 }, { x: 2, y: 10 }, { x: 3, y: 10 }]
//         }
//       ],
//       []
//     )
   
//     const axes = React.useMemo(
//       () => [
//         { primary: true, type: 'linear', position: 'bottom' },
//         { type: 'linear', position: 'left' }
//       ],
//       []
//     )
//   //  console.log(props)
//     return (
//       <div
//         style={{
//           width: '400px',
//           height: '300px'
//         }}
//       >
//         <Chart data={data} axes={axes} />
//       </div>

//     )
//   }

// export default MyChart