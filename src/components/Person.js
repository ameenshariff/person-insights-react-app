import React from 'react';
import avatar from '../images/download.png'

function Person({ data }) {
    console.log(data)
    let profilesObj = {}
    if (Object.keys(data.details.profiles).length !== 0) {
        profilesObj = Object.values(data.details.profiles);
    }


    return (
        <div>
            <h1>{data.fullName}</h1>
            <img id="avatar-img" src={data.avatar !== null ? data.avatar : avatar} alt="Avatar"></img>
            {data.bio && <p style={{
                borderStyle: 'solid',
                borderWidth: '2px',
                padding: '10px',
                margin: '10px'
            }}>{data.bio}</p>}
            {(!data.status) &&
                <div style={{ textAlign: 'center', padding: '10px', marginBottom: '50px' }}>
                    {data.details.employment.length > 0 &&
                        <div>
                            <div>
                                <span><b>Company Name: </b></span>
                                <span>{data.details.employment[0].name}</span>
                            </div>
                            <div>
                                <span><b>Currently Employed: </b></span>
                                <span>{data.details.employment[0].current ? 'Yes' : 'No'}</span>
                            </div>
                            <div>
                                <span><b>Title: </b></span>
                                <span>{data.details.employment[0].title}</span>
                            </div>
                        </div>}
                    {data.details.emails.length > 0 &&
                        <div>
                            <span><b>Emails: </b></span>
                            <span>{'[' + data.details.emails.map(email => email) + ']'}</span>
                        </div>}
                    {Object.keys(data.details.profiles).length !== 0 &&
                        <div style={{ padding: '20px', height: '100px' }}>
                            <span><b>Social Profiles: </b></span>
                            {profilesObj.map((pro, i) => {
                                return (
                                    <div>
                                        {/* <div key={i}>{pro.service}</div> */}
                                        <a key={i} href={pro.url} target="_blank">{pro.service}</a>
                                    </div>
                                )
                            })}

                        </div>}

                </div>
            }


        </div>
    );
}

export default Person;
