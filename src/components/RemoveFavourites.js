import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const RemoveFavourites = () => {
    return (
        <>
            <span className='mr-2'>Supprimer des favoris</span>
            <FontAwesomeIcon icon={faTrash} />
        </>
    );
};

export default RemoveFavourites;