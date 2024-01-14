import "./onboarding.css";
const Onboarding = () => {
  return (
    <div className="container1">
      <img src="/H2.png" alt="" className="H21" />
      <img src="/Rectangle 26.png" alt="" className="side_half1" />
      <img src="/Dots.png" alt="" className="top_dots1" />
      <img src="/rect.png" alt="" className="top_rect1" />
      <img src="/Rectangle 25.png" alt="" className="top_half1" />

      <div className="main1">
        <div className="profile1">
          <h1>PROFILE</h1>
        </div>
        <form>
          <input
            type="number"
            maxLength={10}
            name=""
            placeholder="Contact Number"
          />
          <input type="text" name="" placeholder="Name" />
          <input type="email" name="" placeholder="E-Mail" />
          <input type="text" name="" placeholder="Registration Number" />
          <button type="submit" id="submit_button">
            SUBMIT
          </button>
        </form>
      </div>

      <img src="/rect.png" alt="" className="bottom_rect1" />
      <img src="/Dots.png" alt="" className="bottom_dots1" />
      <img src="/Rectangle 27.png" alt="" className="side_half21" />
      <img src="/Rectangle 24.png" alt="" className="bottom_half1" />
      <img src="/H2 rev.png" alt="" className="H2_rev1" />
    </div>
  );
};

export default Onboarding;
