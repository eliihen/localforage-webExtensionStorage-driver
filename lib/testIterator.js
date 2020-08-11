const iterator = (value, key, i) => {
  switch (i) {
    case 0:
      expect(value).toEqual('duffman');
      expect(key).toEqual('foobar');
      expect(i).toBe(0);
      break;
    case 1:
      expect(value).toEqual('shiv');
      expect(key).toEqual('walpole');
      expect(i).toEqual(1);
      break;
    default:
      throw new Error(`Did not expect an item ${i} in the iterator!`);
  }
};

export default iterator;
