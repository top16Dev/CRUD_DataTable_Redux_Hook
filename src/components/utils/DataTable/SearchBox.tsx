import React, {useState} from 'react'
import {Button, InputGroup, Input} from 'reactstrap';

const SearchBox = ({onSearch}) => {
  const [keywords, setKeywords] = useState('');

  const handleChange = (e) => {
    setKeywords(e.target.value);
    onSearch(e.target.value);
  }

  const handleClick = () => {
    onSearch(keywords);
  }

  return (
    <InputGroup>
      {/* <InputGroupAddon addonType="prepend"> */}
        <Button type="button" color="primary" onClick={handleClick}><i className="fa fa-search"></i> Search</Button>
      {/* </InputGroupAddon> */}
      <Input type="text" placeholder="Keywords..." onChange={handleChange} />
    </InputGroup>
    );
}

export default SearchBox;

