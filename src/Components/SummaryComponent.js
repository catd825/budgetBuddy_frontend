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
      if(this.state.month === budgetObj.month){  
        return budgetObj.month} else if (this.state.month === 0) { 
          return budgetObj
        }
            })
    }

    filterTransactionsByMonth = () => {
        return this.props.transactions.filter(transObj => {  
          if(this.state.month === transObj.month){ 
            return transObj.month} else if (this.state.month === 0) { 
              return transObj
            }
                })
        }

categoryId = () => {
     return this.filterBudgetsByMonth().map(budget => {
         return this.renderRow(budget);
     })
 }



 renderRow = ({ category_id, category_name, amount, trans_type, month}) => {
    let totalSpend = Math.round(this.findTotalSpend(category_id, month),2) || 0
    let variance = Math.round((amount + this.findTotalSpend(category_id, month)), 2)
    let absValue = Math.abs(amount) + Math.abs(totalSpend)
    
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

    findTotalSpend = (categoryId, month) => {
        // console.log(categoryId)
        const categorySumById = this.totalCategorySpend();

        
        if (categorySumById[categoryId]) {
            return categorySumById[categoryId][month]
        } else {
            return 0
        }
    }

    totalCategorySpend = () => {
        const categoryMonthSumById = {}
        // console.log(111111, this.filterTransactionsByMonth())
        this.filterTransactionsByMonth().forEach(transaction => {
            // check if object has key of category_id; if not, create that and set to transactionObj amount
            if (!(categoryMonthSumById[transaction.category_id])){
                // category key is equal to transaction amount for all months
                categoryMonthSumById[transaction.category_id] = {}
                categoryMonthSumById[transaction.category_id][transaction.month] = transaction.amount
            } else if (!(categoryMonthSumById[transaction.category_id][transaction.month])){
                categoryMonthSumById[transaction.category_id][transaction.month] = transaction.amount
            } else {
                //category key is equal to transaction amount for all months
                categoryMonthSumById[transaction.category_id][transaction.month] += transaction.amount
            }
        })
        // console.log(22222, categoryMonthSumById)
        return categoryMonthSumById;
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

        return(
            <>
            {this.props.transactions === null || this.props.budgets === null || this.props.bank_accounts === null
            
            ?
            "" :
            <div className="homepage-div">
            <br/> <br/> <br/>
            <SummaryFilter month={this.state.month} changeHandler={this.changeHandler} />
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







