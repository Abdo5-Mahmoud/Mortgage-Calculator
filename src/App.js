import { useState } from "react";
import calculator from "./images/icon-calculator.svg";
import illustration from "./images/illustration-empty.svg";
import "./index.css";
function App() {
  const [myData, setMyData] = useState(null);
  return (
    <div className="app">
      <Mortgage setData={setMyData} />
      <Result myData={myData} />
    </div>
  );
}

export default App;

function Mortgage({ setData }) {
  const [totalAmount, setTotalAmount] = useState("");
  const [time, setTime] = useState("");
  const [rate, setRate] = useState("");
  const [type, setType] = useState(null);
  const [empty, setEmpty] = useState(false);
  function handelSubmit(e) {
    e.preventDefault();

    if (!totalAmount || !time || !rate || !type) {
      setEmpty(true);

      return;
    }

    setData({ totalAmount, time, rate, type });
    setTotalAmount("");
    setTime("");
    setRate("");
    setType(null);
  }
  return (
    <form className="mortgage" onSubmit={(e) => handelSubmit(e)}>
      <header className="header">
        <h2 className="subTitile">Mortgage Calculator</h2>
        <p>Clear All</p>
      </header>
      <label>Mortgage Amount</label>
      <div className="inputField">
        <span className={`dollar ${empty && !totalAmount ? "validate" : ""}`}>
          £
        </span>
        <input
          type="number"
          value={totalAmount}
          onChange={(e) => setTotalAmount(Number(e.target.value))}
        />
      </div>
      {empty && !totalAmount ? (
        <p className="textValidate">this field is required</p>
      ) : (
        ""
      )}
      <div className="details">
        <div className="field">
          <label>Mortgage Time</label>
          <div className="inputField">
            <input
              type="number"
              value={time}
              onChange={(e) => setTime(Number(e.target.value))}
            />
            <span className={empty && !time ? "validate" : ""}>years</span>
          </div>
          {empty && !time ? (
            <p className="textValidate">this field is required</p>
          ) : (
            ""
          )}
        </div>
        <div className="field">
          <label>Interest Rate</label>
          <div className="inputField">
            <input
              type="number"
              value={rate}
              onChange={(e) => setRate(Number(e.target.value))}
            />
            <span className={empty && !rate ? "validate" : ""}>%</span>
          </div>
          {empty && !rate ? (
            <p className="textValidate">this field is required</p>
          ) : (
            ""
          )}
        </div>
      </div>
      <div className="radio">
        <p>Mortgage Type</p>
        <div>
          <input
            type="radio"
            id="repay"
            name="type"
            value="Repayment"
            className={type === "Repayment" ? "selected" : ""}
            onClick={(e) => setType(e.target.value)}
          />
          <label htmlFor="repay">Repayment</label>
        </div>
        <div>
          <input
            type="radio"
            id="inter"
            name="type"
            value="Interest"
            className={type === "Interest" ? "selected" : ""}
            onClick={(e) => setType(e.target.value)}
          />
          <label htmlFor="inter">Interest Only</label>
        </div>
        {empty && !type ? (
          <p className="textValidate">this field is required</p>
        ) : (
          ""
        )}
      </div>
      <button className="button">
        {" "}
        <img className="calculator" src={calculator} />
        <span>Calculate Repayments</span>
      </button>
    </form>
  );
}

function Result({ myData }) {
  // console.log(Boolean(myData));
  function handelPayment() {
    let { totalAmount, time, rate } = myData;
    let loanInMonth = Number(time) * 1200;
    let monthlyInterestRate = Number(rate) / loanInMonth;
    let monthlyPay = monthlyInterestRate * totalAmount;

    return monthlyPay.toFixed(3);
  }
  const monthlyPayment = myData ? Number(handelPayment()) : "";
  return (
    <>
      {myData ? (
        <div className="shownHere yourResult">
          <h3>Your results</h3>
          <span>
            Your results are shown below based on the information you provided.
            To adjust the results,edit the form and click "calculate repayments"
            again.{" "}
          </span>
          <div className="card">
            <p>Your monthly repayments</p>
            <h2>£{monthlyPayment}</h2>

            <div className="finalText">
              <p>Total you'll repay over the term</p>
              <h3>
                £{myData?.totalAmount + monthlyPayment * myData?.time * 12}
              </h3>
            </div>
          </div>{" "}
        </div>
      ) : (
        <div className="shownHere">
          <img className="illustration" src={illustration} />
          <h3>Rsults shown here</h3>
          <p>
            Complete the form and click"calculate repayments"to see what your
            monthly repayments would be.
          </p>
        </div>
      )}
    </>
  );
}
