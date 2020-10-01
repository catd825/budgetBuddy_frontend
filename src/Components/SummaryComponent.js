import React from 'react'
import { Table, ListGroup, ListGroupItem } from 'reactstrap';
import SummaryFilter from './SummaryFilter'
import BarChart from './BarChart'




class SummaryComponent extends React.Component {

state={month: 10}


changeHandler = (e) => {
    this.setState({month: parseInt(e.target.value)})
}

filterBudgetsByMonth = () => {
    return this.props.budgets.filter(budgetObj => {  
      if(this.state.month === budgetObj.month){  
        return budgetObj.month} else if (this.state.month === 0) { 
          return budgetObj}
            })
    }


    // filterBudgetsByMonth = () => {
    //     return this.props.budgets.filter(budgetObj => this.state.month === 0 ? budgetObj : budgetObj.month)
    // }

    // filterTransactionsByMonth = () => {
    //     return this.props.transactions.filter(transObj => {  
    //       if(this.state.month === transObj.month){ 
    //         return transObj.month} else if (this.state.month === 0) { 
    //           return transObj
    //         }
    //             })
    //     }


    filterTransactionsByMonth = () => {
        return this.props.transactions.filter(transObj => this.state.month === transObj.month || this.state.month === 0 )
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
                <td>{category_name}</td>
                <td>${amount}</td> 
                <td>${Math.abs(totalSpend)}</td> 
                <td>${Math.abs(variance)}</td>
                <td>{amount === 0 ? 0+"%" :
                Math.abs(parseFloat(totalSpend/amount)).toFixed(2)*100+"%"}</td>  

            </tr>
        </>
        );
    }
}

chartId = () => {
    return this.filterBudgetsByMonth().map(budget => {
            return this.renderChartData(budget)
    })
}

renderChartData = ({ category_id, category_name, amount, trans_type, month}) => {
    let totalSpend = Math.round(this.findTotalSpend(category_id, month),2) || 0
    let absValue = Math.abs(amount) + Math.abs(totalSpend)
    
    
    if(trans_type ==="Expense" && absValue > 0){
        let object={}
        object["name"]=category_name || 0
        object["transaction"]=Math.abs(totalSpend) || 0
        object["budget"]=amount|| 0
        return object 
    }

}

    findTotalSpend = (categoryId, month) => {
        const categorySumById = this.totalCategorySpend();

        if (categorySumById[categoryId]) {
            return categorySumById[categoryId][month]

        } else if (!categorySumById[categoryId]){
            return null
        }
        
    }

    totalCategorySpend = () => {
        const categoryMonthSumById = {}
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
        return this.filterBudgetsByMonth().map(budget => {
            if(budget.trans_type ==="Income" || budget.amount < 0){
                return budget.amount}
            else{
                return 0
            }
        })
    }

    chooseMonth=() => {
        let  months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        let d = this.state.month - 1
        let monthName = months[d]
        return monthName
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
            <div className="main-div">
            <br/> <br/> <br/>
            <SummaryFilter month={this.state.month} changeHandler={this.changeHandler} />
            <br/> <br/> <br/>
            {this.state.month ===0 ? "" : 
            <>
            <h5>Monthly Budget Summary {this.chooseMonth()}</h5>
            <div className="landing-page-div">

                <BarChart data={this.chartId()} projectedBudgets={this.filterBudgetsByMonth()}/>
                <div className="summary-div"><h3></h3>
                <ListGroup>
                    <ListGroupItem><h5><b>Summary</b></h5></ListGroupItem>
                    <ListGroupItem>Expected Earnings: ${Math.abs(this.projectedIncome().reduce((a,b) => a+b, 0))}</ListGroupItem>
                    <ListGroupItem>Expected to Spend: ${this.budgetAmount().reduce((a,b) => a+b, 0)}</ListGroupItem>
                    <ListGroupItem>Savings goal: ${Math.abs(this.projectedIncome().reduce((a,b) => a+b, 0)) - this.budgetAmount().reduce((a,b) => a+b, 0)}</ListGroupItem>
                    <ListGroupItem>Actual Earnings: ${Math.abs(this.actualIncome().reduce((a,b) => a+b, 0))}</ListGroupItem>
                    <ListGroupItem>Spent to date: ${Math.abs(Math.round(this.transAmount().reduce((a,b) => a+b, 0),2))}</ListGroupItem>
                    <ListGroupItem>Remaining for the month: ${Math.abs(this.actualIncome().reduce((a,b) => a+b, 0)) - Math.abs(Math.round(this.transAmount().reduce((a,b) => a+b, 0),2))}</ListGroupItem>
                </ListGroup>
            
                </div>
            </div>
            <br/>
            
            <h5>Spending Summary</h5>
                <Table>
                    <thead>
                    <tr>
                        <th>Category Name</th>
                        <th>Expense Budget</th> 
                        <th>Spend by Category Amount</th>
                        <th>Variance</th>
                        <th>% through</th>
                        <th></th>
                    </tr>
                </thead>

                <tbody>
                    {this.categoryId() || null}
                    <tr>
                        <td>Grand Total</td>
                        <td>${this.budgetAmount().reduce((a,b) => a+b, 0)}</td>
                        <td>${Math.abs(Math.round(this.transAmount().reduce((a,b) => a+b, 0),2))}</td>
                        <td>${this.budgetAmount().reduce((a,b) => a+b, 0) + Math.round(this.transAmount().reduce((a,b) => a+b, 0),2)}</td>
                        <td>{parseFloat(Math.abs(Math.round(this.transAmount().reduce((a,b) => a+b, 0),2)/this.budgetAmount().reduce((a,b) => a+b, 0))).toFixed(2)*100+"%"}</td>
                        
                    </tr>
                    </tbody>
                </Table>
                </>
                 }   
                
            </div>

            }
            </>
        )
    }

}

export default SummaryComponent







