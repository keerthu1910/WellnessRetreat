import './style.scss';
import {useState} from 'react';
import axios from 'axios';
import moment from 'moment';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
export const Retreatdetails = () => {
    const [page,setPage] = useState(1);
    const [showFilteredData,setShowFilteredData] = useState('');
    const [filteredData,setFilteredData] = useState([]);
    const [searchedData,setSearchedData] = useState([]);
    const location = ['Delhi','Goa','Rishikesh','Varanasi','Pune','Agra','Chennai','Kolkata','Hyderabad','Mumbai','Kerala'];
    const retreattype = ['yoga', 'diet','fitness','weight loss','camp','mental wellness','pre-natal','post-natal']
    const handleChange = (filterparameter) => {
        setShowFilteredData('filtereddata');
        axios.get(`/retreats?filter=${filterparameter}`)
            .then(response=>setFilteredData(response.data))
                .catch(err=>{alert('No data found')})
        }

    const handleLocation = (locationparameter) => {
        setShowFilteredData('filtereddata');
        axios.get(`/retreats?location=${locationparameter}`)
            .then(response=>setFilteredData(response.data))
                .catch(err=>alert('No data found'))
    }    
    const handleSearch = (searchparameter) => {
        setShowFilteredData('searcheddata');
        axios.get(`/retreats?search=${searchparameter}`)
            .then(response=>setSearchedData(response.data))
                .catch(err=>{alert('No data found')})
    }

    const {data:retreatdata,isError,isLoading} = useQuery({
        queryKey:['retreatdata',page],
        queryFn:()=>axios.get(`/retreats?page=${page}&limit=3`).then(response=>response.data),
        placeholderData:keepPreviousData,
        staleTime:5*1000*60
    })

    if(isError){
        return(
            <div className='error-text' id='error-text'>
               There has been an error while fetching the data!
            </div>
        )
    }

    if(isLoading){
        return(
            <div className='loading-text' id='loading-text'>Loading Data...</div>
        )
    }

    return(
        <div className='retreat-details-container'>
            <div className='filter-options-container'>
                <div className='filter-container'>
                    <select id='date' name='date'>
                        <option value=''>Filter by date</option>
                        <option value='2023-2024'>2023-2024</option>
                        <option value='2024-2025'>2024-2025</option>
                    </select>
                    <select id='retrteat-location' name='retreat-location' onChange={(e)=>handleLocation(e.target.value)}>
                    <option value=''>Filter by Location</option>
                        {
                            location.map((item,index)=>(
                                <option value={item} key={index}>{item}</option>
                            ))
                        }
                    </select>
                    <select id='retreat-type' name='retreat-type' onChange={(e)=>handleChange(e.target.value)}>
                         <option value=''>Filter by Type</option>
                        {
                            retreattype.map((item,index)=>(
                                <option value={item} key={index}>{item}</option>
                            ))
                        }
                    </select>
                </div>
                <div className='search-container'>
                    <input type='text' className='search-bar' id='search-bar' placeholder='Search retreats by title' onKeyDown={(e) => {
                             if (e.key === "Enter"){
                                handleSearch(e.target.value);
                             }
                               
                    }}/>
                </div>
            </div>
            <div className='retreat-data-container'>
                     {
                        (showFilteredData === 'filtereddata' ? filteredData : showFilteredData === 'searcheddata' ? searchedData : retreatdata).map((item)=>(
                            <div key={item.id} className='retreat-data-card'>
                                <img src={item.image} alt='retreat-image' className='retreat-image' id='retreat-image'/>
                                <p className='retreat-title' id='retreat-title'>{item.title}</p>
                                <p className='retreat-description' id='retreat-description'>{item.description}</p>
                                <p className='retreat-date' id='retreat-date'>Date: {moment(item.date).format('MMM Do YYYY')}</p>
                                <p className='retreat-location' id='retreat-location'>Location: {item.location}</p>
                                <p className='retreat-price' id='retreat-price'>Price: ${item.price}</p>
                            </div>
                        ))
                     } 
            </div>
            {showFilteredData ? <></> : <div className='pagination-container'>
                <button className='previousbtn' onClick={()=>setPage(Math.max(page-1,1))} disabled={page===1}>Previous</button>
                <button className='nextbtn'onClick={()=>setPage(page+1)} disabled={page === Math.ceil(22/3)}>Next</button>
            </div>}
        </div>
    )
}
