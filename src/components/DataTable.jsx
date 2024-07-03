export const DataTable = ({data = []}) => {
    return <>
        {data.length ? <div className="table-container">
            <table className="editor-table">
                    <thead>
                        <tr>{Object.keys(data[0]).map(k => <th key={k}>
                            {k}
                        </th>)}</tr>
                    </thead>
                    <tbody>
                        {data.map((item,i)=> <tr key={i}>
                            {Object.values(item).map((v, i) => <td key={i}>
                            {v}
                        </td>)}
                        </tr>)}
                    </tbody>
            </table>
        </div> : <h3>No Data Found.</h3>}
    </>
}