import { useToast } from '@chakra-ui/react';

import { IToastType } from 'src/interfaces/common-interface';

export const useShowToast = () => {
  const toast = useToast();
  const showToast = (type: IToastType, message: string) => {
    toast({
      title: message,
      status: type,
      position: 'top-right',
      isClosable: true
    });
  };
  return { showToast };
};
