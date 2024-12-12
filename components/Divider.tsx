import { Box, BoxProps } from '@chakra-ui/react'
import React from 'react'

interface Props extends BoxProps {
  w: string;
  color: string;
  [key: string]: any;
}

const Divider = ({w, color, ...rest}:Props) => {
  return (
    <Box w={w} h='2px' bgColor={color} {...rest}></Box>
  )
}

export default Divider