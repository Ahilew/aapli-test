import {Button, Col, FormGroup, Input, Modal, ModalBody, ModalFooter, ModalHeader, Row} from "reactstrap";
import {useEffect, useState} from "react";
import axios from "axios";


function EditClient({buttonLabel, data}) {

    useEffect(() => {
        const {name, email, phone, _id} = data
        setState({
            ...state,
            name,
            phone,
            email,
            _id
        })
    }, [])

    const [modal, setModal] = useState(false)

    const toggle = () => setModal(!modal)

    const updateClient = () => {
        axios.patch('http://localhost:5000/api/clients/'+state._id, {
            name: state.name,
            email: state.email,
            phone: state.phone
        }).then(res => {
            alert('La modification a bien été prise en compte')
            setModal(false)
        }).catch("oops une erreur est survenue")
    }

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

    return (
         <>
             <Button
                 color={"warning"}
                 onClick={toggle}
             >
                 {buttonLabel}
             </Button>
             <Modal isOpen={modal} toggle={toggle}>
                 <ModalHeader>
                     Editer un client
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
                     <Button color="primary" onClick={() => updateClient()}> Save</Button>{' '}
                     <Button color="secondary" onClick={toggle}>Cancel</Button>
                 </ModalFooter>
             </Modal>
         </>
    )
}

export default EditClient