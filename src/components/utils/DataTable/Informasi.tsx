/* eslint-disable react-hooks/rules-of-hooks */
import React, {useEffect, useState} from "react";
import BootstrapTable from 'react-bootstrap-table-next';
import { Row, Col, Card, CardHeader, CardBody, Button, ButtonGroup, Input} from "reactstrap"; 
import pagination from './Pagination';
import SearchBox from './SearchBox';
import { useAppDispatch, useAppSelector} from "../../../hooks/redux-hooks";
import { fetchDeleteUser, fetchAddUser, fetchParticularUser, fetchUpdateUser, fetchFilter, fetchUsers } from "../../../store/user-action";
import Modal from 'react-modal';
import { isatty } from "tty";
import { setFlagsFromString } from "v8";

const Informasi = () => {
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [currentId, setCurrentId] = useState(0);
  const [filter, setFilter] = useState("");
  const [flag, setFlag] = useState(0);
  const handleClose = () => setShow(false);

  const [isAdd, setIsAdd] = useState(0);
  const dispatch = useAppDispatch();
  dispatch(fetchUsers());
  const allusers = useAppSelector(state => state.user.all_users);
  const filteredusers = useAppSelector(state => state.user.filtered_users);
  let particularUser = useAppSelector(state => state.user.particular_User);

  const handleDelete = (id) => {
    dispatch(fetchDeleteUser(id));
  } 
  const handleUpdate = () => {
    setShow(false);
    dispatch(fetchUpdateUser(currentId, title, description));
  }
  const handleEdit = (id) => {
    // alert(id);
    setIsAdd(0);
    setShow(true);
    setFlag(0);
    // alert(flag);
    setCurrentId(id);
    dispatch(fetchParticularUser(id));
    // particularUser = useAppSelector(state => state.user.particular_User);
    setDescription(particularUser.body);
    setTitle(particularUser.title);
  } 
  useEffect (() => {
    if(isAdd === 0 && show === true && flag === 0){
      setDescription(particularUser.body);
      setTitle(particularUser.title);
      setFlag(1);
    }
  })
  const handleAddSelected = () => {
  setShow(true);
  setIsAdd(1);
  }
  const addUserDetail = () => {
  setShow(false);
  dispatch(fetchAddUser(title, description));
  }
  const handleSearch = (e: string) => {
    setFilter(e);
    dispatch(fetchFilter(e));
  }
  const DescriptionChange = (e) => setDescription(e.target.value);
  const TitleChange = (e) => setTitle(e.target.value);

  const optionFormatter = (cell, row) => {
    return (
      <ButtonGroup>
        <Button color="primary" onClick={(id) => handleEdit(row.id)}>Edit</Button>
        <Button color="danger" onClick={(id) => handleDelete(row.id)}>Delete</Button>     
      </ButtonGroup>
    );
  }

  const columns = [
    {
    dataField: 'id',
    text: 'ID',
    sort: true
  },
   {
    dataField: 'title',
    text: 'Title',
    sort: true
  }, {
    dataField: 'body',
    text: 'Body',
    sort: true
  },
  { 
    text: 'Option',
    isDummy: true,
    formatter: optionFormatter
  } ];

  const customStyles = {
    content: {
      top: '40%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      width:'50%'
    },
  };
  return (
  <div className="animated fadeIn">
      <Row>
        <Col lg="12" sm="12" xs="12">
          <Card>
            <CardHeader>
            <SearchBox onSearch={handleSearch}/>
            <Button color="primary" style={{marginTop:'10px'}} onClick={handleAddSelected} className="btn btn-sm float-right">ADD</Button>
            <Modal
              isOpen={show}
              onRequestClose={handleClose}
              style={customStyles}
              contentLabel="Example Modal"
            >
              <div style={{justifyContent:"center", display:"flex"}}>{isAdd === 1 ? "Add new item" : "Update item"}</div>
              <br/>
              <form >
                <span>Title</span>
                {isAdd === 1 ? <Input onChange={TitleChange} /> : <Input onChange={TitleChange} value={title} />}
                <br/>
                <span>Description</span>{isAdd === 1 ? <Input type="textarea" onChange={DescriptionChange} /> : 
                <Input type="textarea" onChange={DescriptionChange} value={description} />}
                <br/>
                <div style={{display:"flex", justifyContent:"right"}}>
                {isAdd === 1 ? <Button color="primary" paddingRight="10px" className="btn btn-sm float-right" onClick={addUserDetail}>Add</Button> :
                <Button color="primary" paddingRight="10px" className="btn btn-sm float-right" onClick={handleUpdate}>Update</Button>}
                <Button color="danger" className="btn btn-sm float-right" onClick={handleClose}>Close</Button>
                </div>
              </form>
            </Modal> 
            </CardHeader>
            <CardBody>
              {filter === "" ?  <BootstrapTable bootstrap4 keyField='id' key={1} data={ allusers } columns={ columns } pagination={pagination}/>
              : <BootstrapTable bootstrap4 keyField='id' key={2} data={ filteredusers } columns={ columns } pagination={pagination}/>}
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>)
}

export default Informasi;