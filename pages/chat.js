import React from 'react';
import { createClient } from '@supabase/supabase-js';
import { useRouter } from 'next/router';
import { Box, Text, TextField, Image, Button, Icon } from '@skynexui/components';
import { Loader } from '../src/components/Loader';
import { ButtonSendSticker } from '../src/components/ButtonSendSticker';
import appConfig from '../config.json';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

function escutaNovaMensagem(exibeMensagem) {
  return supabaseClient
    .from('mensagens')
    .on('INSERT', data => exibeMensagem(data.new))
    .subscribe();
}

export default function ChatPage() {
  // Sua lógica vai aqui
  const router = useRouter();
  const [mensagem, setMensagem] = React.useState('');
  const [listaMensagens, setListaMensagens] = React.useState([]);
  const [isLoading, setLoading] = React.useState(true);

  const usuarioLogado = router.query.username;

  React.useEffect(() => {
    supabaseClient
      .from('mensagens')
      .select('*')
      .order('id', { ascending: false })
      .then(({ data }) => {
        setListaMensagens(data);
        setLoading(false);
      });

    escutaNovaMensagem(novaMensagem => {
      setListaMensagens(listaMensagensAtual => [
        novaMensagem,
        ...listaMensagensAtual
      ]);
    });
  }, []);

  function handleNovaMensagem(novaMensagem) {
    const mensagem = {
      de: usuarioLogado,
      texto: novaMensagem,
    }

    supabaseClient
      .from('mensagens')
      .insert([mensagem])
      .then();

    setMensagem('');
  }

  function handleDeleteMensagem(idMensagem, index) {

    supabaseClient
      .from('mensagens')
      .delete()
      .match({ id: idMensagem })
      .then();

    setListaMensagens(listaMensagensAtual => {
      const copyMensagens = [...listaMensagensAtual];
      copyMensagens.splice(index, 1);
      return copyMensagens;
    });

  }

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
      <Loader isLoading={isLoading} />

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

          <MessageList
            mensagens={listaMensagens}
            onDeleteMensagem={handleDeleteMensagem}
          />

          <Box
            as="form"
            styleSheet={{
              display: 'flex',
              gap: '10px',
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
                color: appConfig.theme.colors.neutrals[200],
              }}
            />

            <Button
              type="button"
              styleSheet={{
                borderRadius: '50%',
                padding: '0 3px 0 0',
                minWidth: '50px',
                minHeight: '50px',
                fontSize: '20px',
                marginBottom: '8px',
                lineHeight: '0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: appConfig.theme.colors.neutrals[300],
              }}
              iconName="paperPlane"
              onClick={() => {
                handleNovaMensagem(mensagem);
              }}
            />

            <ButtonSendSticker
              onSelectedSticker={sticker => {
                handleNovaMensagem(`:sticker: ${sticker}`);
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

function MessageList({ mensagens, onDeleteMensagem }) {

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

      {mensagens.map((mensagem, i) => (
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
              {(new Date(mensagem.created_at)).toLocaleDateString()}
            </Text>

            <Box
              styleSheet={{
                padding: '5px',
                marginLeft: '10px',
                cursor: 'pointer',
                color: appConfig.theme.colors.primary['600'],
                backgroundColor: appConfig.theme.colors.neutrals['700']
              }}
              onClick={() => onDeleteMensagem(mensagem.id, i)}
            >
              <Icon name="FaTrash" />
            </Box>
          </Box>

          {mensagem.texto.startsWith(':sticker:') ? (
            <Image
              styleSheet={{
                maxWidth: '100px',
              }}
              src={mensagem.texto.replace(':sticker: ', '')}
            />
          ) : (
            mensagem.texto
          )}

        </Text>
      ))}


    </Box>
  )
}