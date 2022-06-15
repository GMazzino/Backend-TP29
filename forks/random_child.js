const rndNumbers = (quantity) => {
  const numbers = {};
  if (!isNaN(quantity)) {
    for (let i = 0; i < quantity; i++) {
      let rndNmbr = Math.floor(Math.random() * 1000).toString();
      if (numbers[rndNmbr]) {
        numbers[rndNmbr] += 1;
      } else {
        numbers[rndNmbr] = 1;
      }
    }
  }
  return numbers;
};

process.on('message', (quantity) => {
  const numbers = rndNumbers(quantity);
  process.send(numbers);
  process.exit();
});

process.send('child_ready');
