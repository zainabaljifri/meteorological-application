import React, { Component } from "react";
import Modal from "./components/EditModal";
import WeatherModal from "./components/WeatherModal"
import axios from "axios";
import UnstyledTable from "./components/Table";
import uuid from 'react-uuid';
import Search from "./components/AutoComSearch";

class WeatherApp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            query: "",
            DB_coordinates: [],
            fetchData: [],
            modal: false,
            weatherModal: false,
            activeCoordinates: {
                user_id: "", timestamp: "", user_lat: 0, user_lon: 0
            },
        };
    }
    componentDidMount() {
        this.refreshCoordinates();
    }
    //get daily weather info based on coordinates
    getWeatherInfo = (coordinates) => {
        // access token (expires every 2 hours)
        const token = process.env.REACT_APP_TOKEN;
        console.log('token ',token);
        const time = new Date().toISOString();
        //parameters
        const max_t = 't_max_2m_24h:C';
        const min_t = 't_min_2m_24h:C';
        const weather_symb = 'weather_symbol_24h:idx';
        fetch(
            `https://api.meteomatics.com/${time}/${max_t},${min_t},${weather_symb}/${coordinates.lat},${coordinates.lon}/json?access_token=${token}`
        )
            .then((response) => response.json())
            .then((json) => {
                console.log(`https://api.meteomatics.com/${time}/${max_t},${min_t},${weather_symb}/${coordinates.lat},${coordinates.lon}/json?access_token=${token}`);
                this.setState(state => ({
                    fetchData: [...state.fetchData, {
                        id: coordinates.id,
                        user_lat: coordinates.lat,
                        user_lon: coordinates.lon,
                        max_tem: json.data[0].coordinates[0].dates[0].value,
                        min_tem: json.data[1].coordinates[0].dates[0].value,
                        symb: json.data[2].coordinates[0].dates[0].value
                    },]
                }))
            });
    }
    //called on every update to db
    refreshCoordinates = async () => {
        this.setState({ fetchData: [] },
            await axios
                .get(`${process.env.REACT_APP_URL}api/coordinates/`)
                .then((res) => {
                    this.setState({ DB_coordinates: res.data })
                    res.data.map((coordinates) => {
                        this.getWeatherInfo(coordinates)
                    }
                    )
                })
                .catch((err) => console.log(err))

        )
    };
    //editModal toggle
    toggle = () => {
        this.setState({ modal: !this.state.modal });
    };
    //weatherModal toggle
    weatherToggle = () => {
        this.setState({ weatherModal: !this.state.weatherModal });
    };

    handleEditSubmit = (coordinates) => {
        this.toggle();
        const Newcoordinates = { user_id: 555, timestamp: "12:00", lat: parseFloat(coordinates.user_lat), lon: parseFloat(coordinates.user_lon) };
        if (coordinates.id) {
            axios
                .put(`${process.env.REACT_APP_URL}api/coordinates/${coordinates.id}/`, Newcoordinates)
                .then((res) => this.refreshCoordinates())
                .catch((err) => console.log(err));
            return;
        }
    };

    handleDelete = (coordinates) => {
        axios
            .delete(`${process.env.REACT_APP_URL}api/coordinates/${coordinates.id}/`)
            .then((res) => this.refreshCoordinates())
            .catch((err) => console.log(err));
    };

    createCoordinates = (user_lat, user_lon) => {
        const coordinates = { user_id: 555, timestamp: "13:00", lat: user_lat, lon: user_lon };
        axios
            .post(`${process.env.REACT_APP_URL}api/coordinates/`, coordinates)
            .then((res) => this.refreshCoordinates())
            .catch((err) => console.log(err));
    };

    editCoordinates = (coordinates) => {
        this.setState({ activeCoordinates: coordinates, modal: !this.state.modal });
    };
    viewCharts = (coordinates) => {
        this.setState({ activeCoordinates: coordinates, weatherModal: !this.state.weatherModal });
    }

    renderItems = () => {
        return (
            <UnstyledTable className='table' key={uuid()} data={this.state.fetchData} hourlyCharts={this.viewCharts} edit={this.editCoordinates} delete={this.handleDelete} />
        )
    };

    //value taken from search field
    handleQuerySubmit = (e) => {
        const coordinates = e.match(/\(([^)]+)\)/)[1];
        const newCoordinates = coordinates.split(',')
        this.createCoordinates(newCoordinates[0], newCoordinates[1])
    };

    render() {
        return (
            <div className="container">
                <Search onClick={this.handleQuerySubmit} />
                {this.renderItems()}
                <p>Last Updated: {new Date().getHours()}:{new Date().getMinutes()}</p>
                {this.state.modal ? (
                    <Modal
                        activeCoordinates={this.state.activeCoordinates}
                        toggle={this.toggle}
                        onSave={this.handleEditSubmit}
                    />
                ) : null}
                {this.state.weatherModal ? (
                    <WeatherModal
                        activeCoordinates={this.state.activeCoordinates}
                        toggle={this.weatherToggle}
                    />
                ) : null}
            </div>
        )
    }
}

export default WeatherApp;