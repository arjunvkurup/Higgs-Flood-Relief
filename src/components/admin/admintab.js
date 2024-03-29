import React from "react";
import { Tab, Tabs } from 'react-bootstrap';
import Volunteer from './Volunteer';
import Help from '../help/Help';
import PoliceTable from '../table/PoliceTable';
import HospitalTable from '../table/HospitalTable';
import CampTable from '../table/CampTable';
import TrainTable from '../table/TrainTable';

class TabList extends React.Component {
  constructor(props) {
    super();
    this.state = {
      // Takes active tab from props if it is defined there
      activeTab: props.activeTab || 1
    };
    
    // Bind the handleSelect function already here (not in the render function)
    this.handleSelect = this.handleSelect.bind(this);
  }
  
  render() {
    return (
      <Tabs activeKey={this.state.activeTab} onSelect={this.handleSelect}>
        <Tab eventKey={1} title="Volunteer"><Volunteer/></Tab>
        <Tab eventKey={2} title="Help Needed"><Help/></Tab>
        <Tab eventKey={3} title="Police"><PoliceTable/></Tab>
        <Tab eventKey={4} title="Hospitals"><HospitalTable/></Tab>
        <Tab eventKey={5} title="Camps"><CampTable/></Tab>
        <Tab eventKey={6} title="Train Updates"><TrainTable/></Tab>
      </Tabs>
    );
  }
  
  handleSelect(selectedTab) {
    // The active tab must be set into the state so that
    // the Tabs component knows about the change and re-renders.
    this.setState({
      activeTab: selectedTab
    });
  }
}

export default TabList