const getMockResult = { foo: 'qrux' };
const getMockResultObject = {
  foobar: "duffman",
  walpole: "shiv",
};

const clear = jest.fn();
const get = jest.fn(arg => {
  if (arg) {
    return Promise.resolve(getMockResult);
  } else {
    return Promise.resolve(getMockResultObject);
  }
});
const remove = jest.fn();
const set = jest.fn();

const api = {
  clear,
  get,
  remove,
  set,
};

window.chrome = window.browser = {
  storage: {
    local: api,
    sync: api,
  },
};

export default function resetMocks() {
  clear.mockClear();
  get.mockClear();
  remove.mockClear();
  set.mockClear();
};

resetMocks();
