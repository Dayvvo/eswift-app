import { Box } from "@chakra-ui/react"
import Link from "next/link"
import Image from "next/image"

type LogoProps = {
    width:number;
    height:number;
}
export const Logo =({
    height, width
}:LogoProps)=> {
    return (
        <Box>
          <Link href="/">
            <Box display={"flex"}>
              <Image width={width} height={height} src="/Logo.png" alt="" />
            </Box>
          </Link>
        </Box>
    )
}