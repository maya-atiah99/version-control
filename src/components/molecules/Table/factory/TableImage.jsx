import React from 'react';
import unknown from '../../../../../assets/icons/userImage/user-empty.svg';
import { useFetch } from '../../../../../hooks/useFetch';
const TableImage = ({ id }) => {
  const { data: userImage, isPending } = useFetch(
    ['userImage', id]
    // userEndpoints.getUserImage(id)
  );
  const image =
    userImage?.data?.result?.imageBytes !== '' && !isPending ? (
      <img
        src={`data:image/jpeg;base64,${userImage?.data?.result?.imageBytes}`}
        alt="User"
      />
    ) : (
      <img src={unknown} alt="User Icon" />
    );
  return image;
};

export default TableImage;
