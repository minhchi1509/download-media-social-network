import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Textarea as ChakraTextarea,
  TextareaProps
} from '@chakra-ui/react';
import React from 'react';

interface ITextareaProps extends TextareaProps {
  label?: string;
  errorText?: string | boolean;
}

const Textarea: React.FC<ITextareaProps> = ({
  label,
  errorText,
  ...otherProps
}) => {
  return (
    <FormControl isInvalid={!!errorText}>
      <FormLabel>{label}</FormLabel>
      <ChakraTextarea {...otherProps} sx={{ _disabled: { color: 'grey' } }} />
      {errorText && <FormErrorMessage>{errorText}</FormErrorMessage>}
    </FormControl>
  );
};

export default Textarea;
