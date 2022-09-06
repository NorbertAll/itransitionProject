import React from 'react';
import { HeaderMenu } from '../HeaderMenu/HeaderMenu';
import { Avatar, Container } from '@mui/material';
import './Header.css';



export const Header = (props) => {
  const { img_alt, img_src, firstName, lastName, role, id, fullName } = props;

  const handleName = () => {
    switch (role) {
      case 'admin':
        return <p>Admin</p>;
        break;
      case 'user':
        return firstName ? <p>{`${firstName} ${lastName}`}</p> : <p>Kursant</p>;
    }
  };

  return (
    <div className="main-header">
      <Container
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          '&.MuiContainer-root': {
            maxWidth: '1430px',
          },
        }}>
        <div className="user-info">
          <Avatar
            alt={img_alt}
            src={img_src}
            sx={{ width: 45, height: 45 }}
          />
          <div className="user-name">{handleName()}</div>
          <HeaderMenu
            className="options-btn"
            userRole={role}
            userId={id}
          />
        </div>
      </Container>
    </div>
  );
};
