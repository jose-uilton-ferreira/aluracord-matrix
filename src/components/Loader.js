import { Box, Text } from '@skynexui/components';

export function Loader({ isLoading }) {
  return (
    <>
      {isLoading && (
        <>
          <Box
            styleSheet={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              position: 'absolute',
              top: '0',
              left: '0',
              width: '100%',
              height: '100%',
              zIndex: '1',
              backgroundColor: 'rgba(0, 0, 0, 0.5)'
            }}
          >
            <div className='loader'></div>
          </Box>

          <style jsx>{`
            .loader {
              width: 120px;
              height: 120px;
              border: 16px solid #f3f3f3;
              border-top: 16px solid #3498db;
              border-radius: 50%;
              animation: spin 1s ease-in-out infinite;
            }

            @keyframes spin {
              0% { transform: rotate(0deg) }
              100% { transform: rotate(360deg) }
            }
          `}</style>
        </>
      )}
    </>
  );
}