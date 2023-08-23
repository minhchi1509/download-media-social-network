import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Radio,
  RadioGroup,
  RadioGroupProps,
  Stack
} from '@chakra-ui/react';
import React from 'react';

import { ISelectOption } from 'src/interfaces/form-interfaces';

interface IRadioSelectProps extends Omit<RadioGroupProps, 'children'> {
  label?: string;
  options: ISelectOption[];
  optionsDirection?: 'horizontal' | 'vertical';
  errorText?: string | boolean;
}

const RadioSelect: React.FC<IRadioSelectProps> = ({
  label,
  options,
  errorText,
  optionsDirection = 'horizontal',
  ...otherProps
}) => {
  return (
    <FormControl isInvalid={!!errorText}>
      <FormLabel>{label}</FormLabel>
      <RadioGroup {...otherProps}>
        <Stack
          direction={optionsDirection === 'horizontal' ? 'row' : 'column'}
          gap={3}
        >
          {options.map((option, index) => (
            <Radio value={option.value} key={index}>
              {option.label}
            </Radio>
          ))}
        </Stack>
      </RadioGroup>
      {errorText && <FormErrorMessage>{errorText}</FormErrorMessage>}
    </FormControl>
  );
};

export default RadioSelect;
