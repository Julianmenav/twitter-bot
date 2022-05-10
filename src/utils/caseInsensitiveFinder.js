function getParameterCaseInsensitive(object, key) {
  const asLowercase = key.toLowerCase();
  return object[Object.keys(object)
    .find(k => k.toLowerCase() === asLowercase)
  ];
}

module.exports = {
  getParameterCaseInsensitive
}