import React from 'react';

const ListItem = (props) => {
    return (
        <li>
            <p className="p-0 m-0">{props.details.title}</p>
            <p className="p-0 m-0">{props.details.body}</p>
        </li>
    );
};

export default ListItem;