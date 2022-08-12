import React, { useEffect } from 'react';
import ListItems from '../components/ListItems';


export default function Foods(props) {
  const { history } = props;
 
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <ListItems history = {history} />
    </div>
  );
}