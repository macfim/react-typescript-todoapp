import { Button, Box, useColorMode } from "@chakra-ui/react";

import Main from "./components/Main";

const App: React.FC = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <>
      <Main />
      <Button
        position="absolute"
        bottom=".5rem"
        right=".5rem"
        onClick={toggleColorMode}
      >
        toggle color mode
      </Button>
    </>
  );
};

export default App;
