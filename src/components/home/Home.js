import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import CardContainer from "../Cards/CardContainer";
import { BASE_URL, API_KEY } from "../APis/api";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from "axios"
const items = [
    'Business',
    'Entertainment',
    'General',
    'Health',
    'Science',
    'Sports',
    'Technology'
];
const sources = [
    'bbc-news',
    'cnn',
    'the-verge',
    'al-jazeera-english',
    'the-wall-street-journal',
    'abc-news',
    'reuters'
];

function Home() {
    const [newApi, setNewsAPi] = useState([])
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [queary, setQueary] = useState("")
    const [isOpenCat, setIsOpenCat] = useState(false);
    const [isOpenSorce, setIsOpenSorce] = useState(false);
    const [selectedCat, setSelectedCat] = useState("");
    const [selectedSource, setSelectedSource] = useState("");

    useEffect(() => {

        getNewsData()
    }, [])
    useEffect(() => {
        if (queary.length > 3) {
            getSearchedArticle()
        }

        if (queary === "") {
            // getNewsData()
        }
    }, [queary])
    useEffect(() => {
        if (selectedCat) {
            getDataByCategory();
        }
    }, [selectedCat]);
    useEffect(() => {
        if (selectedSource) {
            getDataBySource();
        }
    }, [selectedSource]);

    useEffect(() => {
        if (startDate && endDate) {
            getDataByDate()
        }
    }, [startDate, endDate])

    const toggleDropdownSorce = () => {
        setIsOpenSorce(!isOpenSorce);

        setIsOpenCat(false)
    };
    const toggleDropdownCat = () => {
        setIsOpenCat(!isOpenCat);
        setIsOpenSorce(false)
    };
    const handleItemClick = (item) => {
        setSelectedCat(item)
        setIsOpenSorce(false);

    };
    const handleSource = (item) => {
        setSelectedSource(item)
    }
    const handleStartDateChange = (e) => {
        setStartDate(e.target.value);
    };

    const handleEndDateChange = (e) => {
        setEndDate(e.target.value);
    };
    // fetch calls to get the data
    const getNewsData = async () => {
        try {
            //newsAPI
            const response = await axios.get(`${BASE_URL}top-headlines?country=us&apiKey=${API_KEY}`)
            const data = await response.data;
            setNewsAPi(data.articles)

        } catch (error) {
            console.log(console.log(error, "error"))
        }

    }

    // search functinality by both api's guardian and NewsApi un comment and use it
    const getSearchedArticle = async () => {
        try {
            // const response = await axios.get(`${BASE_URL}everything?q=${queary}&apiKey=${API_KEY}`)
            const response = await axios.get(`https://content.guardianapis.com/search?q=technology&api-key=c5f4b694-529f-4ef6-b02b-dbe46b49f066`)
            const data = await response.data;
            // setNewsAPi(data.articles)
            setNewsAPi(data.response.results)
        } catch (error) {
            console.log(console.log(error, "error"))
        }

    }
    const getDataByCategory = async () => {
        const response = await axios.get(`${BASE_URL}top-headlines?category=${selectedCat}&apiKey=${API_KEY}`)
        const data = await response.data
        console.log(data.articles, "getDataByCategory")
        setNewsAPi(data.articles)
    }
    const getDataBySource = async () => {

        const response = await axios.get(`${BASE_URL}top-headlines?sources=${selectedSource}&apiKey=${API_KEY}`)
        const data = await response.data
        setNewsAPi(data.articles)
    }
    const getDataByDate = async () => {
        const response = await axios.get(`${BASE_URL}/everything?q=technology&from=${startDate}&to=${endDate}&sortBy=popularity&apiKey=${API_KEY}`)
        const data = await response.data
        console.log(data.articles, "by date")
        setNewsAPi(data.articles)
    }
    console.log(startDate, "startDate")
    console.log(endDate, "endDate")
    return (
        <div className="homeContainer">
            <div className="home">
                <div className="homeHeader">
                    <div className="filterConatiner">

                        <div className="dateRangeSelecter">
                            <span>By Date</span>

                            <label>
                                From:
                                <input
                                    id="dateRangeSelect"
                                    type="date"
                                    value={startDate}
                                    onChange={handleStartDateChange}
                                />
                            </label>
                            <br />
                            <label>
                                To:
                                <input
                                    id="dateRangeSelect"
                                    type="date"
                                    value={endDate}
                                    onChange={handleEndDateChange}
                                />
                            </label>
                            <div>
                            </div>
                        </div>
                        <div onClick={toggleDropdownCat} className="dropdown">
                            <span>Category</span>
                            <KeyboardArrowDownIcon />
                            {isOpenCat && (
                                <ul className="dropdown-menu">
                                    {items.map((item) => (
                                        <li key={item} onClick={() => handleItemClick(item)} className="dropdown-item">
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                        <div onClick={toggleDropdownSorce} className="dropdown">
                            <span>Source</span>
                            <KeyboardArrowDownIcon />
                            {isOpenSorce && (
                                <ul className="dropdown-menu">
                                    {sources.map((item) => (
                                        <li key={item} onClick={() => handleSource(item)} className="dropdown-item">
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>
                    <div className="searchContainer">
                        <input type="text" placeholder="search here" onChange={(e) => { setQueary(e.target.value) }} />
                        <SearchIcon />
                    </div>
                </div>
                <div className="homeBody">
                    <CardContainer newApi={newApi} />
                </div>
            </div>
        </div >
    );
}

export default Home;
