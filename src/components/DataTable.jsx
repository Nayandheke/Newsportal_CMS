import { useEffect, useState } from "react"

export const DataTable = ({data = [], searchable = []}) => {
    const [term ,setTerm] = useState('')
    const [filtered, setFiltered] = useState([])

    useEffect(() => {
        if(term.length){
            let temp = data.filter(item => {
                for(let k of searchable){
                    if(`${item[k]}`.toLowerCase().includes(term.toLowerCase())){
                        return true
                    }
                }
                return false
            })
            setFiltered(temp)
        } else{
            setFiltered(data)
        }

    }, [term])

    return <>
        <div className="search-container">
            <input
                type="search"
                name="term"
                id="term"
                className="search-input"
                placeholder="Search..."
                aria-label="Search"
                onChange={ev => setTerm(ev.target.value)}
            />
        </div>
        {filtered.length ? <div className="table-container">
            <table className="editor-table">
                    <thead>
                        <tr>{Object.keys(filtered[0]).map(k => <th key={k}>
                            {k}
                        </th>)}</tr>
                    </thead>
                    <tbody>
                        {filtered.map((item,i)=> <tr key={i}>
                            {Object.values(item).map((v, i) => <td key={i}>
                            {v}
                        </td>)}
                        </tr>)}
                    </tbody>
            </table>
        </div> : <h3>No Data Found.</h3>}
    </>
}