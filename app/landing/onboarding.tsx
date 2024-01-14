import "./onboarding.css";
// import "/AcmLogo.svg";
// import "../public/introduce-yourself.svg";
const Onboarding = () => {
  return (
    <div className="container">
      <img src="/H2.png" alt="" className="H2" />
      <img src="/Rectangle 26.png" alt="" className="side_half" />
      <img src="/Dots.png" alt="" className="top_dots" />
      <img src="/rect.png" alt="" className="top_rect" />
      <img src="/Rectangle 25.png" alt="" className="top_half" />

      <div className="main">
        <div className="profile">
          <h1>PROFILE</h1>
        </div>
        <form>
          <input type="text" name="" placeholder="Contact Number" />
          <input type="text" name="" placeholder="Name" />
          <input type="text" name="" placeholder="E-Mail" />
          <input type="text" name="" placeholder="Registration Number" />
          <button type="submit">SUBMIT</button>
        </form>
    </div>

      <img src="/rect.png" alt="" className="bottom_rect" />
      <img src="/Dots.png" alt="" className="bottom_dots" />
      <img src="/Rectangle 27.png" alt="" className="side_half2" />
      <img src="/Rectangle 24.png" alt="" className="bottom_half" />
      <img src="/H2 rev.png" alt="" className="H2_rev" />
    </div>
  );
};

export default Onboarding;
