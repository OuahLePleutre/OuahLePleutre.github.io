(function () {

  const demo = document.querySelector(".btc-opreturn-demo");

  if (!demo) return;


  const input =
    demo.querySelector(".btc-demo-input");

  const counter =
    demo.querySelector(".btc-demo-char-count");

  const createButton =
    demo.querySelector(".btc-demo-create");

  const mineButton =
    demo.querySelector(".btc-demo-mine");


  const transaction =
    demo.querySelector(".btc-demo-transaction");

  const status =
    demo.querySelector(".btc-demo-status");

  const txid =
    demo.querySelector(".btc-demo-txid");

  const hex =
    demo.querySelector(".btc-demo-hex");

    /*
  const data =
    demo.querySelector(".btc-demo-data");
    */

  const pulse =
    demo.querySelector(".btc-demo-pulse");


  const block =
    demo.querySelector(".btc-demo-block");

  const blockNumber =
    demo.querySelector(".btc-demo-block-number");

  const blockHash =
    demo.querySelector(".btc-demo-block-hash");

  const blockTime =
    demo.querySelector(".btc-demo-block-time");

  const minedBadge =
    demo.querySelector(".btc-demo-mined-badge");


  const minedTxid =
    demo.querySelector(".btc-demo-mined-txid");

  const minedData =
    demo.querySelector(".btc-demo-mined-data");


  const result =
    demo.querySelector(".btc-demo-result");


  let currentTransaction = null;


  /*
   * Convert text to hexadecimal.
   */

  function stringToHex(value) {

    const bytes =
      new TextEncoder().encode(value);

    return Array.from(bytes)
      .map(
        byte =>
          byte
            .toString(16)
            .padStart(2, "0")
      )
      .join("");

  }


  /*
   * Generate fake blockchain-looking hex.
   *
   * This is deliberately a simulation.
   */

  function randomHex(length = 64) {

    const chars =
      "0123456789abcdef";

    let value = "";

    for (let i = 0; i < length; i++) {

      value +=
        chars[
          Math.floor(
            Math.random() * chars.length
          )
        ];

    }

    return value;

  }


  /*
   * Current timestamp.
   */

  function timestamp() {

    return new Date().toLocaleString(
      undefined,
      {
        year: "numeric",
        month: "short",
        day: "numeric",

        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
      }
    );

  }


  /*
   * Character / byte counter.
   */

  function updateCounter() {

    const bytes =
      new TextEncoder()
        .encode(input.value);

    counter.textContent =
      bytes.length / 2;

  }


  input.addEventListener(
    "input",
    updateCounter
  );


  /*
   * Create transaction.
   */

  createButton.addEventListener(
    "click",
    function () {

      const value =
        input.value.trim();

      if (!value) {

        input.focus();

        return;

      }

      /*
      const valueHex =
        stringToHex(value);
      */

      const newTxid =
        randomHex();


      currentTransaction = {
        /*
        data: value,
        */
        hex: value,

        txid: newTxid

      };


      /*
       * Display transaction.
       */

      txid.textContent =
        newTxid;

      hex.textContent =
        value;
      /*
      data.textContent =
        value;
      */

      /*
       * Reset block.
       */

      block.classList.remove(
        "mined"
      );

      minedBadge.textContent =
        "NOT MINED";

      blockNumber.textContent =
        "# —";

      blockHash.textContent =
        "—";

      blockTime.textContent =
        "—";

      minedTxid.textContent =
        "—";

      minedData.textContent =
        "—";


      result.classList.remove(
        "visible"
      );


      /*
       * Transaction becomes active.
       */

      transaction.classList.add(
        "active"
      );

      status.textContent =
        "Unconfirmed";

      status.classList.remove(
        "btc-demo-status-confirmed"
      );

      status.classList.add(
        "btc-demo-status-pending"
      );


      /*
       * Enable mining.
       */

      mineButton.disabled = false;

      mineButton.textContent =
        "⛏ Mine transaction";

      pulse.classList.add(
        "active"
      );

    }
  );


  /*
   * Simulate mining.
   */

  mineButton.addEventListener(
    "click",
    function () {

      if (!currentTransaction) {
        return;
      }


      mineButton.disabled = true;

      mineButton.textContent =
        "⛏ Mining…";


      setTimeout(
        function () {

          const height =
            Math.floor(
              850000 +
              Math.random() * 50000
            );


          const hash =
            randomHex();


          /*
           * Block information.
           */

          blockNumber.textContent =
            "# " +
            height.toLocaleString();

          blockHash.textContent =
            hash;

          blockTime.textContent =
            timestamp();


          /*
           * Transaction inside block.
           */

          minedTxid.textContent =
            currentTransaction.txid;

          minedData.textContent =
            currentTransaction.hex;


          /*
           * Transaction confirmed.
           */

          status.textContent =
            "Confirmed";

          status.classList.remove(
            "btc-demo-status-pending"
          );

          status.classList.add(
            "btc-demo-status-confirmed"
          );


          transaction.classList.remove(
            "active"
          );


          /*
           * Block mined.
           */

          block.classList.add(
            "mined"
          );

          minedBadge.textContent =
            "✓ MINED";


          pulse.classList.remove(
            "active"
          );


          mineButton.textContent =
            "✓ Transaction mined";


          /*
           * Reveal explanation.
           */

          setTimeout(
            function () {

              result.classList.add(
                "visible"
              );

            },
            450
          );


        },
        1200
      );

    }
  );


  /*
   * Initial counter.
   */

  updateCounter();

})();
