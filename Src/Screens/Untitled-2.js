await BluetoothEscposPrinter.printerAlign(BluetoothEscposPrinter.ALIGN.LEFT);
for (var i = 0; i < acce_cart.length; i++) {
  await BluetoothEscposPrinter.printText(
    `${acce_cart[i].name.slice(0, 8)}                    ${
      acce_cart[i].qty
    }         ${acce_cart[i].gst / 2}%      ${acce_cart[i].gst / 2}%        ${
      acce_cart[i].qty * acce_cart[i].user_price
    } \n`,
    {
      encoding: 'GBK',
      codepage: 0,
      widthtimes: 0,
      heigthtimes: 0,
      fonttype: 1,
    },
  );
  await BluetoothEscposPrinter.printText(
    '------------------------------------------------\n\r',
    {},
  );
}

await BluetoothEscposPrinter.printerAlign(BluetoothEscposPrinter.ALIGN.LEFT);
for (var i = 0; i < raw_cart.length; i++) {
  await BluetoothEscposPrinter.printText(
    `${raw_cart[i].name.slice(0, 8)}                    ${
      raw_cart[i].user_qty
    }         0       0       ${
      raw_cart[i].user_qty * raw_cart[i].user_price
    }\n`,
    {
      encoding: 'GBK',
      codepage: 0,
      widthtimes: 0,
      heigthtimes: 0,
      fonttype: 1,
    },
  );
  await BluetoothEscposPrinter.printText(
    '------------------------------------------------\n\r',
    {},
  );
}
