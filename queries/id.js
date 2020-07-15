module.exports = {
  validateId(id) {
    if (id.length !== 8 || !/^[a-z]+$/.test(id)) {
      throw new Error('Invalid ID');
    }
  },
  createId(length = 8) {
    let result = '';
    const characters = 'abcdefghijklmnopqrstuvwxyz';
    const charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  },
};
