import React, { useEffect, useState } from 'react';
import "../TablePage.css"
import { IconAt, IconPhoneCall, IconWorld, IconUserPlus, IconTrash, IconStar,IconUserMinus } from '@tabler/icons-react';
import axios from 'axios';


function TablePage() {

    const [data, setData] = useState([]);
    const [followStates, setFollowStates] = useState({});
    const [randomColor, setRandomColor] = useState('');

    const getData = () => {
        let url = "https://jsonplaceholder.typicode.com/users";
        axios.get(url).then((res) => {
            console.log("the ees", res);
            const initialFollowStates = {};
            res.data.forEach(user => {
                initialFollowStates[user.id] = false; // Initialize follow state for each user
                user.cardColor = generateRandomColor();
            });
            setFollowStates(initialFollowStates);
            setData(res.data);
            setRandomColor(generateRandomColor()); // Set random color once data is fetched
        }).catch((err) => {
            console.log("the error is", err)
        })
    }

    const toggleFollow = (userId) => {
        setFollowStates(prevState => ({
            ...prevState,
            [userId]: !prevState[userId] // Toggle follow state for the clicked user
        }));
    }

    useEffect(() => {
        getData();

    }, [])

    // Delete Specific Card

    const deleteCard = (userId) => {
        setData(prevData => prevData.filter(user => user.id !== userId));
    }

    // Ganrate randon colors for names

    const generateRandomColor = () => {
        return '#' + Math.floor(Math.random() * 16777215).toString(16);
    }

    return (

        <div className="main" style={{ display: 'flex', flexWrap: 'wrap' }}>

            {data.map((index) => {
                const initials = index.name.split(' ').map(name => name[0]).join('').toUpperCase();
                return (
                    <div class="card">
                        <div class="content">

                            <h1 className='first_name'>
                                <span className='cl_he_name' style={{ backgroundColor: index.cardColor }}>{initials}</span>
                            </h1>

                            <h4 style={{ marginTop: "45px", color: 'black' }}> {index.name}
                                <span>  {followStates[index.id] ? <IconStar /> : ''}</span>
                            </h4>
                            <div className='info-container'>
                                <p><span className="icon-span"><IconAt /></span><span >{index.email}</span></p>
                                <p><span className="icon-span"><IconPhoneCall /></span><span >{index.phone}</span></p>
                                <p><span className="icon-span"><IconWorld /></span><span >{index.website}</span></p>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'center', margin: "20px" }}>
                                <button
                                className={`my-button ${followStates[index.id] ? 'unfollow-button' : 'follow-button'}`}
                                    onClick={() => toggleFollow(index.id)}                                    
                                >
                                    {!followStates[index.id] ? (
                                        <>
                                            <IconUserPlus />
                                            Follow
                                        </>
                                    ) : (
                                        <>
                                            <IconUserMinus />
                                            Unfollow
                                        </>
                                    )}
                                </button>
                                <button onClick={() => deleteCard(index.id)} className='delete-button' ><IconTrash />Delete</button>
                            </div>
                        </div>
                    </div>

                )

            })}

        </div>
    );
}

export default TablePage;