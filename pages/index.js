import { debounce } from 'lodash';
import { useState, useMemo } from 'react';
import { useRouter } from 'next/router';
import { Box, Text, TextField, Image, Button } from '@skynexui/components';
import appConfig from '../config.json';
import { UserCardGithub } from '../src/components/UserCardGithub';

function Titulo(props) {
  const Tag = props.tag || 'h1';
  return (
    <>
      <Tag>{props.children}</Tag>

      <style jsx>{`
        ${Tag} {
          color: ${appConfig.theme.colors.neutrals['000']};
          font-size: 24px;
          font-weight: 600;
        }
      `}</style>
    </>
  );
}

// function HomePage() {
//   return (
//     <div>
//       <GlobalStyles />

//       <Title tag="h1">Boas vindos de volta!</Title>
//       <h2>Aluracord - Alura Matrix</h2>
//     </div>
//   )
// }
// export default HomePage;

export default function PaginaInicial() {
  const [username, setUsername] = useState('');
  const router = useRouter();

  function handleChangeUsername(e) {
    setUsername(e.target.value);
  }

  const debouncedChangeHandler = useMemo(
    () => debounce(handleChangeUsername, 300)
  , []);

  return (
    <>
      <Box
        styleSheet={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          backgroundColor: appConfig.theme.colors.primary[500],
          backgroundImage: 'url(https://images.pexels.com/photos/378570/pexels-photo-378570.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940)',
          backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center bottom'
        }}
      >
        <Box
          styleSheet={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: {
              xs: 'column',
              sm: 'row',
            },
            width: '100%', maxWidth: '800px',
            borderRadius: '5px', padding: '32px', margin: '16px',
            boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
            backgroundColor: appConfig.theme.colors.neutrals[700],
          }}
        >
          {/* Formul??rio */}
          <Box
            as="form"
            onSubmit={e => {
              e.preventDefault();
              router.push(`/chat/?username=${username}`);
            }} 
            styleSheet={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              width: { xs: '100%', sm: '50%' }, textAlign: 'center', marginBottom: '32px',
            }}
          >
            <Titulo tag="h2">Boas vindas de volta!</Titulo>
            <Text variant="body3" styleSheet={{ marginBottom: '32px', color: appConfig.theme.colors.neutrals[300] }}>
              {appConfig.name}
            </Text>

            <TextField
              onChange={debouncedChangeHandler}
              fullWidth
              textFieldColors={{
                neutral: {
                  textColor: appConfig.theme.colors.neutrals[200],
                  mainColor: appConfig.theme.colors.neutrals[900],
                  mainColorHighlight: appConfig.theme.colors.primary[500],
                  backgroundColor: appConfig.theme.colors.neutrals[800],
                },
              }}
            />
            <Button
              type='submit'
              label='Entrar'
              fullWidth
              buttonColors={{
                contrastColor: appConfig.theme.colors.neutrals["000"],
                mainColor: appConfig.theme.colors.primary[500],
                mainColorLight: appConfig.theme.colors.primary[400],
                mainColorStrong: appConfig.theme.colors.primary[600],
              }}
            />
          </Box>
          {/* Formul??rio */}


          {/* Photo Area */}
          <UserCardGithub username={username} />
          {/* Photo Area */}
        </Box>
      </Box>
    </>
  );
}