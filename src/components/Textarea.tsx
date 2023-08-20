import {
  Box,
  Text,
  Textarea as ChakraTextarea,
  TextareaProps
} from '@chakra-ui/react';
import React from 'react';

interface ITextareaProps extends TextareaProps {
  errorText?: string | boolean;
}

const Textarea: React.FC<ITextareaProps> = ({ errorText, ...otherProps }) => {
  return (
    <Box display="flex" flexDirection="column" gap={1} flex={1}>
      <ChakraTextarea
        {...otherProps}
        sx={{
          _disabled: { color: 'grey' },
          ...(errorText
            ? {
                borderColor: 'red',
                _hover: { borderColor: 'red' },
                _focus: { borderColor: 'red' }
              }
            : {})
        }}
      />
      {errorText && (
        <Text fontSize="md" color="red">
          {errorText}
        </Text>
      )}
    </Box>
  );
};

export default Textarea;
