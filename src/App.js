import axios from 'axios';
import { useEffect, useState, useRef } from 'react';
import './App.css';

function App() {
  const [search, setSearch] = useState("React");
  const [searchDebounce, setSearchDebounce] = useState(search);
  const [terms, setTerms] = useState([]);
  
  useEffect(()=>{
    const timeout = setTimeout( _ => setSearchDebounce(search), 200);
    return _ => clearTimeout(timeout);
  },[search])
  
  useEffect(() => {
    const getApi = async () =>{
      const response = await axios.get("https://en.wikipedia.org/w/api.php", {
        params: {
          action: 'query',
          list: 'search',
          origin: '*',
          format: 'json',
          srsearch: searchDebounce
        }
      });
      setTerms(response.data.query.search);
    };
    
    getApi();
  }, [searchDebounce])
  
  let results = terms.map((t)=>{
    return (
      <tr key={t.pageid}>
        <th scope='row'>{t.pageid}</th>
        <td>{t.title}</td>
        <td>
          <span dangerouslySetInnerHTML={{__html: t.snippet}} />
        </td>
      </tr>
    )
  });

  console.log("re-render")
  return (
    <div className="container">
      <div className="row">
        <div className="my-3">
          <label htmlFor="search-input" className='form-label'>Search</label>
          <input
              id="search-input"
              className="form-control"
              onChange={(e)=>setSearch(e.target.value)}
              value={search}
              type="text"
            />
        </div>
      </div>

        <div className="row">
          <div className="col">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">id</th>
                  <th scope="col">Title</th>
                  <th scope="col" >Description</th>
                </tr>
              </thead>
              <tbody>
                {results}
              </tbody>
            </table>
          </div>
        </div>
    </div>
  );
}

export default App;
