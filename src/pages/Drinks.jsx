import React, { useEffect } from 'react';
import ListItems from '../components/ListItems';


export default function Drinks(props) {
  const { history } = props;
 
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <ListItems history = {history} />
  );
}