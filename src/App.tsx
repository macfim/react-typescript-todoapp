import { Button, useColorMode } from "@chakra-ui/react";

function App() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <div>
      <div>app</div>
      <Button onClick={toggleColorMode}>toggle color mode</Button>
    </div>
  );
}

export default App;
