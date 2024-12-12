
import Btn from "./Btn";

type LoadMoreProps = {
    click: ()=> void 
}

export const LoadMore =({click}:LoadMoreProps)=> {


    return(
        <>
            <Btn onClick={click}
                w={'100%'}
                h={'48px'}
                border={'1px solid #848484'}
                borderRadius={0}
                mt={'60px'}
                bg={'white'} display={'flex'} 
                alignItems={'center'}
                justifyContent={'center'}
                className="robotoF"
                textColor={'#848484'} fontSize={'16px'} fontWeight={600}
                _hover={{border:"2px solid #848484"}}
            >
                LOAD MORE
            </Btn>
        </>
    )
};

