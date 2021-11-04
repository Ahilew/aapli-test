import {Button, Col, FormGroup, Input, Modal, ModalBody, ModalFooter, ModalHeader, Row} from "reactstrap";
import {useState} from "react";
import axios from "axios";

function AddClient({buttonLabel, onAddClient}) {

    const [modal, setModal] = useState(false)

    const toggle = () => setModal(!modal)

    const [state, setState] = useState({
        name: "",
        email: "",
        phone: ""
    })

    function handleChange(evt) {
        const value = evt.target.value;
        setState({
            ...state,
            [evt.target.name]: value
        });
    }

    function saveClient() {
        const {name, email, phone} = state
        axios.post("http://localhost:5000/api/clients", {
            name,
            email,
            phone
        }).then(s => {
            alert('Client bien enrregistrée')
            setModal(false)
            onAddClient()
        })
    }

    return (
        <>
            <Button
                color={"primary"}
                onClick={toggle}
            >
                {buttonLabel}
            </Button>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader>
                    Ajouter un nouveau client
                </ModalHeader>
                <ModalBody>
                    <Row>
                        <Col>
                            <FormGroup>
                                <label>Nom complet</label>
                                <Input
                                    name={"name"}
                                    onChange={handleChange}
                                    value={state.name}
                                />
                            </FormGroup>
                            <FormGroup>
                                <label>Email</label>
                                <Input
                                    name={"email"}
                                    onChange={handleChange}
                                    value={state.email}
                                />
                            </FormGroup>
                            <FormGroup>
                                <label>Phone</label>
                                <Input
                                    name={"phone"}
                                    onChange={handleChange}
                                    value={state.phone}
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={() => saveClient()}> Save</Button>{' '}
                    <Button color="secondary" onClick={toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </>
    )
}

export default AddClient