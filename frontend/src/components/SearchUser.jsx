import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import * as JsSearch from 'js-search';
import { Typeahead } from 'react-bootstrap-typeahead';
import { useHistory } from 'react-router-dom';

const db = new JsSearch.Search('url');
db.searchIndex = new JsSearch.UnorderedSearchIndex();
db.indexStrategy = new JsSearch.AllSubstringsIndexStrategy();
db.addIndex('nombre');

export default function SearchUser({ token, setColega }) {
  const history = useHistory()
  const ref = useRef();
  const [usuarios, setUsuarios] = useState([]);
  const [searchOptions, setSearchOptions] = useState([]);
  useEffect(() => {
    const queryApi = async () => {
      try {
        await axios
          .get('http://localhost:4000/api/usuarios', {
            headers: { 'x-auth-token': token },
          })
          .then((res) => {
            setUsuarios([...usuarios, ...res.data.usuarios]);
            db.addDocuments(res.data.usuarios);
          });
      } catch (error) {
        console.log('~ error', error.response);
        history.push('/login')
      }
    };
    queryApi();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleSearch = (value) => {
    const result = db.search(value);
    if (value === []) {
    }
    setSearchOptions(result);
  };

  return (
    <div>
      <Typeahead
        id="user_search"
        ref={ref}
        labelKey="nombre"
        options={searchOptions}
        placeholder="Buscar colega"
        onInputChange={handleSearch}
        onChange={setColega}
        minLength={3}
        emptyLabel="Usuario no encontrado."
      />
    </div>
  );
}
