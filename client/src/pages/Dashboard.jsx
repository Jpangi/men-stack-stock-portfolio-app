import { useNavigate } from "react-router";
import { useState } from "react";
import axios from 'axios';
import { BASEURL } from "../constants/constants"
import SearchStock from "../components/fetchStocks/FetchStock";


function Dashboard (){



  return (
    <main>
        <SearchStock/>
    </main>
  );
}




export default Dashboard