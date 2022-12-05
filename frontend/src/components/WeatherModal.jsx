import React, { Component } from "react";
import {
    Modal,
    ModalHeader,
    ModalBody,
} from "reactstrap";

export default class CustomModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeCoordinates: this.props.activeCoordinates,
            chart: "",
            hoursLeft: 0,
        };
    }
    componentDidMount() {
        this.getWeatherInfo(this.state.activeCoordinates);
    }

    getWeatherInfo = (coordinates) => {
        // access token (expires every 2 hours)
        const token = process.env.REACT_APP_TOKEN
        const today = new Date().toISOString();
        let tomorrow = new Date();
        tomorrow.setDate(new Date().getDate() + 1);
        const tmw = tomorrow.toISOString();
        //parameters
        const temp = 't_2m:C';
        const prec = 'precip_1h:mm';
        const speed = 'wind_speed_10m:ms';
        const dircetion = 'wind_dir_10m:d'
        const weather_symb = 'weather_symbol_24h:idx';
        const diff = ':PT1H';
        this.setState({ chart: `https://api.meteomatics.com/${today}--${tmw}${diff}/${temp},${prec},${speed},${dircetion},${weather_symb}/${coordinates.user_lat},${coordinates.user_lon}/html?access_token=${token}` });
    }

    render() {
        const { toggle } = this.props;
        const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

        let d = new Date();
        let t = new Date();
        t.setDate(new Date().getDate() + 1);
        const modalTitle = `${weekday[d.getDay()]}, ${d.getDate()} ${months[d.getMonth()]} - ${weekday[t.getDay()]}, ${t.getDate()} ${months[t.getMonth()]}`;
        return (
            <Modal isOpen={true} toggle={toggle} size='lg' centered>
                <ModalHeader toggle={toggle}>{modalTitle}</ModalHeader>
                <ModalBody>
                    <iframe width='100%' height='500px' src={this.state.chart}></iframe>
                </ModalBody>
            </Modal>
        );
    }
}