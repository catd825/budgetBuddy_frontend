import React from 'react'


class SummaryComponent extends React.Component {
    render() {
        console.log(this.props)
        return(
            <>
            {this.props.transactions === null || this.props.budgets === null || this.props.bank_accounts === null
            
            ?
            "" :
            <>
            <p>Budget: {this.props.budgets[0].category_name}</p>
            <p>Amount: {this.props.budgets[0].amount}</p>
            <p>Spend: {this.props.budgets[0].amount}</p>
            
            </>
            
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