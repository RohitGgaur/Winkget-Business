import React from "react";
import { useLocation } from "react-router-dom";
import "./full.css"
import Form from "../Feedback/Form.js"
import Display from "../Feedback/Display.js";
import Footer from "../../Footer/Footer.js"
import Enquiry from "../../Enquiry/Enquiry.js";

const Fulldetails = () => {
  const location = useLocation();
  const { item } = location.state || {};

  if (!item) {
    return <p>No data available</p>;
  }
  return (
    <>

      <div className="container">
        <h1 className="header0">Business Profile</h1>

        {/* Full width image */}
        <img src={item.uploadbanner} alt={item.businessname} className="fullWidthImage" />

        {/* Business logo positioned between banner and info */}
        <div className="businessLogo">
          <img src={item.image} alt="logo" />
        </div>

        {/* Business info below image and logo */}
        <div className="businessInfo">
          <div className="nameCategory">
            <h4 className="businessname">{item.businessname}</h4>
            <span>{item.category} /{item.subcategory}</span>
          </div>
          <div>
            <div className="buttons">
              <button className="button0">Contact 👁️</button>
              <button className="button0">Verified ✓</button>
            </div>
          </div>
        </div>

        <p className="location1"><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="black" viewBox="0 0 24 24">
  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
</svg>
 {item.businessaddress}, {item.location}</p>

        <div className="mainContent">
          {/* Left Column */}
          <div className="leftColumn">
            <div className="section">
              <h3 className="sectionTitle">Looking For :</h3>
              <p>{item.lookingfor}</p>
            </div>

            <div className="section">
              <h3 className="sectionTitle">Business Detail</h3>

              <div className="listItem">
                <span className="label">Asking Price:</span>
                <span className="value">{item.investmentrequired} Lakes</span>
              </div>

              <div className="listItem">
                <span className="label">Area Require:</span>
                <span className="value">{item.arearequired}</span>
              </div>

              <div className="listItem">
                <span className="label">No. of Outlets:</span>
                <span className="value">{item.numberoutlets}</span>
              </div>

              <div className="listItem">
                <span className="label">No of Employees:</span>
                <span className="value">{item.franchiseterm}</span>
              </div>

              <div className="listItem">
                <span className="label">
                  {item.businesstype ? "Business Type:" : "Type of Property:"}
                </span>
                <span className="value">
                  {item.businesstype ? item.businesstype : item.typeproperty}
                </span>
              </div>

              <div className="listItem">
                <span className="label">Preferred Area:</span>
                <span className="value">{item.preferedarea}</span>
              </div>
            </div>


            <div className="section">
              <h3 className="sectionTitle">Financial Details :</h3>

              <div className="listItem">
                <span className="label">Annual Turnover:</span>
                <span className="value">{item.annualTurnover}</span>
              </div>

              <div className="listItem">
                <span className="label">EBITDA:</span>
                <span className="value">{item.EBITDA}</span>
              </div>

              <div className="listItem">
                <span className="label">Franchise Fee:</span>
                <span className="value">{item.franchisefee}</span>
              </div>

              <div className="listItem">
                <span className="label">Gross Income:</span>
                <span className="value">{item.grossIncome}</span>
              </div>

              <div className="listItem">
                <span className="label">Rental:</span>
                <span className="value">{item.rental}</span>
              </div>

              <div className="listItem">
                <span className="label">Inventory Value:</span>
                <span className="value">{item.inventoryValue}</span>
              </div>
            </div>

            <div className="section">
              <h3 className="sectionTitle">Other Details :</h3>

              <div className="listItem">
                <span className="label">Website:</span>
                <span className="value">{item.website}</span>
              </div>

              <div className="listItem">
                <span className="label">Instagram:</span>
                <span className="value">{item.instagram}</span>
              </div>

              <div className="listItem">
                <span className="label">Facebook:</span>
                <span className="value">{item.facebook}</span>
              </div>
            </div>

            <div className="section">
              <div className="listItem">
                <span className="label">Establishment Year :</span>
                <span className="value">{item.establishment}</span>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="rightColumn">
            <div className="section">
              <h3 className="sectionTitle">About</h3>
              <span className="Acontent">
                Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.
                Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.
              </span>
            </div>

            <div className="section">
              <h3 className="sectionTitle">Key Information :</h3>

              <div className="listItem">
                <span className="label">Business Name:</span>
                <span className="value">{item.businessname}</span>
              </div>

              <div className="listItem">
                <span className="label">Owner Name:</span>
                <span className="value">{item.name}</span>
              </div>

              <div className="listItem">
                <span className="label">Business Commenced:</span>
                <span className="value">{item.businesscommenced}</span>
              </div>

              <div className="listItem">
                <span className="label">Franchise Commenced:</span>
                <span className="value">{item.franchisecommenced}</span>
              </div>
            </div>

            <div className="section">
              <h3 className="sectionTitle">Rating & Contact</h3>

              <div className="listItem">
                <span className="label">Rating:</span>
                <span className="value">⭐ (4.5)</span>
              </div>

              <div className="listItem">
                <span className="label">Contact:</span>
                <span className="value">📞 Whatsapp</span>
              </div>
            </div>

          </div>
        </div>

      </div>
      -
      <div className="row g-0">
        <div className="col-md px-0">
        <Form />
        <Enquiry/>
        </div>
        <div className="col-md px-0">
        <Display />
        </div>
      </div>
    
      <div className="footer">
      <Footer />
      </div>
      
     
     
    </>
  );
};

export default Fulldetails;