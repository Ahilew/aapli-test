import './App.css';
import {Button, Col, Container, Row} from "reactstrap";
import AddClient from "./AddClient";
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import {useEffect, useState} from "react";
import axios from "axios";
import EditClient from "./EditClient"
import confirm from "reactstrap-confirm"

function App() {

  const columns = [{
      dataField: "_id",
      hidden: true,
      text: "id"
  },
      {
          dataField: "name",
          text: "name"
      },
      {
          dataField: "email",
          text: "email"
      },
      {
          dataField: "phone",
          text: "phone"
      },
      {
          dataField: "_v",
          text: "name",
          hidden: true
      },
      {
          dataField: "",
          text: "",
          formatter: (cell, row, rowIndex, extras) => {
            return <EditClient buttonLabel={"Edit"} data={row}/>
          }
      },
      {
          dataField: "",
          text: "",
          formatter: (cell, row, rowIndex, extras) => {
              return <Button onClick={() => deleteClient(row)} className="btn btn-danger">Delete</Button>
          }
      }
  ]

    useEffect(() => {
        getClients()
    }, [])

    const getClients = () => {
      axios.get('http://localhost:5000/api/clients').then(s => {
          setState({
              ...state,
              clients: s.data
          })
      })
    }

    async function deleteClient(client) {
      let result = await confirm({
          title: (
              <>
                  Suppression de <strong>{client._id}</strong>!
              </>
          ),
          message: "Vous allez supprimez la personne ?",
          confirmText: "Delete",
          confirmColor: "danger",
          cancelColor: "primary"
      })

        if (result) {
            axios.delete("http://localhost:5000/api/clients/"+client._id).then(res => {
                alert('le client a bien ete supprimee')
                getClients()
            }).catch(err => {
                alert('une erreur est survenue')
            })
        }
    }

    const [state, setState] = useState({
        clients: []
    })

  return (
      <>
        <Container fluid>
            <Row>
                <Col md={6}>
                    <h1>Clients Manager</h1>
                </Col>
                <Col>
                    <Button
                        color='primary'
                    >
                        <AddClient
                            buttonLabel={"New Client"}
                            onAddClient={getClients}
                        />
                    </Button>
                </Col>
            </Row>
            <Row>
               <BootstrapTable
                    keyField={"_id"}
                    columns={columns}
                    data={state.clients}
               />
            </Row>
        </Container>
      </>
  );
}

export default App;
