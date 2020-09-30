import React from 'react';
import { Input } from 'reactstrap';

class TransactionFilter extends React.Component {
    render () {
        console.log(this.props)
        return(
            <div id="search" style={{ width: "500px" }}>
                <form id="searchForm">
                    <Input type="text" placeholder="search by description or category" value={this.props.searchValue} onChange={this.props.searchHandler} />
                </form>
            </div>
        )
    }
}

export default TransactionFilter
