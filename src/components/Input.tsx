import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input as ChakraInput,
  InputProps
} from '@chakra-ui/react';
import React from 'react';

interface IInputProps extends InputProps {
  label?: string;
  errorText?: string | boolean;
}

const Input: React.FC<IInputProps> = ({ label, errorText, ...otherProps }) => {
  return (
    <FormControl isInvalid={!!errorText}>
      <FormLabel>{label}</FormLabel>
      <ChakraInput {...otherProps} sx={{ _disabled: { color: 'grey' } }} />
      {errorText && <FormErrorMessage>{errorText}</FormErrorMessage>}
    </FormControl>
  );
};

export default Input;
