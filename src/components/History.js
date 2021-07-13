import React, { useEffect, useState } from 'react';
import { fetchHistory } from '../API';


function History(props) {

    const [history, setHistory] = useState([]);

    useEffect(() => {
        fetchHistoryFromApi();
    }, [])

    const fetchHistoryFromApi = () => {
        fetchHistory()
            .then(data => {
                setHistory(data)
                // console.log(data)
            })
    }

    return (
        <div>
            <h2 style={{ padding: '50px', alignItems: 'center' }}>Query History</h2>
            <table>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Email/Phone</th>
                        <th>Full Name</th>
                        <th>Query Timestamp</th>
                    </tr>
                </thead>
                {console.log(history)}
                <tbody>

                    {history.map((h, index) => {
                        return (
                            <tr key={index + 1}>
                                <td>{index + 1}</td>
                                <td>{h.email ? h.email : h.phone}</td>
                                <td>{h.fullName}</td>
                                <td>{h.timeStamp}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            {history.length === 0 &&
                <h4 style={{ color: 'red', marginLeft: '500px', marginTop: '50px' }}>No history to display</h4>}
        </div>
    );
}

export default History;