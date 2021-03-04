import React, {useState, useEffect} from 'react';
import './App.css';

const App = () => {

  const [allData, setAllData] = useState([]);
  const [search, setSearch] = useState("");
  const [active, setActive] = useState(false);

  useEffect(() => {
    getData()
  }, [])
  
  const getData = async () => {
    const response = await fetch(`https://cors-anywhere.herokuapp.com/https://teacode-recruitment-challenge.s3.eu-central-1.amazonaws.com/users.json`
    );
    let data = await response.json();
    
    setAllData(data);
  }

  const upadateSearch = e => {
    setSearch(e.target.value);
    console.log(search);
  }


  const handleClick = () =>{
    setActive(!active);
  }

  const handleChange = (e) => {
      console.log(e.target.id);
      setActive(e.target.checked);
      // if (e.target.id === allData.id) {
      // e.targed.checked = !e.target.checked;
      // }
  }
  
  const filtredUsers = allData.filter(data =>{
    return data.last_name.includes(search) || data.first_name.includes(search);
  })
  const sortedAndFiltredUsers = filtredUsers.sort((a,b) => a.last_name.localeCompare(b.last_name));


  return (
    <div className="container">
      <button className="contacts_button" onClick={handleClick}>Contacts</button>
      <input className="search_input" type="text" placeholder="insert name or last name of person" onChange={upadateSearch}/>
      {sortedAndFiltredUsers.map(data => (
        <div className="single_user_div" key={`user-${data.id}`}>
          <img src={data.avatar === null ? "https://icon-library.com/images/robot-icon-png/robot-icon-png-15.jpg" : data.avatar} alt={data.first_name}/>
          <span>{data.first_name} {data.last_name}</span>
          <input id={data.id} type="checkbox" checked={active} onChange={handleChange}/>
        </div>
    ))}
    </div>
  );
}

export default App;