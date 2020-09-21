import React from 'react'
import { Table } from 'reactstrap';

class SummaryComponent extends React.Component {

//eventually set state here for filtering and revising sum

//create array of category IDs (will eventualy replace table w/category name)
categoryId = () => {
    // console.log("cat prop check ", this.props.budgets)
     return this.props.budgets.map(budget => {
        //  console.log("cat id ", budget)
         return this.renderRow(budget);
     })
 }

renderRow = ({ category_id, category_name, amount }) => {
    return (
        <>
            <tr>
                <td>{category_id}</td>
                <td>{category_name}</td>
                <td>${amount}</td> 
                <td>{this.findTotalSpend(category_id) || 0}</td> 
                <td>{Math.round((amount + this.findTotalSpend(category_id)), 2)}</td> 
            </tr>
        </>
    );
}

    findTotalSpend = (categoryId) => {
        const categorySumById = this.totalCategorySpend();
        // debugger
        return categorySumById[categoryId] || 0
    }

    totalCategorySpend = () => {
        if (this.props.transactions){
            // console.log(this.props.transactions)
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
            return categorySumById;
        }
    }

//populate table with category names
    budgetCategory = () => {
        return this.props.budgets.map(budget => {
            return budget.category_name //will change to category name

            })
    }

//populate table with budgeted amounts
    budgetAmount = () => {
        return this.props.budgets.map(budget => {
            return budget.amount
        })
    }

//array of transaction objects
    transAmount = () => {
        return this.props.transactions.map(transObj => {
            return transObj.amount
        })
    }

    render() {
        return(
            
            <>
            {this.props.transactions === null || this.props.budgets === null || this.props.bank_accounts === null
            
            ?
            "" :
            <div className="homepage-div">
            <p>Search/filter</p>
            <h1>spend by category</h1>
                <Table>
                    <thead>
                    <tr>
                        <th>Category ID</th>
                        <th>Category Name</th>
                        <th>Category Budget</th> 
                        <th>Spend by Category Amount</th>
                        <th>Variance</th>
                        <th></th>
                    </tr>
                </thead>

                <tbody>
                    {this.categoryId() || null}
                </tbody>
                    <tr>
                        <td>Grand Total</td>
                        <td></td>
                        <td>{this.budgetAmount().reduce((a,b) => a+b, 0)}</td>
                        <td>{Math.round(this.transAmount().reduce((a,b) => a+b, 0),2)}</td>
                        <td>{this.budgetAmount().reduce((a,b) => a+b, 0) + Math.round(this.transAmount().reduce((a,b) => a+b, 0),2)}</td>

                        {/* <td>{Math.round((amount + this.findTotalSpend(category_id)), 2)}</td>  */}


                    </tr>
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