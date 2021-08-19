const randomEmail = (length) => {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

const randomName = (length) => {
  var result = "";
  var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

//Initialized Public Proxies
const proxies = [
  "91.193.253.188:23500",
  "187.190.64.42:31442",
  "188.168.56.82:55443",
  "182.23.152.37:8080",
  "165.227.173.87:46061",
  "77.37.131.148:55443",
  "213.6.199.94:49044",
  "103.240.77.98:30093",
  "117.121.211.170:8080",
  "181.115.168.3:59994",
  "181.176.151.214:3128",
  "188.170.234.58:33877",
  "34.121.55.127:8080",
];

module.exports = { randomEmail, randomName, proxies };
