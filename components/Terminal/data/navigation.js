// Simple navigation commands for the current site structure
const handleNavigationCommand = (destination, currentPath, callback) => {
  const newPromptLine = `user@stepweaver.dev ${currentPath}`;
  const newCommandLine = `λ cd ${destination}`;

  callback.setLines((prev) => [
    ...prev,
    newPromptLine,
    newCommandLine,
    `Navigating to /${destination}...`,
  ]);
  callback.setInput('');

  // Delay navigation slightly to show the message
  setTimeout(() => {
    if (destination === 'github') {
      window.open('https://github.com/stepweaver', '_blank');
    } else {
      callback.router.push(`/${destination}`);
    }
  }, 500);
};

export { handleNavigationCommand }; 