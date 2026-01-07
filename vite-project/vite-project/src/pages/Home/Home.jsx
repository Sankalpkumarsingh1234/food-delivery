import React,{useState} from 'react';
import './Home.css';
import Header from '../../Header.jsx';
import ExploreMenu from '../../ExploreMenu.jsx';   
import FoodDisplay from '../../FoodDisplay.jsx';
import Footer from '../../Footer.jsx';
export default function Home() {
     const [category,setCategory]=useState("All");
    return (
        <>
            <Header />
            <ExploreMenu category={category} setCategory={setCategory} />
            <FoodDisplay />
            <Footer/>
        </>
    );
}