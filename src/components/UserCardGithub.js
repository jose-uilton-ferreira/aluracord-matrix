import { Box, Button, Icon, Image, Text, ThemeGenerator } from '@skynexui/components';
import { useEffect, useState } from 'react';
import appConfig from '../../config.json';

const BASE_URL = 'https://api.github.com/users';

export function UserCardGithub({ username }) {
  
  const [user, setUser] = useState({});

  useEffect(() => {
    if (username !== '') {
      fetch(`${BASE_URL}/${username}`)
        .then(res => res.json())
        .then(data => setUser(data))
        .catch(e => console.log(e));
   }
  }, [username])

  return (
    <Box
      styleSheet={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-end',
        maxWidth: '250px',
        backgroundColor: appConfig.theme.colors.primary[500],
        border: '1px solid',
        borderColor: appConfig.theme.colors.neutrals[999],
        borderRadius: '10px',
        flex: 1,
        minHeight: '240px',
      }}
    >
      <Image
        styleSheet={{
          borderRadius: '50%',
          margin: '10px 0',
          maxWidth: '150px'
        }}
        src={username.length > 2 ? `https://github.com/${username}.png` : 'https://cdn-icons-png.flaticon.com/512/25/25231.png'}
      />
      <Text
        variant="body4"
        styleSheet={{
          color: appConfig.theme.colors.neutrals[200],
          backgroundColor: appConfig.theme.colors.neutrals[900],
          padding: '3px 10px',
          borderRadius: '1000px'
        }}
      >
        {username}
      </Text>

      <Box
        styleSheet={{
          width: '100%',
          padding: '10px',
          marginTop: '10px',
          color: appConfig.theme.colors.neutrals[200],
          backgroundColor: appConfig.theme.colors.neutrals[900],
        }}
      >
        <Text variant="body4" styleSheet={{ textAlign: 'center' }}>
          {user.name ? user.name : '---'}
        </Text>

        <Box
          styleSheet={{
            display: 'grid',
            gridTemplateColumns: '50% 50%',
            rowGap: '10px',
            margin: '15px 0'
          }}
        >
          <Text variant="body4">
            <Icon name="FaUsers" styleSheet={{display: 'inline-block'}} />
            &nbsp; {user.followers ? `${user.followers} seguidores` : '---'}
          </Text>
          <Text variant="body4">
            <Icon name="FaUserFriends" styleSheet={{display: 'inline-block'}} />
            &nbsp; {user.following ? `${user.following} seguindo` : '---'}
          </Text>
          <Text variant="body4">
            <Icon name="FaFolder" styleSheet={{display: 'inline-block'}} />
            &nbsp; {user.public_repos ? `${user.public_repos} repositórios` : '---'}
          </Text>
          <Text variant="body4">
            <Icon name="FaMapMarkerAlt" styleSheet={{display: 'inline-block'}} />
            &nbsp; {user.location ? user.location : '---'}
          </Text>
        </Box>

        <Button
          href={`https://github.com/${username}`}
          label="Visititar perfil"
          fullWidth
          buttonColors={{
            contrastColor: appConfig.theme.colors.neutrals["000"],
            mainColor: appConfig.theme.colors.primary[500],
            mainColorLight: appConfig.theme.colors.primary[400],
            mainColorStrong: appConfig.theme.colors.primary[600],
          }}
        />
      </Box>

      {/*
        Nome completo
        Seguidores
        Seguindo
        Repositórios
        Localização
        Email
      */}
    </Box>
  );

}