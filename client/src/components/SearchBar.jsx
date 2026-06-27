import React from "react";
import { FaSearch } from "react-icons/fa";

function SearchBar({search,setSearch,filter,setFilter}){
return(
<div className="search">
<input
placeholder="🔍 Search Tasks..."
value={search}
onChange={(e)=>setSearch(e.target.value)}
/>
<select
value={filter}
onChange={(e)=>setFilter(e.target.value)}
>

<option>All</option>
<option>Pending</option>
<option>In Progress</option>
<option>Completed</option>
</select>
</div>
)
}

export default SearchBar;