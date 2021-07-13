import React, { useState } from 'react';
import Person from './Person';
import { fetchPerson, saveHistory } from '../API';


function Home() {
    // state variables declaraition

    // this state variable is to store the option selected,
    // by default it is emial selected
    const [selectBar, setSelectBar] = useState('email');
    // This is to store the entered text for search
    const [searchText, setSearchText] = useState('');
    // the stores the object coming for full contact API call
    const [data, setData] = useState({});
    // to check if a search button is clicked
    const [searched, setSearched] = useState(false);
    // stores state if there is any error while fetching from API
    const [error, setError] = useState(false);
    // to handle the response delay
    const [loading, setLoading] = useState(false);
    // to store error message in case there is an error returned from API
    const [errorMsg, setErrorMsg] = useState('');

    // to fetch person and store the person data in state variable
    // after validating search input
    const getPersonFromAPI = () => {
        // if the search input data is blank
        if (!searchText) alert(`${selectBar.toUpperCase()} is blank`)
        // input is validated
        if (inputValidation()) {
            // to avoid clicking the button when we are fetching the data from API
            document.getElementById('s-btn').style.cursor = 'not-allowed';
            setLoading(true);
            fetchPerson({ [selectBar]: searchText })
                .then(data => {
                    setData(data)
                    setLoading(false)
                    document.getElementById('s-btn').style.cursor = 'pointer';
                    setSearched(true);
                    // to handle if the email/phone is not valid to fetch person enrich API
                    // & if the profile not found
                    if (data.status === 404 || data.status === 400) {
                        setErrorMsg(data.message);
                        setError(true)
                    }
                    else {
                        // this call saves the API query to backend and eventually persisted
                        saveQueryHistory(data)
                        setError(false)
                    }
                })
                .catch(err => {
                    setLoading(false)
                    document.getElementById('s-btn').style.cursor = 'pointer';
                })
        }

    }

    // API call to save the API query history
    const saveQueryHistory = (data) => {
        saveHistory(
            {
                [selectBar]: `${searchText}`,
                fullName: `${data.fullName}`,
            }
        ).then()

    }

    // Search input validation
    const inputValidation = () => {
        let ef = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        let phoneFormat = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
        if (selectBar === 'email') {
            if (searchText.match(ef))
                return true
            else
                return false
        } else if (selectBar === 'phone') {
            if (searchText.match(phoneFormat))
                return true
            else
                return false
        }
    }

    return (
        <div>
            <div className="container">
                {/* to select if you want to search by email or phone */}
                <select className="search-select" value={selectBar}
                    onChange={e => {
                        setSelectBar(e.target.value);
                        setSearchText('')
                    }}>

                    <option value='email'>Email</option>
                    <option value='phone'>Phone</option>
                </select>
                {/* search input for email/phone */}
                <input maxLength={selectBar === 'phone' ? '10' : '50'} onChange={e => {
                    setSearchText(e.target.value);
                    inputValidation();
                }}
                    value={searchText} className="search-bar" type="text"
                    placeholder={'Search by ' + (selectBar ? selectBar : 'Name')}></input>
                <br></br>
                {/* To display Search input validation error message */}
                {(searchText && !inputValidation()) && <span id="input-error" >
                    {selectBar === 'email' ? 'Email id is not valid' : 'Phone number is not valid'}
                </span>}
                <br></br>
                <button id="s-btn" type="button" onClick={getPersonFromAPI}
                    className="search-btn">Search</button>
            </div>
            {/* To display loading while the response is returned 
                Conditional rendering if there is any error while API call */}
            {loading ? <div className="person-container">
                <h1>Searching.....</h1>
            </div> :
                <div className="person-container">
                    {error && <h2 style={{ color: 'red' }}>{errorMsg}</h2>}

                    {(searched && !error) && <Person data={data} />}
                </div>}
        </div >
    );
}

export default Home;