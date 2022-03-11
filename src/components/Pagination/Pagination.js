function Pagination( {nowPage, totlaPage, clickFunction} ) {
    let arr = [];
    for (let i = 1 ; i < totlaPage+1 ; i++) {
        arr.push(<a onClick={() => clickFunction(i)}> {i} </a>);
    }
    return arr
}

export default Pagination