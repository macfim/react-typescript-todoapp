import { IconButton, useColorMode } from "@chakra-ui/react";

import Main from "./components/Main";

import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";

const App: React.FC = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <>
      <Main />
      <IconButton
        aria-label="toggle colormode"
        icon={colorMode === "light" ? <SunIcon /> : <MoonIcon />}
        position="absolute"
        top=".5rem"
        right=".5rem"
        p=".4rem"
        onClick={toggleColorMode}
        variant="ghost"
      />
    </>
  );
};

export default App;
