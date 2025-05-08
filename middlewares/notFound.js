const notFound = (req, res) => {
  res.status(404).send("Path not defined");
};

module.exports = notFound;
