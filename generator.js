//--------------------------
//-- To store this data create a mongoose schema in models dir then connect it with env variable
// uri of mongo cloud

app.use("/api/generate/data", (req, res) => {
  // let array to store json data
    let peoples = generateData(100);
    console.log(peoples);

  res.status(200).json({
    status:'Data Generation Successfull',
    data: peoples,
  });
});

function generateData(range) {
    function randomNumber(size) {
      return Math.floor(Math.random() * size);
    }
  const alphabets = [
    "a",
    "b",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
  ];

  const alphabetSize = alphabets.length;
  const vovels = ["a", "e", "i", "o", "u"];
  const vovelssize = vovels.length;
  let peoples = [];
  let index = 0;
  const PEOPLESIZE = range || 100;
  for (let i = 0; i <= PEOPLESIZE; i++) {
    let firstname = "";
    let lastname = "";
    let disscription = "";

    for (let a = 0; a <= 5; a++) {
      if (a == 0) {
        firstname += alphabets[randomNumber(alphabetSize)];
        lastname += vovels[randomNumber(vovelssize)];
      }
      if (a == 1) {
        firstname += vovels[randomNumber(vovelssize)];
        lastname += alphabets[randomNumber(alphabetSize)];
      }
      if (a == 2) {
        firstname += vovels[randomNumber(vovelssize)];
        lastname += alphabets[randomNumber(alphabetSize)];
      }

      firstname += alphabets[randomNumber(alphabetSize)];
      lastname += alphabets[randomNumber(alphabetSize)];
    }
    for (let b = 0; b < 300; b++) {
      disscription += alphabets[randomNumber(alphabetSize)];
    }
    let person = {
      id: index,
      firstname,
      lastname,
      disscription,
    };
    peoples.push(person);
    index++;
  } // main for loop ends

  return peoples;
}

module.exports = generateData;