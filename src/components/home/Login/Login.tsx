import Form from "./Form";
import OtherBtns from "./OtherBtns";

type Props = {
  setMenu: (value: string) => void;
};

const Login = ({ setMenu }: Props) => {
  return (
    <section
      aria-label="area de login"
      className="flex flex-col items-center justify-center p-6 bg-white rounded shadow-lg gap-6 w-96 xs:w-72"
    >
      <Form />
      <OtherBtns setMenu={setMenu} />
    </section>
  );
};

export default Login;
