import React, { Component, useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css'; 
import BootstrapTable from 'react-bootstrap-table-next';
import firebase from '../../firebase';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';

function CampTable() {
const { SearchBar } = Search;
  const [details, setDetails] = useState([]);
  useEffect(() =>{
        const unsubscribe = firebase
        .firestore().collection('camp').onSnapshot((snapshot) => {
            const newRescue = snapshot.docs.map((doc) =>({
                ...doc.data()
            }))
            setDetails(newRescue);
        })
        return () => unsubscribe()
    }, []);
  const selectOptions = {
  0: 'Trivandrum',
  1:'Kollam'
};
  const columns= [{
      dataField: 'district',
      text: 'District',
      
    },
    {
      dataField: 'name',
      text: 'Name'
    }, {
      dataField: 'number',
      text: 'number',
      sort: true
    }];
  
    return (
      <div className="container" style={{ marginTop: 50 }}>
      <ToolkitProvider
        keyField="id"
        data={ details }
        columns={ columns }
        search={ { defaultSearch: '' } }
      >
        {
          props => (
            <div>
            <h3>Search:</h3>
              <SearchBar { ...props.searchProps } />
              <hr />
              <div style={{overflow: 'auto'}}>
                <BootstrapTable 
                  { ...props.baseProps }
                />
              </div>
            </div>
          )
        }
      </ToolkitProvider>
      </div>
    );
  
}



export default CampTable;