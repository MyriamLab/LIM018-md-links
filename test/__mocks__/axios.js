const axios = jest.fn(() => Promise.resolve({
    status: 200,
    ok: "ok"
}));

axios.get = jest.fn(() => Promise.resolve({
    status: 200,
    ok: "ok"
}));

module.exports = axios; 