function env(prop) {
  return process.env[prop] || undefined;
}

export { env };
