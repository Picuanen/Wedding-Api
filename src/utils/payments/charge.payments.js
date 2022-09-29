module.exports = async (params) => {
  try {
    const response = await core.charge((parameter = { params }));
    console.log(response);
    return response;
  } catch (err) {
    console.log(err);
  }
};
