const printbill = async () => {
  await BluetoothEscposPrinter.printerInit();
  await BluetoothEscposPrinter.printerLeftSpace(0);
  await BluetoothEscposPrinter.printerAlign(
    BluetoothEscposPrinter.ALIGN.CENTER,
  );
  await BluetoothEscposPrinter.setBlob(0);

  await BluetoothEscposPrinter.printText('DEEPAK READYMADE HOUSE\r\n\n', {
    encoding: 'GBK',
    codepage: 0,
    fonttype: 2,
    widthtimes: 1,
    heigthtimes: 1,
  });
  await BluetoothEscposPrinter.printerInit();
  await BluetoothEscposPrinter.printerLeftSpace(0);
  await BluetoothEscposPrinter.printerAlign(
    BluetoothEscposPrinter.ALIGN.CENTER,
  );
  // await BluetoothEscposPrinter.setBlob(0);

  await BluetoothEscposPrinter.printText(
    'Phone: (0281) - 2222318 / 2223318 2570596\r\n',
    {
      encoding: 'GBK',
      codepage: 0,
      widthtimes: 0,
      heigthtimes: 0,
      fonttype: 1,
    },
  );
  await BluetoothEscposPrinter.printerInit();
  await BluetoothEscposPrinter.printerLeftSpace(0);
  await BluetoothEscposPrinter.printerAlign(
    BluetoothEscposPrinter.ALIGN.CENTER,
  );
  // await BluetoothEscposPrinter.setBlob(0);

  await BluetoothEscposPrinter.printText('GSTIN: 24AAOPV5680R1ZJ\r\n', {
    encoding: 'GBK',
    codepage: 0,
    widthtimes: 0,
    heigthtimes: 0,
    fonttype: 1,
  });
  await BluetoothEscposPrinter.printerInit();
  await BluetoothEscposPrinter.printerLeftSpace(0);
  await BluetoothEscposPrinter.printerAlign(
    BluetoothEscposPrinter.ALIGN.CENTER,
  );
  // await BluetoothEscposPrinter.setBlob(0);

  await BluetoothEscposPrinter.printText('SUBJECT TO RAJKOT JURISDICTION\r\n', {
    encoding: 'GBK',
    codepage: 0,
    widthtimes: 0,
    heigthtimes: 0,
    fonttype: 1,
  });
  await BluetoothEscposPrinter.printerAlign(
    BluetoothEscposPrinter.ALIGN.CENTER,
  );
  await BluetoothEscposPrinter.printText(`${new Date()}\r\n`, {
    encoding: 'GBK',
    codepage: 0,
    widthtimes: 0,
    heigthtimes: 0,
    fonttype: 1,
  });

  await BluetoothEscposPrinter.printText(' \n\r', {});
  await BluetoothEscposPrinter.printerAlign(BluetoothEscposPrinter.ALIGN.LEFT);
  await BluetoothEscposPrinter.printText(
    `Invoice Number: 1    Customer Number:${number}\r\n`,
    {
      encoding: 'GBK',
      codepage: 0,
      widthtimes: 0,
      heigthtimes: 0,
      fonttype: 6,
    },
  );

  await BluetoothEscposPrinter.printText(' \n\r', {});

  await BluetoothEscposPrinter.printerAlign(BluetoothEscposPrinter.ALIGN.LEFT);
  await BluetoothEscposPrinter.printText(
    'ITEM     QTY   PRICE   GST%    GSTAMOUNT   TOTAL\n\r\n',
    {
      encoding: 'GBK',
      codepage: 0,
      widthtimes: 0,
      heigthtimes: 0,
      fonttype: 6,
    },
  );
  await BluetoothEscposPrinter.printerAlign(BluetoothEscposPrinter.ALIGN.LEFT);

  // await BluetoothEscposPrinter.printerAlign(BluetoothEscposPrinter.HEIGHT);
  for (var i = 0; i < cart.length; i++) {
    await BluetoothEscposPrinter.printText(
      `${cart[i].getSname.slice(0, 10)}\n${cart[i].user_name.slice(
        0,
        8,
      )}      ${cart[i].qty}       ${Math.round(
        (cart[i].user_Total * 100) / (100 + cart[i].gst),
      )}      ${cart[i].gst}%            ${Math.round(
        (cart[i].user_Total * cart[i].gst) / (100 + cart[i].gst),
      )}          ${cart[i].qty * cart[i].user_Total} \n`,
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
  for (var i = 0; i < acce_cart.length; i++) {
    await BluetoothEscposPrinter.printText(
      `${acce_cart[i].name.slice(0, 8)}        ${
        acce_cart[i].qty
      }       ${Math.round(
        (acce_cart[i].user_price * 100) / (100 + acce_cart[i].gst),
      )}      ${acce_cart[i].gst}%            ${Math.round(
        (acce_cart[i].user_price * acce_cart[i].gst) / (100 + acce_cart[i].gst),
      )}          ${acce_cart[i].qty * acce_cart[i].user_price} \n`,
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
      `${raw_cart[i].name.slice(0, 8)}      ${raw_cart[i].user_qty}      ${
        raw_cart[i].user_price
      }       0%             0          ${
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
  await BluetoothEscposPrinter.setBlob(0);
  await BluetoothEscposPrinter.printText(
    `TOTAL AMOUNT              ${qty}                              ${total}.00\n\r`,
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
  await BluetoothEscposPrinter.printerAlign(
    BluetoothEscposPrinter.ALIGN.CENTER,
  );
  await BluetoothEscposPrinter.printText(
    'TIMING: Mon to Sat 9.30 AM to 8.30 PM\n\r(12.45 PM TO 3.30 PM Lunch break)\n\r',
    {},
  );
  await BluetoothEscposPrinter.printText(' \n\r', {});
  await BluetoothEscposPrinter.printerAlign(
    BluetoothEscposPrinter.ALIGN.CENTER,
  );
  await BluetoothEscposPrinter.printText(
    'For any feedback drop a mail to\n\rdrhu1963@gmail.com\n\r',
    {},
  );

  await BluetoothEscposPrinter.printerAlign(BluetoothEscposPrinter.ALIGN.LEFT);
  await BluetoothEscposPrinter.printText(
    'Branch 1: Opp. Panchnath Temple, Panchnath main road, Nr. Limda Chowk, Rajkot, 02812222318\n\r',
    {
      encoding: 'GBK',
      codepage: 0,
      widthtimes: 0,
      heigthtimes: 0,
      fonttype: 2,
    },
  );
  await BluetoothEscposPrinter.printerAlign(BluetoothEscposPrinter.ALIGN.LEFT);
  await BluetoothEscposPrinter.printText(
    'Branch 2: Opp. Bhid Bhajan Mahadev Temple, Tirupati Nagar main road, Opp. Nirmala School, Rajkot, 02812570596\n\r',
    {
      encoding: 'GBK',
      codepage: 0,
      widthtimes: 0,
      heigthtimes: 0,
      fonttype: 2,
    },
  );
  await BluetoothEscposPrinter.printText(
    '------------------------------------------------\n\r',
    {},
  );
  await BluetoothEscposPrinter.printerAlign(
    BluetoothEscposPrinter.ALIGN.CENTER,
  );
  await BluetoothEscposPrinter.printText(`${getname}`, {
    encoding: 'GBK',
    codepage: 0,
    widthtimes: 0,
    heigthtimes: 0,
    fonttype: 2,
  });
  await BluetoothEscposPrinter.printText(' \n\r', {});
  await BluetoothEscposPrinter.printerAlign(
    BluetoothEscposPrinter.ALIGN.CENTER,
  );

  await BluetoothEscposPrinter.printText('Thanks for payment\n\r\n\r\n\r', {});
  await BluetoothEscposPrinter.printerAlign(BluetoothEscposPrinter.ALIGN.LEFT);
};
