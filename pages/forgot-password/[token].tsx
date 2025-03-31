import Btn from "@/components/Btn";
import { PasswordInput } from "@/components/PasswordInput";
import useAuth from "@/hooks/useAuth";
import useToast from "@/hooks/useToast";
import { AuthBackground } from "@/screens/auth/authBackground";
import { Box, Card, CardBody} from "@chakra-ui/react"
import Image from "next/image";
import { useRouter  } from "next/router";
import { useState } from "react";

const ChangPassword = () => {
      const [input, setInput] = useState({
        new_password: "",
        confirm_new_password: "",
      })
      const [errors, setErrors] = useState({
        new_password: false,
        confirm_new_password: false,
      });
      const [show, setShow] = useState({
        new_password: false,
        confirm_new_password: false,
      });

      const navigate = useRouter()

      const token = navigate.query.token as string;

      console.log("token", token)

    

      const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if(name) {
            setInput((prev) => ({
                ...prev,
                [name]: value,
            }))
        }
      }

      const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
      
        setErrors((prev) => ({
          ...prev,
          new_password: name === "new_password" ? value.length < 8 : prev.new_password,
          confirm_new_password:
            name === "confirm_new_password" ? value !== input.new_password : prev.confirm_new_password,
        }));
      };

      const [loading, setLoading] = useState(false);
      const { toast } = useToast();

      const {changePassword} = useAuth()


      const resetPasswordFn = async () => {
        if (input.new_password !== input.confirm_new_password) {
          toast({
            status: "error",
            description: 'Confirm password must match new password',
            title: "Failed",
            position: "top",
            duration: 1000,
          })
          return
        }

        setLoading(true)
        try {
          const response = await changePassword(input.confirm_new_password, token)
          toast({
            status: "success",
            description: response?.data?.message,
            title: "Success",
            position: "top",
            duration: 1000,
          });
          navigate.push("/admin")
        } catch (error) {
          if (error) {
            toast({
              status: "error",
              description: 'Failed to change password please try again later',
              title: "Failed",
              position: "top",
              duration: 1000,
            })
          }
        } finally {
          setLoading(false);
        }
      }
   
 return (
  <Box display={"flex"} justifyContent={"center"} alignItems={"center"} w={"100%"} h={"100vh"}>
    <Card >
        <CardBody 
          display={"flex"}
          flexDir={"column"}
          bg={"#FFF"}
          w={"100%"}
          h={"100vh"}
          // px={{ base: "16px", lg: "44px" }}
          py={"24px"}
          className="robotoF"
        >
           <AuthBackground />
          <Box mb={'30px'} h={"fit-content"} display={'flex'} justifyContent={'center'} alignItems={'center'}>
              <Image width={200} height={100} src={"/logo.svg"} alt={"e-Swift"} />
          </Box>
        <PasswordInput
          label="New password"
          name="new_password"
          show={show.new_password}
          onClick={() =>
            setShow((prev) => ({
              ...prev,
              new_password: !prev.new_password,
            }))
          }
          value={input.new_password}
          onBlur={handleBlur}
          onChange={handleChange}
          isError={errors.new_password}
          errorMessage="minimum of 8 characters*"
        />
        <PasswordInput
          label="Confirm password"
          name="confirm_new_password"
          show={show.confirm_new_password}
          onClick={() =>
            setShow((prev) => ({
              ...prev,
              confirm_new_password: !prev.confirm_new_password,
            }))
          }
          value={input.confirm_new_password}
          onBlur={handleBlur}
          onChange={handleChange}
          isError={input.confirm_new_password !== input.new_password}
          errorMessage="Confirm password must match new password*"
        />
        <Btn
          onClick={resetPasswordFn}
          bg={"transparent"}
          display={"flex"}
          alignItems={"center"}
          w={"100%"}
          h={"40px"}
          border={"1px solid var(--primaryBase)"}
          borderRadius={"10px"}
          textColor={"var(--primaryBase)"}
          my={"24px"}
          // type="submit"
          _hover={{
            bg: "#1A1D66",
            textColor: "#FFF",
          }}
          isLoading={loading}
          loadingText="submitting"
          disabled={loading}
        >
          submit
        </Btn>
        </CardBody>
  </Card>
  </Box>
 )
}

export default ChangPassword;