import React from 'react'
import { Table } from 'reactstrap';
// import BudgetCategory from './BudgetCategory'
// import TransactionCategory from './TransactionCategory.js'

class SummaryComponent extends React.Component {

//eventually set state here for filtering and revising sum

renderRow = ({ category_id, category_name, amount }) => {
    return (
        <>
            <tr>
                <td>{category_id}</td>
                <td>{category_name}</td>
                <td>${amount}</td> 
                <td>{this.findTotalSpend(category_id)}</td> 
            </tr>
        </>
    );
}
    findTotalSpend = (categoryId) => {
        const categorySumById = this.totalCategorySpend();
        return categorySumById[categoryId]
    }

    totalCategorySpend = () => {
        if (this.props.transactions){
            console.log(this.props.transactions)
            // experimenting with JavaScript's Set object to create unique array object
            // return this.props.transactions.map(transaction => transaction.category_id)
            // return [... new Set(this.props.transactions.map(transaction => transaction.category_id))]
            const categorySumById = {}
            this.props.transactions.map(transaction => {
                // check if object has key of category_id; if not, create that and set to transactionObj amount
                if (!(transaction.category_id in categorySumById)){
                    // newObj = {...categorySumById}
                    categorySumById[transaction.category_id] = transaction.amount
                } else {
                    // if key exists, sum existing value
                    categorySumById[transaction.category_id] += transaction.amount
                }
            })
            return categorySumById;
        }
    }

    // delete the below; not using this logic anymore...

    // parseBudgetHelper = (targetProp) => {
    //     const idk = this.props.budgets
    //     switch (targetProp) {
    //         case "categoryName":
                
    //             break;
    //         case "categoryBudget":

    //             break;
    //         case "categorySpend":

    //             break;
    //         default:
    //             break;
    //     };
    // }




//create array of category IDs (will eventualy replace table w/category name)
    categoryId = () => {
       console.log("cat prop check ", this.props.budgets)
        return this.props.budgets.map(budget => {
            console.log("cat id ", budget)
            return this.renderRow(budget);
        })
        
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
    transObj = () => {
        return this.props.transactions.map(transObj => {
            return transObj
        })
    }

    render() {
        // let transArray = this.props.transactions.map(transObj => transObj)

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
                        <th>category id</th>
                        <th>category name</th>
                        <th>budget amount</th> 
                        <th>spend by category amount</th>
                    </tr>
                </thead>

                <tbody>
                    {this.categoryId() || null}
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