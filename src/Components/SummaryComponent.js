import React from 'react'
import { Table } from 'reactstrap';
// import BudgetCategory from './BudgetCategory'
// import TransactionCategory from './TransactionCategory.js'


class SummaryComponent extends React.Component {

//create array of category IDs (will eventualy replace table w/category name)
    categoryId = () => {
        return this.props.budgets.map(budget => {
            return <tr>{budget.id}</tr>
            })
    }

 //Create array of IDs    
    transCategory = () => {
       return this.categoryId().map(budget => budget.props.children)
    }


//create array of transaction amounts
    transObjArray = () => {
        return this.props.transactions.map(transObj => {
            return transObj
        })
    }

    reduceTrans = () => {
        debugger

        // return this.transObjArray().map(trans => {
        //     debugger
        // })
    }


//populate table with category names
    budgetCategory = () => {
        return this.props.budgets.map(budget => {
        return <tr>{budget.id}</tr> //will change to category name

            })
    }

//populate table with budgeted amounts
    budgetAmount = () => {
        return this.props.budgets.map(budget => {
        return <tr>${budget.amount}</tr>
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
                        <th>category id</th>
                        <th>budget amount</th>
                        <th>spend by category amount</th>
                    </tr>
                </thead>
                <tbody>
                <td>
                    <tr>
                        {this.categoryId()}
                    </tr>
                </td>
                <td>
                    <tr>
                        {this.budgetAmount()}
                    </tr>
                </td>

                <td>
                    <tr>
                        {this.reduceTrans()}
                    </tr>
                </td>

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