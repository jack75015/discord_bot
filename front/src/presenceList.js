import React from 'react';
import axios from 'axios';
import { ListGroup}  from 'react-bootstrap'
import {config} from './config'

export default class PresenceList extends React.Component {
    constructor(props) {
      super(props);
  
      this.state = {presence: []};
    }

    componentDidMount() {
        axios.get('http://localhost:3000/presence')
            .then(response => {
              if (response.data){
                const result = response.data.filter(pres => pres.channelId === config.channel_id);
                this.setState({ presence: result })
              }
            })
            .catch(function(err) {
              console.log("error: ",err);
          });
    }
  
    // render() {
    //   const presences = this.state.presence.map((item, i) => 

    //     <div>
    //         <ListGroup horizontal="md" className="my-2">
    //         <ListGroup.Item>{ new Date(Number(item.date)) }</ListGroup.Item>
    //           <ListGroup.Item>{ item.userName }</ListGroup.Item>
    //           <ListGroup.Item>{ item.status }</ListGroup.Item>
    //         </ListGroup>
    //     </div>
    //   );
    

    render() {
      const presences = this.state.presence.map((item) => (
        <div>
            <ListGroup horizontal="md" className="my-2">
              <ListGroup.Item>{ new Date(Number(item.date)).toLocaleString('de-DE') }</ListGroup.Item>
              <ListGroup.Item>{ item.userName }</ListGroup.Item>
              <ListGroup.Item variant = {item.status === "online" ? "success" : item.status == "idle" ? "warning" : "danger"} >{ item.status }</ListGroup.Item>
            </ListGroup>
        </div>
      ));


      

      return (
        
        <div id="layout-content" className="layout-content-wrapper">
          <div className="panel-list">{ presences }</div>
        </div>
      );
    }
  }