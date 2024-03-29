import Geocode from "react-geocode";
import React, {useState} from 'react';
import {Form, Button} from 'react-bootstrap';
import firebase from 'firebase';
import { Redirect } from 'react-router-dom';
import Navbar from '../navbar/Navbarlay';
import { RadioGroup, RadioButton } from 'react-radio-buttons';
import Footer from '../footer/Footer';

function VolunteerRegistration() {
    const [name, setName] = useState('');
    const [number, setNumber] = useState('');
    const [lat, setLat] = useState(null);
    const [log, setLog] = useState(null);
    const [details, setDetails] = useState('');
    const [toHome, setTohome] = useState(false);
    const [loc, setLocation] = useState(false);


    function showPosition(position){
        
        setLat(position.coords.latitude);
        setLog(position.coords.longitude);
        Geocode.setApiKey("AIzaSyCTX5Ypfa4NiVPzL4eoAo-utYh7fr7nJpE");
        Geocode.enableDebug(true);
        Geocode.fromLatLng(position.coords.latitude, position.coords.longitude).then(
            response => {
              const address = response.results[0].formatted_address;
              setDetails(address)
              console.log(address);
            },
            error => {
              console.error(error);
              
              const querry = "https://www.latlong.net/c/?lat="+position.coords.latitude+"&long=" + position.coords.longitude
              setDetails(querry)
              alert("Sorry We couldn't get your location. \nPlease enter manually. \nThank You") 
            }
          );
        console.log(position.coords.latitude);
        console.log(position.coords.longitude)
    }

    function handleChange(e){
        
        setLocation(e.target.checked)
        if(e.target.checked)
            {
                if (navigator.geolocation){
                    navigator.geolocation.getCurrentPosition(showPosition);
                    
                }
                else{
                    console.log("location not allowed")
                }
        }
    }

    function onSubmit(e){
        const regex = /<[^>]*script/;   
        const regexnum = /^\d*$/;
        
        if(name.match(regex) || number.match(regex) || details.match(regex))
        {   
            return <Redirect to="/" />
        }
        else{
            
            e.preventDefault()
            firebase
            .firestore()
            .collection('rescue-needed')
            .add({
                name,
                number,
                lat,
                log,
                details
            })
            .then(() => {
                setName('')
                setNumber('')
                setLat()
                setLog()
                setDetails('')
            })
            setTohome(true);
        }
    }
    if (toHome){
        return <Redirect to="/" />
    }
    else
    {
        return (
            <>
            <Navbar />
            <h1 style={{marginTop: '3%',marginBottom:'20px', textAlign: 'center'}}>Rescue Needed</h1>
            <div className="container" style={{marginBottom: '30px'}}>
                
            <Form onSubmit={onSubmit}>
                <Form.Group controlId="formBasicname">
                    <Form.Control type="text" placeholder="Enter Full name" value={name} autoFocus onChange={e => setName(e.currentTarget.value)} required/>
                    <Form.Text className="text-muted">
                    </Form.Text>
                </Form.Group>
                <Form.Group controlId="formBasicnumber">
                    <Form.Control type="text" placeholder="Enter phone number" value={number}  onChange={e => setNumber(e.currentTarget.value)}  required/>
                    <Form.Text className="text-muted">
                    </Form.Text>
                </Form.Group>
                <Form.Group controlId="formBasicChecbox">
                    <Form.Check type="checkbox" label="use current location"  onChange={handleChange} style={{color: 'black'}}/>
                </Form.Group>   
                <Form.Group controlId="formBasiclocation">
                    <Form.Text className="text-muted" >
                    </Form.Text>
                    <Form.Control type="text" placeholder="Enter location for rescue" value={details}  onChange={e => setDetails(e.currentTarget.value)} />
                    <Form.Text className="text-muted" >
                    </Form.Text>
                </Form.Group>
                <Button variant="secondary" size="md" type="submit" style={{ marginRight: '10px',marginTop: '10px'}}>
                    Submit
                </Button>
                <Button variant="light" size="md" type="cancel" style={{ marginTop: '10px'}}>
                    Cancel
                </Button>
            </Form>
            </div>
            <Footer style={{marginTop: '30px'}}/>
            </>
        )
    }
}

export default VolunteerRegistration;

