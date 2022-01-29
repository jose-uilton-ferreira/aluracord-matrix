import { Box, Text, TextField, Image, Button } from '@skynexui/components';
import React from 'react';
import appConfig from '../config.json';

export default function ChatPage() {
  // Sua lógica vai aqui
  const [mensagem, setMensagem] = React.useState('');
  const [listaMensagens, setListaMensagens] = React.useState([]);

  function handleNovaMensagem(novaMensagem) {
    setListaMensagens([
      {
        id: listaMensagens.length,
        de: 'jose-uilton-ferreira',
        texto: novaMensagem,
      },
      ...listaMensagens,
    ]);
    setMensagem('');
  }

  /*
    // User
    - Digitar a mensagem no TextField
    - clicar em enter para enviar a mensagem
    - Ver as mensagens na tela

    // Dev
    [X] Criar o campo
    [X] Criar os states mensagem e listaMensagens
    [X] Usar o onChange para atualizar a mensagem e limparmos a mensagem quando o usuário pressionar enter
    [X] Adicionar a mensagem no array listaMensagens
    [] Exibir as mensagens
  */

  // ./Sua lógica vai aqui
  return (
    <Box
      styleSheet={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        backgroundColor: appConfig.theme.colors.primary[500],
        backgroundImage: `url(https://images.pexels.com/photos/378570/pexels-photo-378570.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940)`,
        backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center bottom',
        color: appConfig.theme.colors.neutrals['000']
      }}
    >
      <Box
        styleSheet={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
          borderRadius: '5px',
          backgroundColor: appConfig.theme.colors.neutrals[700],
          height: '100%',
          maxWidth: '95%',
          maxHeight: '95vh',
          padding: '32px',
        }}
      >
        <Header />
        <Box
          styleSheet={{
            position: 'relative',
            display: 'flex',
            flex: 1,
            height: '80%',
            backgroundColor: appConfig.theme.colors.neutrals[600],
            flexDirection: 'column',
            borderRadius: '5px',
            padding: '16px',
          }}
        >

          {/* { listaMensagens.map(msg => {
            return (
              <li key={msg.id}>
                {msg.de}: {msg.texto} | {msg.data.toString()}
              </li>
            )
          }) } */}

          <MessageList mensagens={listaMensagens} />

          <Box
            as="form"
            styleSheet={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <TextField
              placeholder="Insira sua mensagem aqui..."
              type="textarea"
              value={mensagem}
              onChange={e => setMensagem(e.target.value)}
              onKeyPress={e => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleNovaMensagem(mensagem);
                }
              }}
              styleSheet={{
                width: '100%',
                border: '0',
                resize: 'none',
                borderRadius: '5px',
                padding: '6px 8px',
                backgroundColor: appConfig.theme.colors.neutrals[800],
                marginRight: '12px',
                color: appConfig.theme.colors.neutrals[200],
              }}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

function Header() {
  return (
    <>
      <Box styleSheet={{ width: '100%', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} >
        <Text variant='heading5'>
          Chat
        </Text>
        <Button
          variant='tertiary'
          colorVariant='neutral'
          label='Logout'
          href="/"
        />
      </Box>
    </>
  )
}

function MessageList(props) {

  return (
    <Box
      tag="ul"
      styleSheet={{
        overflow: 'auto',
        display: 'flex',
        flexDirection: 'column-reverse',
        flex: 1,
        color: appConfig.theme.colors.neutrals["000"],
        marginBottom: '16px',
      }}
    >

      {props.mensagens.map(mensagem => (
        <Text
          key={mensagem.id}
          tag="li"
          styleSheet={{
            borderRadius: '5px',
            padding: '6px',
            marginBottom: '12px',
            hover: {
              backgroundColor: appConfig.theme.colors.neutrals[700],
            }
          }}
        >
          <Box
            styleSheet={{
              display: 'flex', alignItems: 'center',
              marginBottom: '8px',
            }}
          >
            <Image
              styleSheet={{
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                display: 'inline-block',
                marginRight: '8px',
              }}
              src={`https://github.com/${mensagem.de}.png`}
            />
            <Text tag="strong">
              {mensagem.de}
            </Text>
            <Text
              styleSheet={{
                fontSize: '10px',
                marginLeft: '8px',
                color: appConfig.theme.colors.neutrals[300],
              }}
              tag="span"
            >
              {(new Date().toLocaleDateString())}
            </Text>
          </Box>
          {mensagem.texto}
        </Text>
      ))}


    </Box>
  )
}