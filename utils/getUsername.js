export const getUsername = () => {
  const args = process.argv.slice(2); // Get arguments after "npm run start --"

  const usernameArg = args.find((arg) => arg.startsWith("--username="));
  if (usernameArg) {
    return usernameArg.split("=")[1];
  }
  return null;
};
